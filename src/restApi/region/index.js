import { axios } from '@/config/axios/index.js'

export const getRegion = async () => axios.get('/camp/location/').then(response => {
    return response.data
});
