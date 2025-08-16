//AES加密函数，输出hex格式
globalThis.Encrypt = function (data) {
    let key = CryptoJS.enc.Utf8.parse('mvXBSW7ekreItNsT');
    let iv = CryptoJS.enc.Utf8.parse('2U3IrJL8szAKp0Fj');
    let encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 将字节数组格式数据转换为hex十六进制格式
    let encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
    return encryptedHex
};
//AES解密函数，输出字符串格式
globalThis.Decrypt = function (data, key, iv) {
    let dataObj = {ciphertext: CryptoJS.enc.Hex.parse(data)};
    let decrypt = CryptoJS.AES.decrypt(dataObj, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 将字节数组格式数据转换为字符串格式
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
};
//获取加密源码函数，输出解密的源码
globalThis.gethtml = function (url, rkey, rkeys) {
    const kheaders = {
        'Cache-Control': 'no-cache',
        'Version': '2406025',
        'Ver': '1.9.2',
        'Referer': 'https://api.cj7wq4.com',
        'X-Customer-Client-Ip': '127.0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'api.cj7wq4.com',
        'Connection': 'Keep-Alive',
        'User-Agent': 'okhttp/3.12.0'
    };
    let enkey = Encrypt(rkey);
    let timestamp = new Date().getTime()/1000;
    let t = timestamp.toString().split('.')[0];
    let sign = `token_id=,token=1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79,phone_type=1,request_key=${enkey},app_id=1,time=${t},keys=${rkeys}*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br`;
    let signature = md5(sign);
    let kbody = `token_id=&token=1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79&phone_type=1&request_key=${enkey}&app_id=1&time=${t}&keys=${encodeURIComponent(rkeys)}&signature=${signature}&phone_model=xiaomi-22021211rc&ad_version=1`;
    let khtml = fetch(url, {
        headers: kheaders,
        body: kbody,
        method: 'POST',
        rejectCoding: true
    });
    let kdata = JSON.parse(khtml).data;
    let response_key = kdata.response_key; 
    let keys = kdata.keys;
    const bodykey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcKZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcWV9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdIDblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVMiMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUMWBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZK7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1bL3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oat5lYKfpe8k83ZA==';
    let bodykeyiv = JSON.parse(RSA.decode(keys, bodykey));
    let key = CryptoJS.enc.Utf8.parse(bodykeyiv.key);
    let iv = CryptoJS.enc.Utf8.parse(bodykeyiv.iv);
    khtml = Decrypt(response_key, key, iv);
    return khtml
};
//drpy2主体对象
var rule = {
author: '小可乐/2503/第一版',
title: '瓜子app',
类型: '影视',
host: 'https://api.cj7wq4.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/App/IndexList/indexList',
filter_url: '',
detailUrl: '',
searchUrl: '/App/Index/findMoreVod',

limit: 9,
double: false,
class_name: '电影&剧集&综艺&动漫&短剧',
class_url: '1&2&3&4&64',
filter_def: {},

推荐: $js.toString(() => {
let rkey = JSON.stringify({
     "pageSize": 30,
     "sort": "d_id",
     "page": 1,
     "tid": 2
});
let rkeys = 'qDpotE2bedimK3QGqlyV5ieXXC3EhaPLQ+IOJyHnHflCj5w/7ESK7FgywMvrgjxbx0GklEFLI4+JshgySe633OIRstuktwdiCy3CT+fLSpuxBJDIlfXQDaeH3ig1wiB0JsZ601XHiFweGMu4tZfnSpHg3OnoL6nz/uurUif2OK4=';
let khtml = gethtml(`${HOST}/App/IndexList/indexList`, rkey, rkeys);
VODS = [];
let klist = JSON.parse(khtml).list;
klist.map((it) => {
    VODS.push({
        vod_name: it.vod_name,
        vod_pic: it.vod_pic,
        vod_remarks: it.vod_continu == 0 ? '电影' : '更新至'+it.vod_continu+'集',
        vod_id: `${it.vod_id}/${it.vod_continu}`
    })
})
}),
一级: $js.toString(() => {
//分类值对应的默认筛选类型值
let subs = {'1': '1', '2': '2', '3': '22', '4': '4', '64': ''};
let sub = subs[MY_CATE] || ''; 
let tid = MY_CATE;
let rkey = JSON.stringify({
    "tid": tid,
    "sub": (MY_FL.cateId || MY_CATE).toString(),
    "area": (MY_FL.area || "").toString(),
    "year": (MY_FL.year || "").toString(),
    "sort": (MY_FL.by || "d_id").toString(),
    "pageSize": "30",
    "page": MY_PAGE
});
let rkeys = 'qDpotE2bedimK3QGqlyV5ieXXC3EhaPLQ+IOJyHnHflCj5w/7ESK7FgywMvrgjxbx0GklEFLI4+JshgySe633OIRstuktwdiCy3CT+fLSpuxBJDIlfXQDaeH3ig1wiB0JsZ601XHiFweGMu4tZfnSpHg3OnoL6nz/uurUif2OK4=';
let khtml = gethtml(input, rkey, rkeys);
VODS = [];
let klist = JSON.parse(khtml).list;
klist.map((it) => {
    VODS.push({
        vod_name: it.vod_name,
        vod_pic: it.vod_pic,
        vod_remarks: it.vod_continu == 0 ? '电影' : '更新至'+it.vod_continu+'集',
        vod_id: `${it.vod_id}/${it.vod_continu}`
    })
})
}),
二级: $js.toString(() => {
let vod_id = input.split('/')[3];
let timestamp = new Date().getTime()/1000;
let t = timestamp.toString().split('.')[0];
let rkey = JSON.stringify({
    "token_id": "393668",
    "vod_id": vod_id,
    "mobile_time": t,
    "token": "1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79"
});
let rkeys = 'Qmxi5ciWXbQzkr7o+SUNiUuQxQEf8/AVyUWY4T/BGhcXBIUz4nOyHBGf9A4KbM0iKF3yp9M7WAY0rrs5PzdTAOB45plcS2zZ0wUibcXuGJ29VVGRWKGwE9zu2vLwhfgjTaaDpXo4rby+7GxXTktzJmxvneOUdYeHi+PZsThlvPI=';
let khtml = gethtml(`${HOST}/App/IndexPlay/playInfo`, rkey, rkeys);
let kvod = JSON.parse(khtml).vodInfo;
let rkey2 = JSON.stringify({
    "vurl_cloud_id": "2",
    "vod_d_id": vod_id
});
let khtml2 = gethtml(`${HOST}/App/Resource/Vurl/show`, rkey2, rkeys);
let klist = JSON.parse(khtml2).list;
let kurls = [];
klist.forEach(item => {
    const playParams = Object.values(item.play);
    let lastParam = null;
    // 从数组的最后一个元素开始，向前查找，直到找到一个非空的param值
    for (let i = playParams.length - 1; i >= 0; i--) {
        if (playParams[i].param) {
            lastParam = playParams[i].param;
            break
        }
    };
    let vurlIdMatch = lastParam.match(/vurl_id=(\d+)/);
    let resolution=lastParam.match(/resolution=(\d+)/);
    if (vurlIdMatch) {
        kurls.push(`${item.title}$${vod_id}/${vurlIdMatch[1]}?${resolution[1]}`)
    }
});
VOD = {
    vod_id: vod_id,
    vod_name: kvod.vod_name,
    vod_pic: kvod.vod_pic,
    type_name: kvod.videoTag.toString(),
    vod_remarks: kvod.vod_remarks,
    vod_year: '未知',
    vod_area: kvod.vod_area,
    vod_actor: kvod.vod_actor,
    vod_director: kvod.vod_director,
    vod_content: kvod.vod_use_content,
    vod_play_from: '娃娃专线',
    vod_play_url: kurls.join('#')
}
}),
搜索: $js.toString(() => {
let url = input;
let rkey = JSON.stringify({
    'keywords': KEY,
    'order_val': 1
});
let rkeys = 'qDpotE2bedimK3QGqlyV5ieXXC3EhaPLQ+IOJyHnHflCj5w/7ESK7FgywMvrgjxbx0GklEFLI4+JshgySe633OIRstuktwdiCy3CT+fLSpuxBJDIlfXQDaeH3ig1wiB0JsZ601XHiFweGMu4tZfnSpHg3OnoL6nz/uurUif2OK4=';
let khtml = gethtml(url, rkey, rkeys);
VODS = [];
let klist = JSON.parse(khtml).list;
klist.map((it) => {
    VODS.push({
        vod_name: it.vod_name,
        vod_pic: it.vod_pic,
        vod_remarks: it.vod_continu == 0 ? '电影' : '更新至'+it.vod_continu+'集',
        vod_id: `${it.vod_id}/${it.vod_continu}`
    })
})
}),

play_parse: true,
lazy: $js.toString(() => {
let vod_id = input.split('/')[0];
let vurl_id = input.split('/')[1];
let resolution=input.split('?')[1];
let rkey = JSON.stringify({
    "domain_type": 8,
    "vod_id": vod_id,
    "type": "play",
    "resolution": resolution,
    "vurl_id": vurl_id
}); 
let rkeys = 'ZH8gpdp9bxjuG2NK97sol3o7Uiz+9eVEaVMlE2Fk3j7EResM3YHnECZUH7BONNTjpy7RVNi/YimGuNYriC7Cmswv4PNYiFYzw9QhlqZKwNfCM6IUpFZ0T4rZx8G78zkv2tNVbfYC4qNQedGi07nWZ33dlSuVxROVfY5JxOWHMI0=';
let khtml = gethtml(`${HOST}/App/Resource/VurlDetail/showOne`, rkey, rkeys);
let kurl = JSON.parse(khtml).url;
input = { parse: 0, url: kurl, header: rule.headers }
}),

filter: 'H4sIAAAAAAAAA+1Xy07bQBTd5ysqr11p/Eom/EG/AaHKJVmgtlSitBJCkaA8moRCoCoJj9CHCiSBIIJKCzgk/IxnTP6ic4PtO3alqioLNl7kRvcc3zN3XifObErRlJHR1KzyPD+jjCjj9nT+SU5RlUn7ZV7k3lmXfV4R+Vv7xRsBjM4qkwJmS83BQhNgkWhKQfXhctPt1b3Se5+xQoa/a3vVDWT0LBZV66zUQCodMl7xjC8sIZNBprHBrrrIUBxofp3PVZGRxik1ImoawaLiluuUJCoyJe+TNJIhteccsd6mNCcU9Ob7g52+VIUNeuVTr3ckTVeMNVZQwx2wp/I2rj+rd9gH5+/rj73uNwbbyz7qJwE3ONzml6c+5ydhXaXDr/pB3V0SLk274fXXfM69WfR6NV49VVn5K1+5EWOorH/BdnsqX6yIjBVbKv+xOQSGhar4QHa7cjb8OrjxKideaRv1awe83vb1/STs+UtLFAU93yUB517W2WrNdXaCtlc7zDlUebUjWmN730QbHRhx0GrzvQMxLjwaTnjpl9utBpV3SWQTZvL2lLQJV+dut/ePm6AT3QoPhG7JuIm4KeMG4oaM64jrMq4hrsk4QZxIuJYNcS0r4xRxKuMZxDMynkYcb4FGHmuWWCHkLFUEE4IBQYegQcCmCBmu6fewiBDxAIGnCDxPoJKABgE1koaQgUAh4CyyUSEtmyWqCBoEHYIBwYRgQUhDyECgEFCIxoUoCFEQoiBEQYiCEAUhCkIUhCgIURTiu+e81gomFj1Wz2bwUPG1j8yp/HGovO41Wy/65bmnEzkUrs+J0x0ydi43PSGUJNpbOAnp1+OvppAcHG+x4nKcHCukxtSUaPKePwB4OMWNc52GcNpgGfWYAUmUEfMfiTJj9iNRVsw5JCodMw6JwmPMf16w/apEST8dQ8eQKGlTA1sJTDubmHZi2olpJ6b9UKZt/I9pD91FNHtbcoK54hkFd650oqwhX3lxmaNs3KajrJVYZGKRiUUmFvlQFmne973WlG7lCbwalpv8+jj4S09idz3K4gF+5L/DRmgjMcfEHBNzTMzxQcwxVfgNyDRXOfgVAAA='
}