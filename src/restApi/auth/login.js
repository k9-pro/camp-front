import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'



export const getUser = async () => axios.get('/accounts/user/')
export const login = async ({data}) => axios.post('/accounts/login/',{email:data.email,password:data.password});
export const logout = async ({refresh}) => axios.post('/accounts/logout/',{refresh});

// export const update = async ({data}) => axios.put('/board/free/'+data.id+'/',{title:data.title,content:data.content});
// export const destory = async ({data}) => axios.delete('/board/free/'+data+'/');

