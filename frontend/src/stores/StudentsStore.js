import { defineStore } from 'pinia';
import {
    getAllStudents,
    deleteStudent,
    addStudent,
    updateStudent
} from '@/services/HttpService';
import { log } from '@/services/LoggerService';

const LOG_PREFIX = 'StudentsStore';

export const useStudentsStore = defineStore('studentsStore', {
    state: () => {
        return {
            students: []
        };
    },

    getters: {
        count(state) {
            return state.students.length;
        },

        nextId(state) {
            // find max id
            const maxId = state.students.reduce((max, student) => {
                return student.id > max ? student.id : max;
            }, 0);
            return maxId + 1;
        }
    },

    actions: {
        async fetchStudents() {
            log('info', LOG_PREFIX, 'Fetching students');

            const students = await getAllStudents();
            students.forEach((student) => {
                student.id = String(student.id);
            });

            this.students = students;
        },

        getStudent(id) {
            log('info', LOG_PREFIX, 'getStudent', id);

            return this.students.find((s) => s.id === id);
        },

        async deleteStudent(id) {
            log('info', LOG_PREFIX, 'deleteStudent', id);

            const index = this.students.findIndex((s) => s.id === id);

            if (index === -1) {
                throw new Error('Student with id ' + id + ' not found');
            }

            // Delete on server
            await deleteStudent(id);
            // Delete locally
            this.students = this.students.filter((s) => s.id !== id);
        },

        async addStudent(firstName, lastName) {
            log('info', LOG_PREFIX, 'addStudent', firstName, lastName);

            if (!firstName || !lastName) {
                throw new Error('First and last name are required');
            }
            // Add on server
            const student = await addStudent(firstName, lastName);
            log('info', LOG_PREFIX, 'added Student', student);
            // Add locally
            this.students.push({
                id: String(student.id),
                firstName: student.firstName,
                lastName: student.lastName
            });
        },

        async updateStudent(id, firstName, lastName) {
            log('info', LOG_PREFIX, 'updateStudent', id, firstName, lastName);
            
            if (!firstName || !lastName) {
                throw new Error('First and last name are required');
            }

            const index = this.students.findIndex((s) => s.id === id);

            if (index === -1) {
                throw new Error('Student with id ' + id + ' not found');
            }

            // Update on server
            await updateStudent(id, firstName, lastName);
            // Update locally
            this.students[index].firstName = firstName;
            this.students[index].lastName = lastName;
        }
    }
});
