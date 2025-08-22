var rule = {
    author: '书虫/250608/第1版',
    title: '蓝光影院',
    类型: '影视',
    //主页 网页的域名根
    host: 'https://www.5le.cc/',
    hostJs: ``,
    headers: {
        'User-Agen': 'Mozilla/5.0'
    },
    //不填就默认utf-8，根据网页源码所显示的格式填，根据需要可填UTF-8，GBK，GB2312
    编码: 'utf-8',
    timeout: 5000,
    //首页链接，可以是完整路径或者相对路径,用于分类获取和推荐获取
    homeUrl: '/',
    //分类链接,分类参数用fyclasss,页码用fypage，带筛选的用fyfilter，第一页无页码的用[]括起，处理方式同xbpq方式，fyfilter代表filter_url里内容


    //  https://www.5le.cc/vod/show/area/大陆/class/喜剧/id/movie/page/2.html

    url: 'https://www.5le.cc/vod/showfyfilter/id/fyclass/page/fypage.html',

    filter_url: '{{fl.area}}{{fl.class}}',
    detailUrl: 'https://www.5le.cc/movie/fyid.html',
    //搜索链接 可以是完整路径或者相对路径,用于分类获取和推荐获取 **代表搜索词 fypage代表页数
//   searchUrl: 'https://yipinmaoyi.com/search.php?page=fypage&searchword=**&searchtype=',

    //  搜索页找参数  数组标题图片副标题链接
//   搜索: '*',
    //rss搜索写法
    //    searchUrl: '/rss/index.xml?wd=**&page=fypage',
    //  ajax搜索写法
          searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&page=fypage&limit=30',

         搜索: 'json:list;name;pic;en;id',  

    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 10,
    double: false,
    class_name: '电影&电视剧&综艺&动漫',
    //静态分类值
    class_url: 'movie&Series&variety&cartoon',


    filter_def: {
'movie': {
            cateId: 'movie'
        },
        'Series': {
            cateId: 'Series'
        },
        'variety': {
            cateId: 'variety'
        },
    
        
           'cartoon': {
            cateId: 'cartoon'
        }
          
        
           

    },


    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',
    //推荐页的json模式
    //推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    //数组、标题、图片、副标题、链接，分类页找参数
    一级: '.module-item;a&&title;.lazyloaded&&data-original;.module-item-text&&Text;a&&href',


    //数组、标题、图片、副标题、链接，分类页找参数

    //一级: `js:
    //let klist=pdfa(request(input),'.vertical-box');
    // let k=[];
    //klist.forEach(it=>{
    // k.push({
    //title: pdfh(it,'.title&&Text'),
    // pic_url: !pdfh(it,'.lazyload&&data-original').startsWith('http') ? HOST + pdfh(it,'.lazyload&&data-original') : pdfh(it,'.lazyload&&data-original'),

    //desc: pdfh(it,''),
    // url: pdfh(it,'a&&href'),
    //content: ''    
    // })
    //});
    //setResult(k)
    //`,

    //普通搜索模板  搜索数组标题图片副标题链接
    //搜索: `js:

    //let klist=pdfa(request(input),'.hzixunui-vodlist__thumb');
    // let k=[];
    //klist.forEach(it=>{
    //k.push({
    //        title: pdfh(it,'a&&title'),
    //       pic_url: !pdfh(it,'a&&data-original').startsWith('http') ? HOST + pdfh(it,'a&&data-original') : pdfh(it,'a&&data-original'),
    //       desc: pdfh(it,'.text-right&&Text'),
    //        url: pdfh(it,'a&&href'),
    //        content: ''    
    //     })
    // });
    // setResult(k)
    // `,

    //rss搜索模板
    //  搜索: `js:
    //let klist=pdfa(request(input),'rss&&item');
    //   let k=[];
    //   klist.forEach(it=>{
    //    it=it.replace(/title|link|author|pubdate|description/g,'p');
    //    k.push({
    //         title: pdfh(it,'p:eq(0)&&Text'),
    //         pic_url: '',
    //       desc: pdfh(it,'p:eq(3)&&Text'),
    //         url: pdfh(it,'p:eq(1)&&Text').replace('cc','la'),    
    //      content: pdfh(it,'p:eq(4)&&Text')    
    //     })
    //     });
    // setResult(k)
    //" `,

    //详情页找参数
    //第一部分分别是对应参数式中的标题、类型、图片、备注、年份、地区、导演、主演、简介
    //第二部分分别对应参数式中的线路数组和线路标题
    //第三部分分别对应参数式中的播放数组、播放列表、播放标题、播放链接

    二级: `js:
let html = request(input);
VOD = {};
 VOD.vod_id = input;
VOD.vod_name = pdfh(html, 'h1&&Text');
 VOD.type_name = pdfh(html, '.tag-link:eq(1)&&Text');
 VOD.vod_pic = pd(html, '.lazyloaded&&data-original', input);
 VOD.vod_remarks = pdfh(html, '.video-info-item:contains(集数)&&Text');
 VOD.vod_year = pdfh(html, '.tag-link:eq(2)&&Text');
VOD.vod_area = pdfh(html, '.tag-link:eq(3)&&Text');
 
VOD.vod_director = pdfh(html, '.video-info-items:contains(导演)&&Text').replace('导演：','');
 
 VOD.vod_actor = pdfh(html, '.video-info-items:contains(主演)&&Text').replace('主演：','');
 VOD.vod_content = '书虫祝您观影愉快！现为您介绍剧情:' + pdfh(html, '.video-info-items:contains(剧情)&&Text').replace('剧情：','');
 
 
 let r_ktabs = pdfa(html,'.module-tab-items&&span');
 let ktabs = r_ktabs.map(it => pdfh(it, 'Text'));
 VOD.vod_play_from = ktabs.join('$$$');
 
let klists = [];
 let r_plists = pdfa(html, '.module-blocklist');
 r_plists.forEach((rp) => {
     let klist = pdfa(rp, 'a').map((it) => {
     return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input);
     });
     klist = klist.join('#');
     klists.push(klist);
 });
 VOD.vod_play_url = klists.join('$$$')


 `,
    //是否启用辅助嗅探: 1,0
    sniffer: 0,
    // 辅助嗅探规则
    isVideo: 'http((?!http).){26,}\\.(m3u8|mp4|flv|avi|mkv|wmv|mpg|mpeg|mov|ts|3gp|rm|rmvb|asf|m4a|mp3|wma)',

    play_parse: false,
    //播放地址通用解析
    lazy: $js.toString(() => {
        let kcode = JSON.parse(fetch(input).split('aaaa=')[1].split('<')[0]);
        let kurl = kcode.url;
        if (/\.(m3u8|mp4)/.test(kurl)) {
            input = {
                jx: 0,
                parse: 0,
                url: kurl,
                header: {
                    'User-Agent': MOBILE_UA,
                    'Referer': getHome(kurl)
                }
            }
        } else {
            input = {
                jx: 0,
                parse: 1,
                url: input
            }
        }
    }),



    filter: {
        "movie": [
        

        {
                "key": "class",
                "name": "剧情",
                "value":[
    {"n":"全部","v":""},
    {"n":"喜剧","v":"/class/喜剧"},
    {"n":"爱情","v":"/class/爱情"},
    {"n":"恐怖","v":"/class/恐怖"},
    {"n":"动作","v":"/class/动作"},
    {"n":"科幻","v":"/class/科幻"},
    {"n":"剧情","v":"/class/剧情"},
    {"n":"战争","v":"/class/战争"},
    {"n":"警匪","v":"/class/警匪"},
    {"n":"犯罪","v":"/class/犯罪"},
    {"n":"动画","v":"/class/动画"},
    {"n":"奇幻","v":"/class/奇幻"},
    {"n":"武侠","v":"/class/武侠"},
    {"n":"冒险","v":"/class/冒险"},
    {"n":"枪战","v":"/class/枪战"},
    {"n":"悬疑","v":"/class/悬疑"},
    {"n":"惊悚","v":"/class/惊悚"},
    {"n":"经典","v":"/class/经典"},
    {"n":"青春","v":"/class/青春"},
    {"n":"文艺","v":"/class/文艺"},
    {"n":"微电影","v":"/class/微电影"},
    {"n":"古装","v":"/class/古装"},
    {"n":"历史","v":"/class/历史"},
    {"n":"运动","v":"/class/运动"},
    {"n":"农村","v":"/class/农村"},
    {"n":"儿童","v":"/class/儿童"},
    {"n":"网络电影","v":"/class/网络电影"},
        {"n":"伦理","v":"/class/伦理"},
    {"n":"福利","v":"/class/情色"}
]


            },

            {
                "key": "area",
                "name": "地区",
                "value": [
    {"n":"全部","v":""},
    {"n":"大陆","v":"/area/大陆"},
    {"n":"香港","v":"/area/香港"},
    {"n":"台湾","v":"/area/台湾"},
    {"n":"美国","v":"/area/美国"},
    {"n":"法国","v":"/area/法国"},
    {"n":"英国","v":"/area/英国"},
    {"n":"日本","v":"/area/日本"},
    {"n":"韩国","v":"/area/韩国"},
    {"n":"德国","v":"/area/德国"},
    {"n":"泰国","v":"/area/泰国"},
    {"n":"印度","v":"/area/印度"},
    {"n":"意大利","v":"/area/意大利"},
    {"n":"西班牙","v":"/area/西班牙"},
    {"n":"加拿大","v":"/area/加拿大"},
    {"n":"其他","v":"/area/其他"}
]



            }
        ],
        "Series": [
       {
                "key": "class",
                "name": "剧情",
                "value":[
    {"n":"全部","v":""},
    {"n":"喜剧","v":"/class/喜剧"},
    {"n":"爱情","v":"/class/爱情"},
    {"n":"动作","v":"/class/动作"},
    {"n":"科幻","v":"/class/科幻"},
    {"n":"剧情","v":"/class/剧情"},
    {"n":"运动","v":"/class/运动"},
    {"n":"悬疑","v":"/class/悬疑"},
    {"n":"犯罪","v":"/class/犯罪"},
    {"n":"惊悚","v":"/class/惊悚"},
    {"n":"冒险","v":"/class/冒险"},
    {"n":"音乐","v":"/class/音乐"},
    {"n":"历史","v":"/class/历史"},
    {"n":"奇幻","v":"/class/奇幻"},
    {"n":"恐怖","v":"/class/恐怖"},
    {"n":"战争","v":"/class/战争"},
    {"n":"传记","v":"/class/传记"},
    {"n":"歌舞","v":"/class/歌舞"},
    {"n":"武侠","v":"/class/武侠"},
    {"n":"情色","v":"/class/情色"},
    {"n":"灾难","v":"/class/灾难"},
    {"n":"西部","v":"/class/西部"},
    {"n":"古装","v":"/class/古装"},
    {"n":"同性","v":"/class/同性"},
    {"n":"家庭","v":"/class/家庭"},
    {"n":"纪录","v":"/class/纪录"},
    {"n":"短片","v":"/class/短片"},
    {"n":"儿童","v":"/class/儿童"},
    {"n":"丧尸","v":"/class/丧尸"},
    {"n":"青春","v":"/class/青春"},
    {"n":"励志","v":"/class/励志"},
    {"n":"人性","v":"/class/人性"},
    {"n":"美食","v":"/class/美食"},
    {"n":"女性","v":"/class/女性"},
    {"n":"治愈","v":"/class/治愈"},
    {"n":"校园","v":"/class/校园"},
    {"n":"文艺","v":"/class/文艺"},
    {"n":"穿越","v":"/class/穿越"}
]

            },
            {
                "key": "area",
                "name": "地区",
                "value": [
    {"n":"全部","v":""},
    {"n":"内地","v":"/area/内地"},
    {"n":"韩国","v":"/area/韩国"},
    {"n":"香港","v":"/area/香港"},
    {"n":"台湾","v":"/area/台湾"},
    {"n":"日本","v":"/area/日本"},
    {"n":"美国","v":"/area/美国"},
    {"n":"泰国","v":"/area/泰国"},
    {"n":"英国","v":"/area/英国"},
    {"n":"新加坡","v":"/area/新加坡"},
    {"n":"其他","v":"/area/其他"}
]


            }
        ],


        "variety": [
        
{
                "key": "class",
                "name": "剧情",
                "value":[
    {"n":"全部","v":""},
    {"n":"选秀","v":"/class/选秀"},
    {"n":"情感","v":"/class/情感"},
    {"n":"访谈","v":"/class/访谈"},
    {"n":"播报","v":"/class/播报"},
    {"n":"旅游","v":"/class/旅游"},
    {"n":"音乐","v":"/class/音乐"},
    {"n":"美食","v":"/class/美食"},
    {"n":"纪实","v":"/class/纪实"},
    {"n":"曲艺","v":"/class/曲艺"},
    {"n":"生活","v":"/class/生活"},
    {"n":"游戏互动","v":"/class/游戏互动"},
    {"n":"财经","v":"/class/财经"},
    {"n":"求职","v":"/class/求职"}
]

            },
            {
                "key": "area",
                "name": "地区",
                "value": [
    {"n":"全部","v":""},
    {"n":"内地","v":"/area/内地"},
    {"n":"港台","v":"/area/港台"},
    {"n":"日韩","v":"/area/日韩"},
    {"n":"欧美","v":"/area/欧美"}
]

            }
        ],
        "cartoon": [
         
        {
                "key": "class",
                "name": "剧情",
                "value": [
    {"n":"全部","v":""},
    {"n":"情感","v":"/class/情感"},
    {"n":"科幻","v":"/class/科幻"},
    {"n":"热血","v":"/class/热血"},
    {"n":"推理","v":"/class/推理"},
    {"n":"搞笑","v":"/class/搞笑"},
    {"n":"冒险","v":"/class/冒险"},
    {"n":"萝莉","v":"/class/萝莉"},
    {"n":"校园","v":"/class/校园"},
    {"n":"动作","v":"/class/动作"},
    {"n":"机战","v":"/class/机战"},
    {"n":"运动","v":"/class/运动"},
    {"n":"战争","v":"/class/战争"},
    {"n":"少年","v":"/class/少年"},
    {"n":"少女","v":"/class/少女"},
    {"n":"社会","v":"/class/社会"},
    {"n":"原创","v":"/class/原创"},
    {"n":"亲子","v":"/class/亲子"},
    {"n":"益智","v":"/class/益智"},
    {"n":"励志","v":"/class/励志"},
    {"n":"其他","v":"/class/其他"}
]

            },

            {
                "key": "area",
                "name": "地区",
                "value": [
    {"n":"全部","v":""},
    {"n":"国产","v":"/area/国产"},
    {"n":"日本","v":"/area/日本"},
    {"n":"欧美","v":"/area/欧美"},
    {"n":"其他","v":"/area/其他"}
]


            }
        ]


    }
}