# -*- coding: utf-8 -*-
# by @嗷呜

import re,sys,urllib3
sys.path.append('..')
from base.spider import Spider
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class Spider(Spider):
    host = ''

    def init(self, extend=""):
        self.host = extend.rstrip().rstrip('/')

    def getName(self):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def destroy(self):
        pass

    headers = {
        'User-Agent': 'okhttp/4.12.0',
    }

    def homeContent(self, filter):
        data = self.fetch(f"{self.host}/nav?token=", headers=self.headers, verify=False).json()
        keys = ["class", "area", "lang", "year", "letter", "by", "sort"]
        filters = {}
        classes = []
        for item in data.get('list',data.get('data',[])):
            has_non_empty_field = False
            jsontype_extend = item["type_extend"]
            classes.append({"type_name": item["type_name"], "type_id": item["type_id"]})
            for key in keys:
                if key in jsontype_extend and jsontype_extend[key].strip() != "":
                    has_non_empty_field = True
                    break
            if has_non_empty_field:
                filters[str(item["type_id"])] = []
            for dkey in jsontype_extend:
                if dkey in keys and jsontype_extend[dkey].strip() != "":
                    values = jsontype_extend[dkey].split(",")
                    value_array = [{"n": value.strip(), "v": value.strip()} for value in values if
                                   value.strip() != ""]
                    filters[str(item["type_id"])].append({"key": dkey, "name": dkey, "value": value_array})
        result = {"class": classes, "filters": filters}
        return result

    def homeVideoContent(self):
        data = self.fetch(f"{self.host}/index_video?token=", headers=self.headers, verify=False).json()
        videos = []
        if 'list' in data:
            for item in data['list']: videos.extend(item['vlist'])
        elif 'data' in data:
            for item in data['data']: videos.extend(item['vlist'])
        return {'list': videos}

    def categoryContent(self, tid, pg, filter, extend):
        params = {'tid': tid, 'class': extend.get('class', ''), 'area': extend.get('area', ''), 'lang': extend.get('lang', ''), 'year': extend.get('year', ''), 'limit': '18', 'pg': pg}
        data = self.fetch(f"{self.host}/video", params=params, headers=self.headers, verify=False).json()
        if 'data' in data:
            data = {'list':data['data']}
        return data

    def detailContent(self, ids):
        data = self.fetch(f"{self.host}/video_detail?id={ids[0]}", headers=self.headers, verify=False).json()
        data = data['data']
        if 'vod_info' in data:
            data = data['vod_info']
        show = ''
        vod_play_url = ''
        for i in data['vod_url_with_player']:
            show += i.get('name', '') + '$$$'
            parse_api = i.get('parse_api','')
            if parse_api and parse_api.startswith('http'):
                url = i.get('url','')
                if url:
                    url2 = '#'.join([i+ '@' + parse_api  for i in url.split('#')])
                vod_play_url += url2 + '$$$'
            else:
                vod_play_url += i.get('url','') + '$$$'
        data['vod_play_from'] = show.rstrip('$$$')
        data['vod_play_url'] = vod_play_url.rstrip('$$$')
        data.pop('vod_url_with_player')
        return {'list': [data]}

    def searchContent(self, key, quick, pg="1"):
        data = self.fetch(f"{self.host}/search?text={key}&pg={pg}", headers=self.headers, verify=False).json()
        data2 = data.get('list',data.get('data',[]))
        for item in data2:
            item.pop('type', None)
        return {'list': data2, 'page': pg}

    def playerContent(self, flag, id, vipFlags):
        video_pattern = re.compile(r'https?:\/\/.*\.(?:m3u8|mp4|flv)')
        jx,url,ua = 0,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
        if '@' in id:
            rawurl, jxapi = id.split('@', 1)
            try:
                res = self.fetch(f"{jxapi}{rawurl}", headers=self.headers, timeout=10, verify=False).json()
                url = res.get('url', '')
                if url.startswith('http'):
                    jxua = res.get('ua')
                    if jxua:
                        ua = jxua
            except Exception:
                url = ''
            if url.startswith('http'):
                jx = 0
            else:
                url = rawurl
                jx = 0 if video_pattern.match(rawurl) else 1
        else:
            url = id
            jx = 0 if video_pattern.match(id) else 1
        if url.startswith('NBY'):
            jx, url = 0,''
        return {'jx': jx,'parse': 0,'url': url,'header': {'User-Agent': ua}}

    def localProxy(self, param):
        pass