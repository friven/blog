/**
 * article模块接口列表
 */
import {get,post} from '@/utils/request'; // 导入http中创建的axios实例
import nomalAxios from '@/utils/nomalRequest'; 
const article = {     
    //获取验证图片
    getCodeImage () {        
        return nomalAxios.get("/interest/register/getVerifiCode",{responseType : "arraybuffer"});    
    },    
    //获取验证值
    getCodeValue(){
        return nomalAxios.get("/interest/register/imgcode");    
    },
    // 注册
    register (params) {        
        return nomalAxios.post("/interest/register/info2", params);    
    },
    // 获取文章列表
    getBlogList (params) {        
        return nomalAxios.get("/interest/public/articles",{params});  //实例化请求get使用解构赋值  
    },
    // 登录
    login (params) {  
        return post("/interest/oauth/token",params,{auth:{username: "client", password: "secret"}});    
    },
    // 获取用户信息
    getUserInfo(){
        return get("/interest/general/users/user/info"); 
    }
}

export default article;