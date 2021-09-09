import { axios } from '@/config/axios/index.js'

export const getSite = async ({
    region,
}) => axios.get(`/camp/`,{
    params: {
        location: region,
    }
}).then(response => {
    // console.log(response.data.results);
    return response.data
})

export const getSiteDetails = async ({
    id,
}) => axios.get(`/camp/${id}`).then(response => {
    // console.log(response.data.results);
    return response.data
})
