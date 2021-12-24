import clientAxios from "./axios";

const tokenAuth = token =>{
    if(token){
        clientAxios.defaults.headers.common['z-token'] = token;
    }else{
        delete clientAxios.defaults.headers.common['z-token'];
    }
}

export default tokenAuth;
