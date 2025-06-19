var rule = {
    author: '250612/第1版',
    title: '看片网',
    类型: '影视',
    //主页 网页的域名根
    host: 'https://m.kp9090.com',
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


    //  https://m.kp9090.com/DongZuo/index_2_8_____大陆_1.html

    url: 'https://m.kp9090.com/fyfilter_1.html',

    filter_url: '{{fl.cateId}}/index_fypage_{{fl.class}}_____{{fl.area}}',
    detailUrl: 'https://m.kp9090.com/zongyi/fyid/',
    //搜索链接 可以是完整路径或者相对路径,用于分类获取和推荐获取 **代表搜索词 fypage代表页数
  searchUrl: 'https://m.kp9090.com/vod-search-wd-**-p-fypage.html',
    //  搜索页找参数  数组标题图片副标题链接
  搜索: 'li:has(.picsize);a&&title;img&&data-original;;a&&href',

    //rss搜索写法
    //    searchUrl: '/rss/index.xml?wd=**&page=fypage',
//      ajax搜索写法
  //      searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&page=fypage&limit=30',

  //      搜索: 'json:list;name;pic;en;id',  

    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 10,
    double: false,
    class_name: '电影&电视剧&动漫&综艺&微影视',
    //静态分类值
    class_url: 'Movie&TV&dongman&zongyi&WMovie',


    filter_def: {
'Movie': {
            cateId: 'Movie'
        },
        'TV': {
            cateId: 'TV'
        },
        'dongman': {
            cateId: 'dongman'
        },
    
        
           'zongyi': {
            cateId: 'zongyi'
        },
                'WMovie': {
            cateId: 'WMovie'
        }
    
        
           
    },


    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',
    //推荐页的json模式
    //推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    //数组、标题、图片、副标题、链接，分类页找参数
    一级: 'li:has(.picsize);a&&title;img&&data-original;.title&&Text;a&&href',


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
VOD.vod_name = pdfh(html, 'img&&alt');
 VOD.type_name = pdfh(html, 'p:contains(类型)&&Text').replace('类型：','');
 VOD.vod_pic = pd(html, 'img&&data-original', input);
 VOD.vod_remarks = pdfh(html, 'p:contains(状态)&&Text').replace('状态：','');
 VOD.vod_year = pdfh(html, 'p:contains(更新)&&Text').replace('更新：','');
VOD.vod_area = pdfh(html, 'p:contains(地区)&&Text').replace('地区：','');
 
VOD.vod_director = pdfh(html, 'p:contains(导演)&&Text').replace('导演：','');
 VOD.vod_actor = pdfh(html, 'p:contains(主演)&&Text').replace('主演：','');
 VOD.vod_content = '观影愉快！现为您介绍剧情:' + pdfh(html, '.vod_content&&Text');
 
 let r_ktabs = pdfa(html,'.play-title&&a');
 let ktabs = r_ktabs.map(it => pdfh(it, 'Text'));
 VOD.vod_play_from = ktabs.join('$$$');
 

let klists = [];
 let r_plists = pdfa(html, '.plau-ul-list');
 r_plists.forEach((rp) => {
     let klist = pdfa(rp, 'a:not([rel])').reverse().map((it) => {
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
    lazy: $js.toString(() => {
let kurl = fetch(input).split('frameborder="0" src=')[1].split('"')[0];

if (/\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl, header: {'User-Agent': MOBILE_UA, 'Referer': getHome(kurl)} }
} else {
    input = { jx: 0, parse: 1, url: input }
}
}),


    filter: {
        "TV": [
        
        {
                "key": "cateId",
                "name": "类型",
                "value":[
    {"n": "全部", "v": "TV"},
    {"n": "国产剧", "v": "DaLu"},
    {"n": "香港剧", "v": "Tvb"},
    {"n": "台湾剧", "v": "TaiJu"},
    {"n": "韩国剧", "v": "HanJu"},
    {"n": "日本剧", "v": "RiJu"},
    {"n": "欧美剧", "v": "MeiJu"},
    {"n": "泰国剧", "v": "TaiGuo"},
    {"n": "海外剧", "v": "HaiWai"}
]

},
        
        {
                "key": "class",
                "name": "剧情",
                "value":[
                {"n": "全部", "v": ""},
    {"n": "真人秀", "v": "230"},
    {"n": "脱口秀", "v": "227"},
    {"n": "推理", "v": "241"},
    {"n": "残酷", "v": "238"},
    {"n": "动作", "v": "237"},
    {"n": "军旅", "v": "72"},
    {"n": "生活", "v": "82"},
    {"n": "励志", "v": "83"},
    {"n": "年代", "v": "84"},
    {"n": "家庭", "v": "85"},
    {"n": "时装", "v": "86"},
    {"n": "言情", "v": "87"},
    {"n": "时尚", "v": "316"},
    {"n": "鬼怪", "v": "512"},
    {"n": "童话", "v": "221"},
    {"n": "少女", "v": "217"},
    {"n": "热血", "v": "216"},
    {"n": "搞笑", "v": "215"},
    {"n": "游戏", "v": "213"},
    {"n": "益智", "v": "212"}
]

            },
            {
                "key": "area",
                "name": "地区",
                "value": [
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "大陆"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "美国", "v": "美国"},
  {"n": "韩国", "v": "韩国"},
  {"n": "日本", "v": "日本"},
  {"n": "泰国", "v": "泰国"},
  {"n": "德国", "v": "德国"},
  {"n": "英国", "v": "英国"},
  {"n": "法国", "v": "法国"},
  {"n": "巴西", "v": "巴西"},
  {"n": "印度", "v": "印度"},
  {"n": "越南", "v": "越南"}
]
}
        ],
        "Movie": [
        {
                "key": "cateId",
                "name": "类型",
                "value":[
    {"n": "全部", "v": "Movie"},
    {"n": "喜剧片", "v": "XiJu"},
    {"n": "动作片", "v": "DongZuo"},
    {"n": "科幻片", "v": "KeHuan"},
    {"n": "恐怖片", "v": "KongBu"},
    {"n": "爱情片", "v": "AiQing"},
    {"n": "战争片", "v": "ZhanZheng"},
    {"n": "剧情片", "v": "jq"},
    {"n": "纪录片", "v": "JiLu"},
    {"n": "动画片", "v": "DongHua"}
]

},
        {
                "key": "class",
                "name": "剧情",
                "value":[
    {"n": "全部", "v": ""},
    {"n": "高智商", "v": "159"},
    {"n": "超自然", "v": "508"},
    {"n": "传记", "v": "115"},
    {"n": "动作", "v": "8"},
    {"n": "喜剧", "v": "9"},
    {"n": "爱情", "v": "10"},
    {"n": "科幻", "v": "11"},
    {"n": "恐怖", "v": "12"},
    {"n": "战争", "v": "13"},
    {"n": "剧情", "v": "26"},
    {"n": "理论", "v": "27"},
    {"n": "历史", "v": "28"},
    {"n": "文艺", "v": "29"},
    {"n": "歌舞", "v": "30"},
    {"n": "动画", "v": "32"},
    {"n": "生活", "v": "34"},
    {"n": "都市", "v": "223"},
    {"n": "游戏", "v": "285"},
    {"n": "商战", "v": "262"},
    {"n": "益智", "v": "261"}
]
            },
            {
                "key": "area",
                "name": "地区",
                "value": [
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "大陆"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "美国", "v": "美国"},
  {"n": "韩国", "v": "韩国"},
  {"n": "日本", "v": "日本"},
  {"n": "泰国", "v": "泰国"},
  {"n": "德国", "v": "德国"},
  {"n": "英国", "v": "英国"},
  {"n": "法国", "v": "法国"},
  {"n": "巴西", "v": "巴西"},
  {"n": "印度", "v": "印度"},
  {"n": "越南", "v": "越南"}
]

            }
        ],


        "zongyi": [
        
        {
                "key": "class",
                "name": "剧情",
                "value":[
    {"n": "全部", "v": ""},
    {"n": "真人秀", "v": "101"},
    {"n": "脱口秀", "v": "102"},
    {"n": "相声", "v": "510"},
    {"n": "晚会", "v": "16"},
    {"n": "财经", "v": "17"},
    {"n": "体育", "v": "18"},
    {"n": "纪实", "v": "19"},
    {"n": "生活", "v": "20"},
    {"n": "歌舞", "v": "21"},
    {"n": "故事", "v": "22"},
    {"n": "军事", "v": "23"},
    {"n": "少儿", "v": "24"},
    {"n": "新闻", "v": "25"},
    {"n": "益智", "v": "199"},
    {"n": "惊悚", "v": "371"},
    {"n": "历史", "v": "207"},
    {"n": "都市", "v": "220"},
    {"n": "文艺", "v": "242"},
    {"n": "明星", "v": "460"},
    {"n": "热血", "v": "289"},
    {"n": "悬疑", "v": "291"},
    {"n": "犯罪", "v": "293"},
    {"n": "喜剧", "v": "295"},
    {"n": "竞技", "v": "302"},
    {"n": "言情", "v": "332"},
    {"n": "运动", "v": "452"},
    {"n": "偶像", "v": "294"},
    {"n": "校园", "v": "246"},
    {"n": "情感", "v": "89"},
    {"n": "访谈", "v": "90"},
    {"n": "时尚", "v": "91"}
]

            },
            {
                "key": "area",
                "name": "地区",
                "value": [
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "大陆"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "美国", "v": "美国"},
  {"n": "韩国", "v": "韩国"},
  {"n": "日本", "v": "日本"},
  {"n": "泰国", "v": "泰国"},
  {"n": "德国", "v": "德国"},
  {"n": "英国", "v": "英国"},
  {"n": "法国", "v": "法国"},
  {"n": "巴西", "v": "巴西"},
  {"n": "印度", "v": "印度"},
  {"n": "越南", "v": "越南"}
]

            }
        ],
        "dongman": [
        
        
        {
                "key": "class",
                "name": "剧情",
                "value": [
    {"n": "全部", "v": ""},
    {"n": "美少女", "v": "57"},
    {"n": "异世界", "v": "524"},
    {"n": "玄幻", "v": "382"},
    {"n": "肉番", "v": "184"},
    {"n": "推理", "v": "54"},
    {"n": "后爱情", "v": "379"},
    {"n": "生活", "v": "288"},
    {"n": "家庭", "v": "296"},
    {"n": "都市", "v": "301"},
    {"n": "游戏", "v": "303"},
    {"n": "动画", "v": "206"},
    {"n": "言情", "v": "205"},
    {"n": "动漫", "v": "422"},
    {"n": "犯罪", "v": "258"},
    {"n": "美食", "v": "250"},
    {"n": "悬疑", "v": "226"},
    {"n": "音乐", "v": "214"},
    {"n": "偶像", "v": "211"},
    {"n": "文艺", "v": "209"},
    {"n": "歌舞", "v": "208"},
    {"n": "罪案", "v": "283"},
    {"n": "穿越", "v": "375"},
    {"n": "轻小说", "v": "377"},
    {"n": "泡面番", "v": "373"},
    {"n": "治愈", "v": "372"},
    {"n": "少女", "v": "376"},
    {"n": "童年", "v": "374"},
    {"n": "社会", "v": "386"},
    {"n": "教育", "v": "401"},
    {"n": "儿童", "v": "405"},
    {"n": "少年", "v": "453"}
]
},
            {
                "key": "area",
                "name": "地区",
                "value": [
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "大陆"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "美国", "v": "美国"},
  {"n": "韩国", "v": "韩国"},
  {"n": "日本", "v": "日本"},
  {"n": "泰国", "v": "泰国"},
  {"n": "德国", "v": "德国"},
  {"n": "英国", "v": "英国"},
  {"n": "法国", "v": "法国"},
  {"n": "巴西", "v": "巴西"},
  {"n": "印度", "v": "印度"},
  {"n": "越南", "v": "越南"}
]
            }
        ],
        
        "WMovie": [
        
        {
                "key": "class",
                "name": "剧情",
                "value":[
    {"n": "全部", "v": ""},
    {"n": "罪案", "v": "232"},
    {"n": "文艺", "v": "233"},
    {"n": "魔幻", "v": "234"},
    {"n": "冒险", "v": "235"},
    {"n": "悬疑", "v": "193"},
    {"n": "古装", "v": "360"},
    {"n": "校园", "v": "192"},
    {"n": "恐怖", "v": "2"},
    {"n": "明星", "v": "6"},
    {"n": "感人", "v": "191"},
    {"n": "职场", "v": "5"},
    {"n": "励志", "v": "3"},
    {"n": "爱情", "v": "7"},
    {"n": "剧情", "v": "14"},
    {"n": "生活", "v": "15"},
    {"n": "搞笑", "v": "4"},
    {"n": "青春", "v": "194"},
    {"n": "神话", "v": "333"},
    {"n": "历史", "v": "321"},
    {"n": "言情", "v": "313"},
    {"n": "竞技", "v": "312"},
    {"n": "武侠", "v": "310"},
    {"n": "喜剧", "v": "309"},
    {"n": "战争", "v": "308"},
    {"n": "谍战", "v": "306"},
    {"n": "家庭", "v": "304"},
    {"n": "音乐", "v": "297"},
    {"n": "灾难", "v": "287"},
    {"n": "热血", "v": "335"},
    {"n": "科幻", "v": "264"},
    {"n": "歌舞", "v": "263"}
]

            },
            {
                "key": "area",
                "name": "地区",
                "value": [
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "大陆"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "美国", "v": "美国"},
  {"n": "韩国", "v": "韩国"},
  {"n": "日本", "v": "日本"},
  {"n": "泰国", "v": "泰国"},
  {"n": "德国", "v": "德国"},
  {"n": "英国", "v": "英国"},
  {"n": "法国", "v": "法国"},
  {"n": "巴西", "v": "巴西"},
  {"n": "印度", "v": "印度"},
  {"n": "越南", "v": "越南"}
]
            }
        ]
        


    }
}