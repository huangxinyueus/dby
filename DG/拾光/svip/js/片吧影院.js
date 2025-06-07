var rule = {
    author: '书虫/250603/第1版',
    title: '片吧影院',
    类型: '影视',
    //主页 网页的域名根
    host: 'https://www.pbkan.com/',
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
    
     
//  https://www.pbkan.com/class/5-大陆-------2---.html
    url: 'https://www.pbkan.com/class/fyfilter-------fypage---.html',

    filter_url: '{{fl.cateId}}-{{fl.area}}',
    detailUrl: 'https://www.pbkan.com/html/fyid.html',
    //搜索链接 可以是完整路径或者相对路径,用于分类获取和推荐获取 **代表搜索词 fypage代表页数
//    searchUrl: 'https://www.863ai.com/search.php?page=fypage&searchword=**&searchtype=',
    //  搜索页找参数  数组标题图片副标题链接
//    搜索: '.module-search-item;.lazyload&&alt;.lazyload&&data-src;;a&&href',
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
    class_name: '电影&电视剧&动漫&综艺&短剧',
    //静态分类值
    class_url: '1&2&3&4&29',


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
        },
        
                   29: {
            cateId: '29'
        }
        
    },
    
    
    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',
    //推荐页的json模式
    //推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    //数组、标题、图片、副标题、链接，分类页找参数
    一级: '.stui-vodlist__box;a&&title;a&&data-original;.text-right&&Text;a&&href',


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
 VOD.type_name = pdfh(html, 'p:contains(类型)&&Text').replace('类型：','');
 VOD.vod_pic = pd(html, '.lazyload&&data-original', input);
 VOD.vod_remarks = pdfh(html, 'p:contains(状态)&&Text').replace('状态：','');
 VOD.vod_year = pdfh(html, 'p:contains(年份)&&Text').replace('年份：','');
VOD.vod_area = pdfh(html, 'p:contains(地区)&&Text').replace('地区：','');
 
VOD.vod_director = pdfh(html, 'p:contains(导演)&&Text').replace('导演：','');
 VOD.vod_actor = pdfh(html, 'p:contains(演员)&&Text').replace('演员：','');
 VOD.vod_content = '书虫祝您观影愉快！现为您介绍剧情:' + pdfh(html, 'p:contains(剧情)&&Text').replace('剧情：','');
 
 let r_ktabs = pdfa(html,'.pull-right1');
 let ktabs = r_ktabs.map(it => pdfh(it, 'Text'));
 VOD.vod_play_from = ktabs.join('$$$');
 

let klists = [];
 let r_plists = pdfa(html, '.stui-content__playlist');
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
    lazy: $js.toString(() => {
let kcode = JSON.parse(fetch(input).split('aaaa=')[1].split('<')[0]);
let kurl = kcode.url;
if (/\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl, header: {'User-Agent': MOBILE_UA, 'Referer': getHome(kurl)} }
} else {
    input = { jx: 0, parse: 1, url: input }
}
}),


    
    filter: {
        "1": [
        
        
        {
                "key": "cateId",
                "name": "类型",
                "value":[
    {"n": "动作", "v": "5"},
    {"n": "喜剧", "v": "6"},
    {"n": "恐怖", "v": "7"},
    {"n": "科幻", "v": "8"},
    {"n": "爱情", "v": "9"},
    {"n": "剧情", "v": "10"},
    {"n": "战争", "v": "11"},
    {"n": "灾难", "v": "12"},
    {"n": "奇幻", "v": "13"},
    {"n": "犯罪", "v": "14"},
    {"n": "悬疑", "v": "15"}
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
  {"n": "西班牙", "v": "西班牙"}
]
}
                ],
        "2": [
        
        {
                "key": "cateId",
                "name": "类型",
                "value":[
    {"n": "国产剧", "v": "16"},
    {"n": "欧美剧", "v": "17"},
    {"n": "香港剧", "v": "18"},
    {"n": "台湾剧", "v": "20"},
    {"n": "韩国剧", "v": "21"},
    {"n": "日本剧", "v": "22"},
    {"n": "海外剧", "v": "23"}
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