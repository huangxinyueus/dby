import sys,uuid
from base.spider import Spider
sys.path.append('..')

class Spider(Spider):
    local_uuid = ''
    config = ''
    parsing_config = []
    headers = {
        'User-Agent': "Dart/2.19 (dart:io)",
        'Accept-Encoding': "gzip",
        'appto-local-uuid': local_uuid
    }

    def init(self, extend=""):
        try:
            self.host = extend.strip()
            if not self.host.startswith('http'):
                return {}
            self.local_uuid = str(uuid.uuid4())
            response = self.fetch(f'{self.host}/apptov5/v1/config/get?p=android&__platform=android', headers=self.headers).json()
            config = response['data']
            self.config = config
            parsing_conf = config['get_parsing']['lists']
            parsing_config = {}
            for i in parsing_conf:
                if len(i['config']) != 0:
                    label = []
                    for j in i['config']:
                        if j['type'] == 'json':
                            label.append(j['label'])
                    parsing_config.update({i['key']:label})
            self.parsing_config = parsing_config
        except Exception as e:
            print(f'初始化异常：{e}')
            return {}

    def detailContent(self, ids):
        response = self.fetch(f"{self.host}/apptov5/v1/vod/getVod?id={ids[0]}",headers=self.headers).json()
        data3 = response['data']
        videos = []
        vod_play_url = ''
        vod_play_from = ''
        for i in data3['vod_play_list']:
            play_url = ''
            for j in i['urls']:
                play_url += f"{j['name']}${i['player_info']['from']}@{j['url']}#"
            vod_play_from += i['player_info']['show'] + '$$$'
            vod_play_url += play_url.rstrip('#') + '$$$'
        vod_play_url = vod_play_url.rstrip('$$$')
        vod_play_from = vod_play_from.rstrip('$$$')
        videos.append({
            'vod_id': data3.get('vod_id'),
            'vod_name': data3.get('vod_name'),
            'vod_content': data3.get('vod_content'),
            'vod_remarks': data3.get('vod_remarks'),
            'vod_director': data3.get('vod_director'),
            'vod_actor': data3.get('vod_actor'),
            'vod_year': data3.get('vod_year'),
            'vod_area': data3.get('vod_area'),
            'vod_play_from': vod_play_from,
            'vod_play_url': vod_play_url
        })
        return {'list': videos}

    def searchContent(self, key, quick, pg='1'):
        url = f"{self.host}/apptov5/v1/search/lists?wd={key}&page={pg}&type=&__platform=android"
        response = self.fetch(url, headers=self.headers).json()
        data = response['data']['data']
        for i in data:
            if i.get('vod_pic').startswith('mac://'):
                i['vod_pic'] = i['vod_pic'].replace('mac://', 'http://', 1)
        return {'list': data, 'page': pg, 'total': response['data']['total']}

    def playerContent(self, flag, id, vipflags):
        default_ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        parsing_config = self.parsing_config
        parts = id.split('@')
        if len(parts) != 2:
            return {'parse': 0, 'url': id, 'header': {'User-Agent': default_ua}}
        playfrom, rawurl = parts
        label_list = parsing_config.get(playfrom)
        if not label_list:
            return {'parse': 0, 'url': rawurl, 'header': {'User-Agent': default_ua}}
        result = {'parse': 1, 'url': rawurl, 'header': {'User-Agent': default_ua}}
        for label in label_list:
            payload = {
                'play_url': rawurl,
                'label': label,
                'key': playfrom
            }
            try:
                response = self.post(
                    f"{self.host}/apptov5/v1/parsing/proxy?__platform=android",
                    data=payload,
                    headers=self.headers
                ).json()
            except Exception as e:
                print(f"请求异常: {e}")
                continue
            if not isinstance(response, dict):
                continue
            if response.get('code') == 422:
                continue
            data = response.get('data')
            if not isinstance(data, dict):
                continue
            url = data.get('url')
            if not url:
                continue
            ua = data.get('UA') or data.get('UserAgent') or default_ua
            result = {
                'parse': 0,
                'url': url,
                'header': {'User-Agent': ua}
            }
            break
        return result

    def homeContent(self, filter):
        config = self.config
        if not config:
            return {}
        home_cate = config['get_home_cate']
        classes = []
        for i in home_cate:
            if isinstance(i.get('extend', []),dict):
                classes.append({'type_id': i['cate'], 'type_name': i['title']})
        return {'class': classes}

    def homeVideoContent(self):
        response = self.fetch(f'{self.host}/apptov5/v1/home/data?id=1&mold=1&__platform=android',headers=self.headers).json()
        data = response['data']
        vod_list = []
        for i in data['sections']:
            for j in i['items']:
                vod_pic = j.get('vod_pic')
                if vod_pic.startswith('mac://'):
                    vod_pic = vod_pic.replace('mac://', 'http://', 1)
                vod_list.append({
                    "vod_id": j.get('vod_id'),
                    "vod_name": j.get('vod_name'),
                    "vod_pic": vod_pic,
                    "vod_remarks": j.get('vod_remarks')
                })
        return {'list': vod_list}

    def categoryContent(self, tid, pg, filter, extend):
        response = self.fetch(f"{self.host}/apptov5/v1/vod/lists?area={extend.get('area','')}&lang={extend.get('lang','')}&year={extend.get('year','')}&order={extend.get('sort','time')}&type_id={tid}&type_name=&page={pg}&pageSize=21&__platform=android", headers=self.headers).json()
        data = response['data']
        data2 = data['data']
        for i in data['data']:
            if i.get('vod_pic','').startswith('mac://'):
                i['vod_pic'] = i['vod_pic'].replace('mac://', 'http://', 1)
        return {'list': data2, 'page': pg, 'total': data['total']}

    def getName(self):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def destroy(self):
        pass

    def localProxy(self, param):
        pass
