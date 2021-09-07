//자유 게시판
import axios from "axios";

export const getPost = async ({ params }) => axios.get('/board/post/', {params})
export const getPostDetail = async (data) => axios.get('/board/post/'+data+'/')
export const store = async ({data}) => axios.post('/board/post/',{site:data.site,user:data.user,title:data.title,content:data.content,photo:data.photo})
export const update = async ({data}) => axios.put('/board/post/'+data.id+'/',{title:data.title,content:data.content,photo:data.photo})
export const destory = async ({data}) => axios.delete('/board/post/'+data+'/')


//후기 게시판 댓글
export const getPostComment = async ({ params }) => axios.get('/board/postcomment/', {params})
export const setPostComment = async ({ data }) => axios.post('/board/postcomment/', {post:data.post,user:data.user,content:data.content})
export const destoryPostComment = async ({data}) => axios.delete('/board/postcomment/'+data+'/')


//후기 게시판 답변
export const setPostReply = async ({ data }) => axios.post('/board/postreply/', {post_comment:data.post_comment,user:data.user,content:data.content})
export const destoryPostReply = async ({data}) => axios.delete('/board/postreply/'+data+'/')



//후기 게시판 조회기록
export const hit_store = async ({data}) => axios.post('/board/post-hit/',{post:data.id})


//후기 게시판 추천
export const good_store = async ({data}) => axios.post('/board/post-good/',{post:data.id,user:data.user})
export const good_delete = async ({data}) => axios.delete('/board/post-good/'+data.id+'/')

// 베스트 후기
export const getBestPost = async () => axios.get('/board/bestpost/')
