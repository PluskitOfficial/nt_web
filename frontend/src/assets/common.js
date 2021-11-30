import Vue from "vue";

export function sizeStorage1(size) {
    return sizeStorage(size).split(' ')[0];
}

export function sizeStorage(size) {
    if (!size)
        return "";
    const num = 1024.00;
    if (size < num)
        return size + " B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + " KB";
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + " MB";
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + " GB";
    if(size < Math.pow(num, 5))
        return (size / Math.pow(num, 4)).toFixed(2) + " TB";
    return (size / Math.pow(num, 5)).toFixed(2) + " PB";
}

Vue.filter('substring10',(size)=>{
    if (!size)
        return "----";
    return size.substring(0,10)+"****"+size.substring(size.length-5,size.length);
});

Vue.filter('changeSize',(size)=>{
  return sizeStorage(size);
});
