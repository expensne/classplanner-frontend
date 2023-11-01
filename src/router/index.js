import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },

        {
            path: '/students',
            name: 'students',
            component: () => import('@/views/MainStudentsView.vue'),
            children: [
                {
                    path: '',
                    name: 'students-list',
                    component: () => import('@/views/StudentsListView.vue')
                },
                {
                    path: ':id',
                    name: 'students-edit',
                    component: () => import('@/views/StudentView.vue')
                },
                {
                    path: 'add',
                    name: 'students-add',
                    component: () => import('@/views/StudentView.vue')
                }
            ]
        },

        {
            path: '/exams',
            name: 'exams',
            component: () => import('@/views/MainExamsView.vue'),
            children: [
                {
                    path: '',
                    name: 'exams-list',
                    component: () => import('@/views/ExamsListView.vue')
                },
                {
                    path: ':id',
                    name: 'exams-edit',
                    component: () => import('@/views/ExamView.vue')
                },
                {
                    path: 'add',
                    name: 'exams-add',
                    component: () => import('@/views/ExamView.vue')
                }
            ]
        }
    ]
})

export default router
