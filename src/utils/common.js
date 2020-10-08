/**
 * 节流函数让函数在一定时间内只触发一次,周期性执行回调，减少一些过快调用，适用场景：scroll事件，屏幕resize事件，mousemove事件等需要在用户操作时频繁触发,流畅性要求较高的
 * @param {function}  after - 回调函数 
 * @param {Number}  wait - 周期性执行回调间隔时间ms
 * @returns {function} 
*/

export const throttle = (after, wait)=>{
    var timer;
    var isScroll; //是否正在执行回调
    return function() {
        if (isScroll) return; //在回调函数未执行完以前
        isScroll = true;
        timer && clearTimeout(timer);
        timer = setTimeout(function() {
            after && after();
            isScroll = false;
            timer = null;
        }, wait);
    }
}

/**
 * 在富文本字符串中获取第一张图片的url
 * @param {String}  str - 富文本字符串
 * @returns {String} 图片路径
*/
export const getFirstImage = (str)=>{
        var url = '';
         str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/,  (match, capture)=>{
            url = capture;
         });
        return url
}

/**
 * 性能问题，窗口缩放
*/


/**
 * 时间戳转时间
 * @param {Time}  timestamp - 时间戳
 * @param {String}  type - 时间格式
 * @returns {String} 时间
*/
export const timeStampToTime = (timestamp , type = "YYYY-MM-DD hh:mm:ss")=>{
    var date = new Date(parseInt(timestamp));
    var Y = date.getFullYear()+"-";
    var M = (date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1)+"-";
    var D = (date.getDate()<10?"0"+date.getDate():date.getDate())+" ";
    var h = (date.getHours()<10?"0"+date.getHours():date.getHours())+":";
    var m = (date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+":";
    var s = (date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds());
    if(type == "YYYY-MM-DD hh:mm:ss"){
        return Y+M+D+h+m+s;
    }else if(type == "YYYY-MM-DD"){
        return Y+M+D;
    }else{
        return h+m+s;
    }
}