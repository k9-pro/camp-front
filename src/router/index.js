import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index.js"

Vue.use(VueRouter)

const rejectAuth = (to, from, next) => {
    if(store.state.auth.isLogin === true) {
        alert('이미 로그인 되었습니다.');
        next(from.fullPath)
    } else {
        next()
    }
}

const onlyAuth = (to, from, next) => {
    if(store.state.auth.isLogin === false) {
        alert('로그인이 필요한 서비스 입니다.');
        next('/auth/login')
    } else {
        next()
    }
}



const routes = [
    {
        path: '/',
        component: () => import(
            '@/views/Index'
        ),
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: () => import(
                    '@/views/layout/content/Dashboard'
                )
            },
            {
                path: '/region',
                redirect: '/',
            },
            {
                path: '/region/:id',
                name: 'Region',
                component: () => import(
                    '@/views/layout/content/Region'
                ),
            },
            {
                path: '/camp/:id',
                name: 'CampDetail',
                component: () => import(
                    '@/views/layout/content/camp/CampDetail'
                ),
            },
            {
                path: '/camp/:id/post-write',
                name: 'PostWrite',
                beforeEnter: onlyAuth,
                component: () => import(
                    '@/views/layout/content/board/post/Write'
                ),
            },
            {
                path: '/camp/:id/post-view/:post',
                name: 'PostView',
                component: () => import(
                    '@/views/layout/content/board/post/View'
                    ),
            },
            {
                path: '/camp/:id/free-write',
                name: 'FreeWrite',
                beforeEnter: onlyAuth,
                component: () => import(
                    '@/views/layout/content/board/free/Write'
                ),
            },
            {
                path: '/camp/:id/free-view/:free',
                name: 'FreeView',
                component: () => import(
                    '@/views/layout/content/board/free/View'
                ),
            },
            {
                path: '/camp/:id/notice-write',
                name: 'NoticeWrite',
                beforeEnter: onlyAuth,
                component: () => import(
                    '@/views/layout/content/board/notice/Write'
                ),
            },
            {
                path: '/camp/:id/notice-view/:notice',
                name: 'NoticeView',
                component: () => import(
                    '@/views/layout/content/board/notice/View'
                    ),
            },
            {
                path: '/grid-system',
                name: 'GridSystem',
                component: () => import(
                    '@/views/layout/content/GridSystem'
                )
            },
            {
                path: '/grid-list-page',
                name: 'GridListPage',
                component: () => import(
                    '@/views/layout/content/GridListPage'
                )
            },
            {
                path: '/break-point',
                name: 'BreakPoints',
                component: () => import(
                    '@/views/layout/content/BreakPoints'
                )
            },
            {
                path: '/typography',
                name: 'Typography',
                component: () => import(
                    '@/views/layout/content/Typography'
                )
            },
        ]
    },
    {
        path: '/auth',
        redirect:'/auth/login',
        beforeEnter: rejectAuth,
        component: () => import(
            '@/views/layout/auth/Index'
        ),
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import(
                    '@/views/layout/auth/Login'
                ),
            },
            {
                path: 'join',
                name: 'Join',
                component: () => import(
                    '@/views/layout/auth/Join'
                ),
            }

        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const hook = store.dispatch('auth/getUser')

    hook.then( response => {
        next()
    })
})

export default router
