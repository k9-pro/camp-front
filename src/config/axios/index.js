import Axios from 'axios';


if(process.env.NODE_ENV == 'development') {
    var axios = Axios.create()
} else {
    var axios = Axios.create({
        baseURL: process.env.VUE_APP_HOSTNAME,
        // timeout: 10000,
    });
}


axios.interceptors.request.use(config => {
    console.log(config)
    if(localStorage.getItem('login') && config.url !== 'http://api.openweathermap.org/data/2.5/onecall') {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
    }
    return config;
});


export { axios };
