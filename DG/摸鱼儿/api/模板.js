if (typeof Object.assign != 'function') {
    Object.assign = function () {
	var target = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
}
function getMubans() {
    var mubanDict = { // 模板字典
        mxpro: {
            title: '',
            host: '',
            // homeUrl:'/',
            url: '/vodshow/fyclass--------fypage---.html',
            searchUrl: '/vodsearch/**----------fypage---.html',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {//网站的请求头,完整支持所有的,常带ua和cookies
                'User-Agent': 'MOBILE_UA',
                // "Cookie": "searchneed=ok"
            },
            class_parse: '.navbar-items li:gt(2):lt(8);a&&Text;a&&href;/(\\d+).html',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: '.tab-list.active;a.module-poster-item.module-item;.module-poster-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: 'body a.module-poster-item.module-item;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
            二级: {
                "title": "h1&&Text;.module-info-tag&&Text",
                "img": ".lazyload&&data-original",
                "desc": ".module-info-item:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text",
                "content": ".module-info-introduction&&Text",
                "tabs": ".module-tab-item",
                "lists": ".module-play-list:eq(#id) a"
            },
            搜索: 'body .module-item;.module-card-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href;.module-info-item-content&&Text',
        },
        mxone5: {
            title: '',
            host: '',
            url: '/show/fyclass--------fypage---.html',
            searchUrl: '/search/**----------fypage---.html',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            class_parse: '.nav-menu-items&&li;a&&Text;a&&href;.*/(.*?).html',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: '.module-list;.module-items&&.module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
            二级: {
                "title": "h1&&Text;.tag-link&&Text",
                "img": ".module-item-pic&&img&&data-src",
                "desc": ".video-info-items:eq(0)&&Text;.video-info-items:eq(1)&&Text;.video-info-items:eq(2)&&Text;.video-info-items:eq(3)&&Text",
                "content": ".vod_content&&Text",
                "tabs": ".module-tab-item",
                "lists": ".module-player-list:eq(#id)&&.scroll-content&&a"
            },
            搜索: '.module-items .module-search-item;a&&title;img&&data-src;.video-serial&&Text;a&&href',
        },
        首图: {
            title: '',
            host: '',
            url: '/vodshow/fyclass--------fypage---/',
            searchUrl: '/vodsearch/**----------fypage---.html',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {//网站的请求头,完整支持所有的,常带ua和cookies
                'User-Agent': 'MOBILE_UA',
                // "Cookie": "searchneed=ok"
            },
            class_parse: '.myui-header__menu li.hidden-sm:gt(0):lt(5);a&&Text;a&&href;/(\\d+).html',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: 'ul.myui-vodlist.clearfix;li;a&&title;a&&data-original;.pic-text&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: '.myui-vodlist li;a&&title;a&&data-original;.pic-text&&Text;a&&href',
            二级: {
                "title": ".myui-content__detail .title&&Text;.myui-content__detail p:eq(-2)&&Text",
                "img": ".myui-content__thumb .lazyload&&data-original",
                "desc": ".myui-content__detail p:eq(0)&&Text;.myui-content__detail p:eq(1)&&Text;.myui-content__detail p:eq(2)&&Text",
                "content": ".content&&Text",
                "tabs": ".nav-tabs:eq(0) li",
                "lists": ".myui-content__list:eq(#id) li"
            },
            搜索: '#searchList li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
        },
        首图2: {
            title: '',
            host: '',
            url: '/list/fyclass-fypage.html',
            searchUrl: '/vodsearch/**----------fypage---.html',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {
                'User-Agent': 'UC_UA',
                // "Cookie": ""
            },
            // class_parse:'.stui-header__menu li:gt(0):lt(7);a&&Text;a&&href;/(\\d+).html',
            class_parse: '.stui-header__menu li:gt(0):lt(7);a&&Text;a&&href;.*/(.*?).html',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: 'ul.stui-vodlist.clearfix;li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: '.stui-vodlist li;a&&title;a&&data-original;.pic-text&&Text;a&&href',
            二级: {
                "title": ".stui-content__detail .title&&Text;.stui-content__detail p:eq(-2)&&Text",
                "img": ".stui-content__thumb .lazyload&&data-original",
                "desc": ".stui-content__detail p:eq(0)&&Text;.stui-content__detail p:eq(1)&&Text;.stui-content__detail p:eq(2)&&Text",
                "content": ".detail&&Text",
                "tabs": ".stui-vodlist__head h3",
                "lists": ".stui-content__playlist:eq(#id) li"
            },
            搜索: 'ul.stui-vodlist__media:eq(0) li,ul.stui-vodlist:eq(0) li,#searchList li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
            搜索1: 'ul.stui-vodlist&&li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
            搜索2: 'ul.stui-vodlist__media&&li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
        },
        默认: {
            title: '',
            host: '',
            url: '/vodshow/fyclass--------fypage---.html',
            searchUrl: '/vodsearch/-------------.html?wd=**',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {
                'User-Agent': 'MOBILE_UA',
            },
            play_parse: true,
            lazy: '',
            limit: 6,
            double: true, // 推荐内容是否双层定位
        },
        vfed: {
            title: '',
            host: '',
            url: '/index.php/vod/show/id/fyclass/page/fypage.html',
            searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {
                'User-Agent': 'UC_UA',
            },
            // class_parse:'.fed-pops-navbar&&ul.fed-part-rows&&a.fed-part-eone:gt(0):lt(5);a&&Text;a&&href;.*/(.*?).html',
            class_parse: '.fed-pops-navbar&&ul.fed-part-rows&&a;a&&Text;a&&href;.*/(.*?).html',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: 'ul.fed-list-info.fed-part-rows;li;a.fed-list-title&&Text;a&&data-original;.fed-list-remarks&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: '.fed-list-info&&li;a.fed-list-title&&Text;a&&data-original;.fed-list-remarks&&Text;a&&href',
            二级: {
                "title": "h1.fed-part-eone&&Text;.fed-deta-content&&.fed-part-rows&&li&&Text",
                "img": ".fed-list-info&&a&&data-original",
                "desc": ".fed-deta-content&&.fed-part-rows&&li:eq(1)&&Text;.fed-deta-content&&.fed-part-rows&&li:eq(2)&&Text;.fed-deta-content&&.fed-part-rows&&li:eq(3)&&Text",
                "content": ".fed-part-esan&&Text",
                "tabs": ".fed-drop-boxs&&.fed-part-rows&&li",
                "lists": ".fed-play-item:eq(#id)&&ul:eq(1)&&li"
            },
            搜索: '.fed-deta-info;h1&&Text;.lazyload&&data-original;.fed-list-remarks&&Text;a&&href;.fed-deta-content&&Text',
        },
        海螺3: {
            title: '',
            host: '',
            searchUrl: '/v_search/**----------fypage---.html',
            url: '/vod_____show/fyclass--------fypage---.html',
            headers: {
                'User-Agent': 'MOBILE_UA'
            },
            timeout: 5000,
            class_parse: 'body&&.hl-nav li:gt(0);a&&Text;a&&href;.*/(.*?).html',
            cate_exclude: '明星|专题|最新|排行',
            limit: 40,
            play_parse: true,
            lazy: '',
            推荐: '.hl-vod-list;li;a&&title;a&&data-original;.remarks&&Text;a&&href',
            double: true,
            一级: '.hl-vod-list&&.hl-list-item;a&&title;a&&data-original;.remarks&&Text;a&&href',
            二级: {
                "title": ".hl-infos-title&&Text;.hl-text-conch&&Text",
                "img": ".hl-lazy&&data-original",
                "desc": ".hl-infos-content&&.hl-text-conch&&Text",
                "content": ".hl-content-text&&Text",
                "tabs": ".hl-tabs&&a",
                "lists": ".hl-plays-list:eq(#id)&&li"
            },
            搜索: '.hl-list-item;a&&title;a&&data-original;.remarks&&Text;a&&href',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
        },
        海螺2: {
            title: '',
            host: '',
            searchUrl: '/index.php/vod/search/page/fypage/wd/**/',
            url: '/index.php/vod/show/id/fyclass/page/fypage/',
            headers: {
                'User-Agent': 'MOBILE_UA'
            },
            timeout: 5000,
            class_parse: '#nav-bar li;a&&Text;a&&href;id/(.*?)/',
            limit: 40,
            play_parse: true,
            lazy: '',
            推荐: '.list-a.size;li;a&&title;.lazy&&data-original;.bt&&Text;a&&href',
            double: true,
            一级: '.list-a&&li;a&&title;.lazy&&data-original;.list-remarks&&Text;a&&href',
            二级: {
                "title": "h2&&Text;.deployment&&Text",
                "img": ".lazy&&data-original",
                "desc": ".deployment&&Text",
                "content": ".ec-show&&Text",
                "tabs": "#tag&&a",
                "lists": ".play_list_box:eq(#id)&&li"
            },
            搜索: '.search-list;a&&title;.lazy&&data-original;.deployment&&Text;a&&href',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
        },
        短视: {
            title: '',
            host: '',
            // homeUrl:'/',
            url: '/channel/fyclass-fypage.html',
            searchUrl: '/search.html?wd=**',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {//网站的请求头,完整支持所有的,常带ua和cookies
                'User-Agent': 'MOBILE_UA',
                // "Cookie": "searchneed=ok"
            },
            class_parse: '.menu_bottom ul li;a&&Text;a&&href;.*/(.*?).html',
            cate_exclude: '解析|动态',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: '.indexShowBox;ul&&li;a&&title;img&&data-src;.s1&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: '.pic-list&&li;a&&title;img&&data-src;.s1&&Text;a&&href',
            二级: {
                "title": "h1&&Text;.content-rt&&p:eq(0)&&Text",
                "img": ".img&&img&&data-src",
                "desc": ".content-rt&&p:eq(1)&&Text;.content-rt&&p:eq(2)&&Text;.content-rt&&p:eq(3)&&Text;.content-rt&&p:eq(4)&&Text;.content-rt&&p:eq(5)&&Text",
                "content": ".zkjj_a&&Text",
                "tabs": ".py-tabs&&option",
                "lists": ".player:eq(#id) li"
            },
            搜索: '.sr_lists&&ul&&li;h3&&Text;img&&data-src;.int&&p:eq(0)&&Text;a&&href',
        },
        短视2:{
            title: '',
            host: '',
            class_name:'电影&电视剧&综艺&动漫',
            class_url:'1&2&3&4',
            searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
            searchable: 2,
            quickSearch: 0,
            headers:{'User-Agent':'MOBILE_UA'},
            url: '/index.php/api/vod#type=fyclass&page=fypage',
            filterable:0,//是否启用分类筛选,
            filter_url:'',
            filter: {},
            filter_def:{},
            detailUrl:'/index.php/vod/detail/id/fyid.html',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐:'.list-vod.flex .public-list-box;a&&title;.lazy&&data-original;.public-list-prb&&Text;a&&href',
            一级:'js:let body=input.split("#")[1];let t=Math.round(new Date/1e3).toString();let key=md5("DS"+t+"DCC147D11943AF75");let url=input.split("#")[0];body=body+"&time="+t+"&key="+key;print(body);fetch_params.body=body;let html=post(url,fetch_params);let data=JSON.parse(html);VODS=data.list.map(function(it){it.vod_pic=urljoin2(input.split("/i")[0],it.vod_pic);return it});',
            二级:{
                "title":".slide-info-title&&Text;.slide-info:eq(3)--strong&&Text",
                "img":".detail-pic&&data-original",
                "desc":".fraction&&Text;.slide-info-remarks:eq(1)&&Text;.slide-info-remarks:eq(2)&&Text;.slide-info:eq(2)--strong&&Text;.slide-info:eq(1)--strong&&Text",
                "content":"#height_limit&&Text",
                "tabs":".anthology.wow.fadeInUp.animated&&.swiper-wrapper&&a",
                "tab_text":".swiper-slide&&Text",
                "lists":".anthology-list-box:eq(#id) li"
            },
            搜索:'json:list;name;pic;;id',
        }
    };
    return JSON.parse(JSON.stringify(mubanDict));
}
var mubanDict = getMubans();
var muban = getMubans();
export default {muban,getMubans};��: {
            title: '',
            host: '', // homeUrl:'/',
            url: '/channel/fyclass-fypage.html',
            searchUrl: '/search.html?wd=**',
            searchable: 2, //是否启用全局搜索,
            quickSearch: 0, //是否启用快速搜索,
            filterable: 0, //是否启用分类筛选,
            headers: { //网站的请求头,完整支持所有的,常带ua和cookies
                'User-Agent': 'MOBILE_UA', // "Cookie": "searchneed=ok"
            },
            class_parse: '.menu_bottom ul li;a&&Text;a&&href;.*/(.*?).html',
            cate_exclude: '解析|动态',
            play_parse: true,
            lazy: common_lazy,
            limit: 6,
            double: true, // 推荐内容是否双层定位
            推荐: '.indexShowBox;ul&&li;a&&title;img&&data-src;.s1&&Text;a&&href',
            一级: '.pic-list&&li;a&&title;img&&data-src;.s1&&Text;a&&href',
            二级: {
                title: 'h1&&Text;.content-rt&&p:eq(0)&&Text',
                img: '.img&&img&&data-src',
                desc: '.content-rt&&p:eq(1)&&Text;.content-rt&&p:eq(2)&&Text;.content-rt&&p:eq(3)&&Text;.content-rt&&p:eq(4)&&Text;.content-rt&&p:eq(5)&&Text',
                content: '.zkjj_a&&Text',
                tabs: '.py-tabs&&option',
                lists: '.player:eq(#id) li',
            },
            搜索: '.sr_lists&&ul&&li;h3&&Text;img&&data-src;.int&&p:eq(0)&&Text;a&&href',
        },
        短视2: {
            title: '',
            host: '',
            class_name: '电影&电视剧&综艺&动漫',
            class_url: '1&2&3&4',
            searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
            searchable: 2,
            quickSearch: 0,
            headers: {
                'User-Agent': 'MOBILE_UA'
            },
            url: '/index.php/api/vod#type=fyclass&page=fypage',
            filterable: 0, //是否启用分类筛选,
            filter_url: '',
            filter: {},
            filter_def: {},
            detailUrl: '/index.php/vod/detail/id/fyid.html',
            play_parse: true,
            lazy: common_lazy,
            limit: 6,
            推荐: '.list-vod.flex .public-list-box;a&&title;.lazy&&data-original;.public-list-prb&&Text;a&&href',
            一级: 'js:let body=input.split("#")[1];let t=Math.round(new Date/1e3).toString();let key=md5("DS"+t+"DCC147D11943AF75");let url=input.split("#")[0];body=body+"&time="+t+"&key="+key;print(body);fetch_params.body=body;let html=post(url,fetch_params);let data=JSON.parse(html);VODS=data.list.map(function(it){it.vod_pic=urljoin2(input.split("/i")[0],it.vod_pic);return it});',
            二级: {
                title: '.slide-info-title&&Text;.slide-info:eq(2)--strong&&Text',
                img: '.detail-pic&&data-original',
                desc: '.slide-info-remarks&&Text;.slide-info-remarks:eq(1)&&Text;.slide-info-remarks:eq(2)&&Text;.slide-info:eq(1)--strong&&Text;.info-parameter&&ul&&li:eq(3)&&Text',
                content: '#height_limit&&Text',
                tabs: '.anthology.wow.fadeInUp.animated&&.swiper-wrapper&&a',
                tab_text: 'a--span&&Text',
                lists: '.anthology-list-box:eq(#id) li',
            },
            搜索: 'json:list;name;pic;;id',
        },
        采集1: {
            title: '',
            host: '',
            homeTid: '13',
            homeUrl: '/api.php/provide/vod/?ac=detail&t={{rule.homeTid}}',
            detailUrl: '/api.php/provide/vod/?ac=detail&ids=fyid',
            searchUrl: '/api.php/provide/vod/?wd=**&pg=fypage',
            url: '/api.php/provide/vod/?ac=detail&pg=fypage&t=fyclass',
            headers: {
                'User-Agent': 'MOBILE_UA'
            },
            timeout: 5000, // class_name: '电影&电视剧&综艺&动漫',
            // class_url: '1&2&3&4',
            // class_parse:'js:let html=request(input);input=JSON.parse(html).class;',
            class_parse: 'json:class;',
            limit: 20,
            multi: 1,
            searchable: 2, //是否启用全局搜索,
            quickSearch: 1, //是否启用快速搜索,
            filterable: 0, //是否启用分类筛选,
            play_parse: true,
            parse_url: '',
            lazy: cj_lazy,
            推荐: '*',
            一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id;vod_play_from',
            二级: `js:
            let html=request(input);
            html=JSON.parse(html);
            let data=html.list;
            VOD=data[0];`,
            搜索: '*',
        },
    };
    return JSON.parse(JSON.stringify(mubanDict));
}

var mubanDict = getMubans();
var muban = getMubans();
export default {
    muban,
    getMubans
};