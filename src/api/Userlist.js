import  axios from "axios"

axios.defaults.baseURL = 'http://localhost:3000/api/v1'; 

// 配置axios拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //处理一下token,读取本地存储的mytoken
    let token = sessionStorage.getItem("mytoken")
    if (token) {
        config.headers["Authorization"] = token
    }
    console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//验证登录
export const isLogin = (params) => {
    return axios.post("/users/login", params).then((res) => res.data)
}

//获取用户列表
export const getUserList = (params) => {
    return axios.get(`/users?page=${params.page}&size=${params.size}`).then(res => res.data)
}
// 获取搜索列表
export const   getSearchList = (params)=>{
    return axios.get(`/users/search?page=${params.page}&size=${params.size}&keywords=${params.keywords}`).then(res => res.data)
}
// 增加用户列表
export const addUserList = (params)=>{
    return axios.post(`/users/register`,params)
}
