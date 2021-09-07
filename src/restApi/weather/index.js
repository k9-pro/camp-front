//자유 게시판
import axios from "axios";

export const getWeather = async ({ params }) => axios.get('http://api.openweathermap.org/data/2.5/onecall', {params})

