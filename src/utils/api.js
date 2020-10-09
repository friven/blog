/**
 * article模块接口列表
 */
import {get,post,dataPost} from '@/utils/request'; // 导入http中创建的axios实例
import {instance} from '@/utils/nomalRequest'; 
const article = {     
    // 搜索音乐
    searchMusic (params) {    
        return instance.post("/cloudsearch",params,{withCredentials: true,requestUrlType:"music"}); //实例化的axios的get方法第三个参数config不知道怎么加
    },
    // 热搜
    getHotSearch () {    
        return instance.get("/personalized/newsong",{withCredentials: true,requestUrlType:"music"}); //实例化的axios的get方法第三个参数config不知道怎么加
    },
    //获取音乐url
    getMusicUrl(params){
        return instance.post("/song/url",params,{withCredentials: true,requestUrlType:"music"})
    },
    //获取轮播图
    getBanner(){
        return instance.get("/banner?type=2",{withCredentials: true,requestUrlType:"music"})
    },
    //获取推荐歌单
    getRecommendList(){
        return instance.get("/personalized?limit=10",{withCredentials: true,requestUrlType:"music"})
    },
    // 推荐新音乐
    getNewSong(){
        return instance.get("/personalized/newsong",{withCredentials: true,requestUrlType:"music"})
    },
    //获取歌单分类
    getPlayListType(){
        return instance.get("/playlist/catlist",{withCredentials: true,requestUrlType:"music"})
    },
    //获取歌单
    getPlayList(params){
        return instance.post("/top/playlist",params,{withCredentials: true,requestUrlType:"music"})
    },
    //获取歌单
    getSinger(params){
        return instance.post("/artist/list",params,{withCredentials: true,requestUrlType:"music"})
    },
    //获取歌单
    getAllNewSong(params){
        return instance.post("/top/song",params,{withCredentials: true,requestUrlType:"music"})
    },



    //获取验证图片
    getCodeImage () {  
        return instance.get("/interest/register/getVerifiCode",{responseType : "arraybuffer"});    
    },    
    //获取验证值
    getCodeValue(){
        return instance.get("/interest/register/imgcode");    
    },
    // 注册
    register (params) {        
        return instance.post("/interest/register/info2", params);    
    },
    // 获取文章列表
    getBlogList (params) {    
        return instance.get("/interest/public/articles",{params});  //实例化请求get使用解构赋值  
    },
    // 登录
    login (params) {  
        return post("/interest/oauth/token",params,{auth:{username: "client", password: "secret"}});    
    },
    // 获取用户信息
    getUserInfo(){
        return get("/interest/general/users/user/info"); 
    },
    //上传图片
    saveImage (params) {  
        return dataPost("/interest/picture/upload",params,{headers:{'Content-Type': 'multipart/form-data'}});    
    },
    // 登录
    createArtical (params) {  
        return dataPost("/interest/article/create",params);    
    },
    getArticalDetail(params){
        return instance.get("/interest/public/articles/"+params)
    }
}

export default article;