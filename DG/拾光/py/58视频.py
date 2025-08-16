import sys,json,base64
from Crypto.Cipher import AES
from base.spider import Spider
from Crypto.Util.Padding import unpad
sys.path.append('..')

class Spider(Spider):
    headers = {
        'User-Agent': "Mozilla/5.0 (Linux; Android 12; SM-S9080 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/101.0.4951.61 Safari/537.36 uni-app Html5Plus/1.0 (Immersed/0.6666667)",
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip",
        'Version': "1.3.26",
        'Token': ""
    }
    host, datakey, dataiv, deviceid, home_class, block_id,bn = '', '', '', '', '',[],b'\xe6\x83\x85\xe8\x89\xb2'

    def init(self, extend=""):
        try:
            config = json.loads(extend)
        except (json.JSONDecodeError, TypeError):
            config = {}

        self.host = config.get("host", "https://58api.zggggs.com")
        self.datakey = config.get("datakey", "58928cae68092afc")
        self.dataiv = config.get("dataiv", "e9d732a1edcdcc0a")
        self.deviceid = config.get("deviceid", "d60ddbcd469741f68e2755dca38f5171")
        payload = {
            'UserId': "0",
            'device_id': self.host
        }
        response = self.post(f'{self.host}/addons/appto/app.php/tindex/home_config2', data=payload, headers=self.headers).json()
        data = self.decrypt(response['data'])
        data2 = json.loads(data)
        block_id = []
        for i in data2['viphome']:
            block_id.append(i['id'])
        self.block_id = block_id
        self.home_class = data2['home']

    def homeContent(self, filter):
        home_class = self.home_class
        classes = []
        for i in home_class:
            if i['id'] == 0:
                continue
            classes.append({'type_id':i['id'],'type_name':i['title']})
        return {'class': classes}

    def homeVideoContent(self):
        payload = {
            'UserId': "0",
            'device_id': self.deviceid,
            'Id': "0",
            'Type': "1",
            'Page': "1",
            'Limit': "10"
        }
        response = self.post(f'{self.host}/addons/appto/app.php/tindex/home_vod_list2', data=payload, headers=self.headers).json()
        data = self.decrypt(response['data'])
        data2 = json.loads(data)
        vods = []
        for i in data2['sections']:
            vods.extend(i['vods'])
        vods.extend(data2['vods'])
        videos = []
        for i in vods:
            if i['type_id'] in self.block_id or i['group_id'] != 0 or self.bn.decode('utf-8') in i['vod_class']:
                continue
            vod_pic = i.get('vod_pic')
            if vod_pic.startswith('mac://'):
                vod_pic = vod_pic.replace('mac://', 'https://', 1)
            videos.append({
                    'vod_id': i.get('vod_id'),
                    'vod_name': i.get('vod_name'),
                    'vod_class': i.get('vod_class'),
                    'vod_pic': vod_pic,
                    'vod_remarks': i.get('vod_remarks'),
                    'vod_score': i.get('vod_score')
                })
        return {'list': videos}

    def detailContent(self, ids):
        payload = {
            'UserId': "0",
            'device_id': self.deviceid,
            'id': ids
        }
        data = self.post(f"{self.host}/addons/appto/app.php/tindex/page_player", data=payload, headers=self.headers).json()
        data2 = self.decrypt(data['data'])
        data3 = json.loads(data2)
        if data3['type_id'] in self.block_id:
            return {'list': []}
        if not data3['group_id'] == 0:
            return {'list': []}
        videos = []
        videos.append({
            'vod_id': data3.get('vod_id'),
            'vod_name': data3.get('vod_name'),
            'vod_content': data3.get('vod_blurb'),
            'vod_remarks': data3.get('vod_serial'),
            'vod_year': data3.get('vod_year'),
            'vod_area': data3.get('vod_area'),
            'vod_play_from': '58视频',
            'vod_play_url': data3['vod_play_url']
        })
        return {'list': videos}

    def searchContent(self, key, quick, pg="1"):
        url = f"{self.host}/addons/appto/app.php/tindex/search_film"
        videos = []
        type_list = {'film','short'}
        for search_type in type_list:
            payload = {
                'UserId': "0",
                'device_id': self.deviceid,
                'Search': key,
                'type': search_type,
                'Page': pg,
                'Limit': "10"
            }
            response = self.post(url, data=payload, headers=self.headers).json()
            data = self.decrypt(response['data'])
            vods =json.loads(data)['vods']

            for i in vods['list']:
                if i['type_id'] in self.block_id or self.bn.decode('utf-8') in i['vod_class'] or b'\xe4\xbc\x9a\xe5\x91\x98'.decode('utf-8') in i['vod_type_name']:
                    continue
                vod_pic = i['vod_pic']
                if vod_pic.startswith('mac://'):
                    vod_pic = vod_pic.replace('mac://', 'https://', 1)
                video = {
                    "vod_id": i['vod_id'],
                    "vod_name": i['vod_name'],
                    "vod_class": i['vod_class'],
                    "vod_pic": vod_pic,
                    "vod_remarks": i['vod_remarks']
                }
                videos.append(video)

        return {'list': videos, 'page': pg, 'limit': vods['limit'], 'total': vods['total']}

    def categoryContent(self, tid, pg, filter, extend):
        payload = {
            'UserId': "0",
            'device_id': self.host,
            'Id': tid,
            'Type': "1",
            'Page': pg,
            'Limit': "10"
        }
        response = self.post(f'{self.host}/addons/appto/app.php/tindex/home_vod_list2', data=payload,headers=self.headers).json()
        data = self.decrypt(response['data'])
        data2 = json.loads(data)
        videos = []
        for i in data2['vods']:
            if 'payload' in i or 'banner' in i['vod_class']:
                continue
            vod_pic = i.get('vod_pic')
            if vod_pic.startswith('mac://'):
                vod_pic = vod_pic.replace('mac://', 'https://', 1)
            videos.append({
                'vod_id': i.get('vod_id'),
                'vod_name': i.get('vod_name'),
                'vod_class': i.get('vod_class'),
                'vod_pic': vod_pic,
                'vod_score':i.get('vod_score'),
                'vod_remarks': i.get('vod_remarks'),
                'vod_score': i.get('vod_score')
                })
        return {'list': videos}

    def playerContent(self, flag, id, vipFlags):
        return {'jx': 0, 'playUrl': '', 'parse': 0, 'url': id,'header': {'User-Agent': 'io.dcloud.application.DCloudApplication/1.3.26 (Linux;Android 12)'}}

    def decrypt(self,ciphertext):
        try:
            ciphertext = base64.b64decode(ciphertext)
            key_bytes = self.datakey.encode('utf-8')
            iv_bytes = self.dataiv.encode('utf-8')
            cipher = AES.new(key_bytes, AES.MODE_CBC, iv_bytes)
            decrypted_data = unpad(cipher.decrypt(ciphertext), AES.block_size)
            return decrypted_data.decode('utf-8')
        except Exception as e:
            return None

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
