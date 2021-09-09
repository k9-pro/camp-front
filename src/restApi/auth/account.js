import { axios } from '@/config/axios';



axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'



// export const getUser = async () => axios.get('/accounts/user/')
// export const login = async ({data}) => axios.post('/accounts/login/',{email:data.email,password:data.password});
// export const logout = async ({refresh}) => axios.post('/accounts/logout/',{refresh});

export const setAccount = async ({data}) => axios.post('/accounts/',
    {
            username:data.username,
            email:data.email,
            password1:data.password1,
            password2:data.password2
    })

