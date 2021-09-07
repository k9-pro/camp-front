import axios from "axios";

export const getRegion = async () => axios.get('/camp/location/').then(response => {
    return response.data
});
