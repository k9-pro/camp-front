import axios from 'axios';

//공지 게시판
export const getNotice = async ({ params }) => axios.get('/board/notice/', {params})
export const getNoticeDetail = async (data) => axios.get('/board/notice/'+data+'/')
export const store = async ({data}) => axios.post('/board/notice/',{site:data.site,user:data.user,title:data.title,content:data.content});
export const update = async ({data}) => axios.put('/board/notice/'+data.id+'/',{title:data.title,content:data.content});
export const destory = async ({data}) => axios.delete('/board/notice/'+data+'/');


//공지 조회기록

export const hit_store = async ({data}) => axios.post('/board/notice-hit/',{notice:data.id});
