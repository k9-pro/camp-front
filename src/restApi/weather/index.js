import { axios } from '@/config/axios/index.js'

export const getWeather = async ({ params }) => axios.get('http://api.openweathermap.org/data/2.5/onecall', {params})

