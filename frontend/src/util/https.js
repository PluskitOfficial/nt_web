import axios from "axios";
import qs from 'qs';

axios.interceptors.request.use(
    config =>{
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export function post(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.post('/api/proxy' + url,qs.stringify(data)).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err);
        });
    });
}
