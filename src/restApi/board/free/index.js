import axios from 'axios';

//자유 게시판
export const getFree = async ({ params }) => axios.get('/board/free/', {params})
export const getFreeDetail = async (data) => axios.get('/board/free/'+data+'/')
export const store = async ({data}) => axios.post('/board/free/',{site:data.site,user:data.user,title:data.title,content:data.content});
export const update = async ({data}) => axios.put('/board/free/'+data.id+'/',{title:data.title,content:data.content});
export const destory = async ({data}) => axios.delete('/board/free/'+data+'/');


//자유 게시판 댓글
export const getFreeComment = async ({ params }) => axios.get('/board/freecomment/', {params})
export const setFreeComment = async ({ data }) => axios.post('/board/freecomment/', {free:data.free,user:data.user,content:data.content})
export const destoryFreeComment = async ({data}) => axios.delete('/board/freecomment/'+data+'/')


//자유 게시판 답변
export const setFreeReply = async ({ data }) => axios.post('/board/freereply/', {free_comment:data.free_comment,user:data.user,content:data.content})
export const destoryFreeReply = async ({data}) => axios.delete('/board/freereply/'+data+'/')


//자유 게시판 조회기록

export const hit_store = async ({data}) => axios.post('/board/free-hit/',{free:data.id});
