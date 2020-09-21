/**
 * article模块接口列表
 */
import {get,post} from '@/utils/request'; // 导入http中创建的axios实例
import nomalAxios from '@/utils/nomalRequest'; 
const article = {     
    getCodeImage () {        
        return nomalAxios.get("/interest/register/getVerifiCode",{responseType : "arraybuffer"});    
    },    

    getCodeValue(){
        return nomalAxios.get("/interest/register/imgcode");    
    },

    register (params) {        
        return nomalAxios.post("/interest/register/info2", params);    
    },

    login (params) {  
        return post("/interest/oauth/token",params,{auth:{username: "client", password: "secret"}});    
    },

    getUserInfo(){
        return get("/interest/general/users/user/info"); 
    }

    // post提交    
    // login (params) {        
    //     return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));    
    // }
    // 其他接口…………
}

export default article;