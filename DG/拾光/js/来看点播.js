var rule = {
    author: '书虫/250603/第1版',
    title: '来看点播',
    类型: '影视',
    //主页 网页的域名根
    host: 'https://lkvod.me/',
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
    
     
//  https://lkvod.me/show/1-大陆--喜剧-----2---.html

    url: 'https://lkvod.me/show/fyclassfyfilter-----fypage---.html',

    filter_url: '-{{fl.area}}--{{fl.class}}',
    detailUrl: 'https://lkvod.me/detail/fyid.html',
        //搜索链接 可以是完整路径或者相对路径,用于分类获取和推荐获取 **代表搜索词 fypage代表页数
   searchUrl: 'https://lkvod.me/show/id-----------.html?wd=**&page=fypage',
   
    //  搜索页找参数  数组标题图片副标题链接
    搜索: '*',
    //rss搜索写法
  //    searchUrl: '/rss/index.xml?wd=**&page=fypage',
    //  ajax搜索写法
//      searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&page=fypage&limit=30',
      
 //     搜索: 'json:list;name;pic;en;id',  

    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 10,
    double: false,
    class_name: '电影&电视剧&综艺&动漫',
    //静态分类值
    class_url: '1&2&3&4',


    filter_def: {
        1: {
            cateId: '1'
        },
        2: {
            cateId: '2'
        },
        3: {
            cateId: '3'
        },
    
        
           4: {
            cateId: '4'
        }
        
    },
    
    
    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',
    //推荐页的json模式
    //推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    //数组、标题、图片、副标题、链接，分类页找参数
    一级: '.public-list-box;a&&title;img&&data-src;.hide.ft2&&Text;a&&href',


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
VOD.vod_name = pdfh(html, 'h3&&Text');
 VOD.type_name = pdfh(html, '.slide-info.hide&&span:gt(2)&&Text');
 VOD.vod_pic = pd(html, 'img&&src', input);
 VOD.vod_remarks = pdfh(html, '.slide-info:eq(1)&&Text');
 VOD.vod_year = pdfh(html, '.slide-info-remarks:eq(0)&&span&&Text');
VOD.vod_area = pdfh(html, '.slide-info-remarks:eq(1)&&span&&Text');
 
VOD.vod_director = pdfh(html, '.slide-info.hide:contains(导演)&&Text').replace('导演 :','');
 VOD.vod_actor = pdfh(html, '.slide-info.hide:contains(演员)&&Text').replace('演员 :','');
 VOD.vod_content = '书虫祝您观影愉快！现为您介绍剧情:' + pdfh(html, '.text.cor3&&Text');
 
 let r_ktabs = pdfa(html,'.anthology-tab.nav-swiper&&a');
 let ktabs = r_ktabs.map(it => pdfh(it, 'Text'));
 VOD.vod_play_from = ktabs.join('$$$');
 

let klists = [];
 let r_plists = pdfa(html, '.anthology-list-play');
 r_plists.forEach((rp) => {
     let klist = pdfa(rp, 'body&&a').map((it) => {
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
    
        play_parse: true,
    //播放地址通用解析
    lazy: `js:
let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
let kurl = kcode.url;
if (kcode.encrypt == '1') {
url = unescape(url)
} else if (kcode.encrypt == '2') {
url = unescape(base64Decode(url))
};
if (/\\.(m3u8|mp4)/.test(kurl)) {
input = { jx: 0, parse: 0, url: kurl }
} else {
input = { jx: 0, parse: 1, url: input }
}`,
    
    


    
    filter: {
        "1": [
        
        
        {
                "key": "class",
                "name": "剧情",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "喜剧", "v": "喜剧"},
  {"n": "爱情", "v": "爱情"},
  {"n": "恐怖", "v": "恐怖"},
  {"n": "动作", "v": "动作"},
  {"n": "科幻", "v": "科幻"},
  {"n": "剧情", "v": "剧情"},
  {"n": "战争", "v": "战争"},
  {"n": "警匪", "v": "警匪"},
  {"n": "犯罪", "v": "犯罪"},
  {"n": "动画", "v": "动画"},
  {"n": "奇幻", "v": "奇幻"},
  {"n": "武侠", "v": "武侠"},
  {"n": "冒险", "v": "冒险"},
  {"n": "枪战", "v": "枪战"},
  {"n": "悬疑", "v": "悬疑"},
  {"n": "惊悚", "v": "惊悚"},
  {"n": "经典", "v": "经典"},
  {"n": "青春", "v": "青春"},
  {"n": "文艺", "v": "文艺"},
  {"n": "微电影", "v": "微电影"},
  {"n": "古装", "v": "古装"},
  {"n": "历史", "v": "历史"},
  {"n": "运动", "v": "运动"},
  {"n": "农村", "v": "农村"},
  {"n": "儿童", "v": "儿童"},
  {"n": "网络电影", "v": "网络电影"},
  {"n": "伦理", "v": "伦理"},
  {"n": "福利", "v": "情色"}
]


},

{
                "key": "area",
                "name": "地区",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "大陆"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "美国", "v": "美国"},
  {"n": "法国", "v": "法国"},
  {"n": "英国", "v": "英国"},
  {"n": "日本", "v": "日本"},
  {"n": "韩国", "v": "韩国"},
  {"n": "德国", "v": "德国"},
  {"n": "泰国", "v": "泰国"},
  {"n": "印度", "v": "印度"},
  {"n": "意大利", "v": "意大利"},
  {"n": "西班牙", "v": "西班牙"},
  {"n": "加拿大", "v": "加拿大"},
  {"n": "其他", "v": "其他"}
]

}
                ],
        "2": [
        
        {
                "key": "class",
                "name": "剧情",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "古装", "v": "古装"},
  {"n": "战争", "v": "战争"},
  {"n": "青春偶像", "v": "青春偶像"},
  {"n": "喜剧", "v": "喜剧"},
  {"n": "家庭", "v": "家庭"},
  {"n": "犯罪", "v": "犯罪"},
  {"n": "动作", "v": "动作"},
  {"n": "奇幻", "v": "奇幻"},
  {"n": "剧情", "v": "剧情"},
  {"n": "历史", "v": "历史"},
  {"n": "经典", "v": "经典"},
  {"n": "乡村", "v": "乡村"},
  {"n": "情景", "v": "情景"},
  {"n": "商战", "v": "商战"},
  {"n": "网剧", "v": "网剧"},
  {"n": "其他", "v": "其他"}
]



},

{
                "key": "area",
                "name": "地区",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "内地", "v": "内地"},
  {"n": "韩国", "v": "韩国"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "日本", "v": "日本"},
  {"n": "美国", "v": "美国"},
  {"n": "泰国", "v": "泰国"},
  {"n": "英国", "v": "英国"},
  {"n": "新加坡", "v": "新加坡"},
  {"n": "其他", "v": "其他"}
]

}
                       
        
        ],

"3": [
        
        {
                "key": "class",
                "name": "剧情",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "选秀", "v": "选秀"},
  {"n": "情感", "v": "情感"},
  {"n": "访谈", "v": "访谈"},
  {"n": "播报", "v": "播报"},
  {"n": "旅游", "v": "旅游"},
  {"n": "音乐", "v": "音乐"},
  {"n": "美食", "v": "美食"},
  {"n": "纪实", "v": "纪实"},
  {"n": "曲艺", "v": "曲艺"},
  {"n": "生活", "v": "生活"},
  {"n": "游戏互动", "v": "游戏互动"},
  {"n": "财经", "v": "财经"},
  {"n": "求职", "v": "求职"}
]
},
       
        {
                "key": "area",
                "name": "地区",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "内地", "v": "内地"},
  {"n": "港台", "v": "港台"},
  {"n": "日韩", "v": "日韩"},
  {"n": "欧美", "v": "欧美"}
]


            }
            
        ],
        
        "4": [
        {
                "key": "class",
                "name": "剧情",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "情感", "v": "情感"},
  {"n": "科幻", "v": "科幻"},
  {"n": "热血", "v": "热血"},
  {"n": "推理", "v": "推理"},
  {"n": "搞笑", "v": "搞笑"},
  {"n": "冒险", "v": "冒险"},
  {"n": "萝莉", "v": "萝莉"},
  {"n": "校园", "v": "校园"},
  {"n": "动作", "v": "动作"},
  {"n": "机战", "v": "机战"},
  {"n": "运动", "v": "运动"},
  {"n": "战争", "v": "战争"},
  {"n": "少年", "v": "少年"},
  {"n": "少女", "v": "少女"},
  {"n": "社会", "v": "社会"},
  {"n": "原创", "v": "原创"},
  {"n": "亲子", "v": "亲子"},
  {"n": "益智", "v": "益智"},
  {"n": "励志", "v": "励志"},
  {"n": "其他", "v": "其他"}
]
},
                
                {
                "key": "area",
                "name": "地区",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "内地", "v": "内地"},
  {"n": "港台", "v": "港台"},
  {"n": "日韩", "v": "日韩"},
  {"n": "欧美", "v": "欧美"}
]


}

            
        ]

        
    }
}