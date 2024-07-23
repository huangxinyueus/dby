String.prototype.rstrip = function (chars) {
	let regex = new RegExp(chars + "$");
	return this.replace(regex, "");
};
const request_timeout = 5000;
const VERSION = 'YouTube📡';
const UA = 'Mozilla/5.0'; //默认请求ua
const __ext = {data_dict:{}};
const tips = `\n${VERSION}`;
const def_pic = 'http://127.0.0.1:9978/file/yydf/yydf2024/youtube/yt_1200.png';
function print(any){
	any = any||'';
	if(typeof(any)=='object'&&Object.keys(any).length>0){
		try {
			any = JSON.stringify(any);
			console.log(any);
		}catch (e) {
			console.log(typeof(any)+':'+any.length);
		}
	}else if(typeof(any)=='object'&&Object.keys(any).length<1){
		console.log('null object');
	}else{
		console.log(any);
	}
}
function getHome(url){
	if(!url){
		return ''
	}
	let tmp = url.split('//');
	url = tmp[0] + '//' + tmp[1].split('/')[0];
	try {
		url = decodeURIComponent(url);
	}catch (e) {}
	return url
}
const http = function (url, options = {}) {
	if(options.method ==='POST' && options.data){
		options.body = JSON.stringify(options.data);
		options.headers = Object.assign({'content-type':'application/json'}, options.headers);
	}
	options.timeout = request_timeout;
	if(!options.headers){
		options.headers = {};
	}
	let keys = Object.keys(options.headers).map(it=>it.toLowerCase());
	if(!keys.includes('referer')){
		options.headers['Referer'] = getHome(url);
	}
	if(!keys.includes('user-agent')){
		options.headers['User-Agent'] = UA;
	}
	console.log(JSON.stringify(options.headers));
	try {
		const res = req(url, options);
		res.json = () => res&&res.content ? JSON.parse(res.content) : null;
		res.text = () => res&&res.content ? res.content:'';
		return res
	}catch (e) {
		return {
			json() {
				return null
			}, text() {
				return ''
			}
		}
	}
};
["get", "post"].forEach(method => {
    http[method] = function (url, options = {}) {
        return http(url, Object.assign(options, {method: method.toUpperCase()}));
    }
});
function init(ext) {
	console.log(":"+VERSION);
	let data;
	if (typeof ext == 'object'){
		data = ext;
		print('live ext:object');
	} else if (typeof ext == 'string') {
		if (ext.startsWith('http')) {
			let ext_paramas = ext.split(';');
			let data_url = ext_paramas[0];
			print(data_url);
			data = http.get(data_url).json();
		}
	}
    print(data);
    __ext.data = data;
	print('init执行完毕');
}
function home(filter) {
	let classes = __ext.data.map(it => ({
		type_id: it.url,
		type_name: it.name,
	}));
	print("----home----");
	print(classes);
	return JSON.stringify({ 'class': classes});
}
function homeVod(params) {
	let _get_url = __ext.data[0].url;
	let html = http.get(_get_url).text();
    let arr = html.match(/.*?,#[\s\S].*?#/g);
	let _list = [];
	try {
		arr.forEach(it=>{
			_list.push({
				vod_name:it.split(',')[0],
				vod_id:_get_url+'$'+it.split(',')[0],
				vod_pic:def_pic,
				vod_remarks:it.split(',')[1],
			});
		});
	}catch (e) {
		print('Live2cms获取首页推荐发送错误:'+e.message);
	}
	return JSON.stringify({ 'list': _list });
}
function category(tid, pg, filter, extend) {
    let _get_url = tid;
    let html;
    if(__ext.data_dict[_get_url]){
        html = __ext.data_dict[_get_url];
    }else{
        html = http.get(_get_url).text();
        __ext.data_dict[_get_url] = html;
    }
    let arr = html.match(/.*?,#[\s\S].*?#/g);
    let _list = [];
	try {
		arr.forEach(it=>{
			_list.push({
				vod_name:it.split(',')[0],
				vod_id:_get_url+'$'+it.split(',')[0],
				vod_pic:def_pic,
				vod_remarks:it.split(',')[1],
			});
		});
	}catch (e) {
		print('Live2cms获取一级分类页发生错误:'+e.message);
	}
	return JSON.stringify({
		'page': 1,
		'pagecount': 1,
		'limit': _list.length,
		'total': _list.length,
		'list': _list,
	});
}
function detail(tid) {
    let _get_url = tid.split('$')[0];
    let _tab = tid.split('$')[1];
	if(tid.includes('#search#')){
		let vod_play_url = _tab.replace('#search#','')+'$'+_get_url;
		print(vod_play_url);
		return JSON.stringify({
			list: [{
				vod_id: tid,
        		vod_name: '搜索:'+_tab.replace('#search#',''),
        		type_name: "YouTube列表",
        		vod_pic: def_pic,
        		vod_content: tid,
        		vod_play_from: '来自搜索',
        		vod_play_url: vod_play_url,
        		vod_director: tips,
        		vod_remarks: `YouTube${VERSION}`,
			}]
		});
	}
    let html;
    if(__ext.data_dict[_get_url]){
        html = __ext.data_dict[_get_url];
    }else{
        html = http.get(_get_url).text();
        __ext.data_dict[_get_url] = html;
    }
    let a = new RegExp(`.*?${_tab},#[\\s\\S].*?#`);
    let b = html.match(a)[0];
    let c = html.split(b)[1];
    if(c.match(/.*?,#[\s\S].*?#/)){
        let d = c.match(/.*?,#[\s\S].*?#/)[0];
        c = c.split(d)[0];
    }
    let arr = c.trim().split('\n');
    let _list = [];
    arr.forEach((it)=>{
        if(it.trim()){
            let t = it.trim().split(',')[0];
            let u = it.trim().split(',')[1];
            _list.push(t+'$'+u);
        }
    });
    let vod_name = __ext.data.find(x=>x.url===_get_url).name;
    let vod_play_url = _list.join('#');
    let vod = {
        vod_id: tid,
        vod_name: vod_name+'|'+_tab,
        type_name: "YouTube列表",
        vod_pic: def_pic,
        vod_content: tid,
        vod_play_from: vod_name,
        vod_play_url: vod_play_url,
        vod_director: tips,
        vod_remarks: `${VERSION}`,
    };
    return JSON.stringify({
        list: [vod]
    });
}
function play(flag, id, flags) {
    let vod = {
		'parse': /m3u8/.test(id)?0:1,
		'playUrl': '',
		'url': id
	};
    print(vod);
	return JSON.stringify(vod);
}
function search(wd, quick) {
	let _get_url = __ext.data[0].url;
	let html;
    if(__ext.data_dict[_get_url]){
        html = __ext.data_dict[_get_url];
    }else{
        html = http.get(_get_url).text();
        __ext.data_dict[_get_url] = html;
    }
	let str='';
	Object.keys(__ext.data_dict).forEach(()=>{
		str+=__ext.data_dict[_get_url];
	});
	let links = str.split('\n').filter(it=>it.trim() && it.includes(','));
	links = links.map(it=>it.trim());
	let plays = Array.from(new Set(links));
	print('搜索关键词:'+wd);
	print('过滤前:'+plays.length);
	plays = plays.filter(it=>it.includes(wd));
	print('过滤后:'+plays.length);
	print(plays);
	let _list = [];
	plays.forEach((it)=>{
		_list.push({
			'vod_name':it.split(',')[0],
			'vod_id':it.split(',')[1].trim()+'$'+it.split(',')[0].trim()+'#search#',
			'vod_pic':def_pic,
		})
	});
	return JSON.stringify({
			'list': _list
    });
}
export default {
	init: init,
	home: home,
	homeVod: homeVod,
	category: category,
	detail: detail,
	play: play,
	search: search
}