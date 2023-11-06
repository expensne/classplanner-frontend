import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'table',
            component: () => import('@/pages/TablePage.vue')
        },

        {
            path: '/students',
            name: 'students',
            component: () => import('@/pages/MainStudentsPage.vue'),
            children: [
                {
                    path: '',
                    name: 'students-list',
                    component: () => import('@/pages/students/StudentsPage.vue')
                },
                {
                    path: ':id',
                    name: 'students-edit',
                    component: () => import('@/pages/students/StudentPage.vue')
                },
                {
                    path: 'add',
                    name: 'students-add',
                    component: () => import('@/pages/students/StudentPage.vue')
                }
            ]
        },

        {
            path: '/exams',
            name: 'exams',
            component: () => import('@/pages/MainExamsPage.vue'),
            children: [
                {
                    path: '',
                    name: 'exams-list',
                    component: () => import('@/pages/exams/ExamsPage.vue')
                },
                {
                    path: ':id',
                    name: 'exams-edit',
                    component: () => import('@/pages/exams/ExamPage.vue')
                },
                {
                    path: 'add',
                    name: 'exams-add',
                    component: () => import('@/pages/exams/ExamPage.vue')
                }
            ]
        }
    ]
})

export default router
