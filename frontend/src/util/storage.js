export function getCookie(name){
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    let arr = document.cookie.match(reg);
    if(arr!=null){
        return (arr[2]);
    }else{
        return null;
    }
}

export function setCookie(name,value,expireTime) {
    let exDate = new Date();
    exDate.setHours(exDate.getHours()+expireTime);
    document.cookie = `${name} = ${escape(value)}${(expireTime==null?'':';expires='+ exDate.toGMTString())}`;
}

export function delCookie(name){
    let exp = new Date();
    exp.setTime(exp.getTime()-1);
    let val = getCookie(name);
    if(val!=null){
        document.cookie = name + "=" + val + ";expires=" + exp.toGMTString();
    }
}