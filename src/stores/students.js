import { defineStore } from "pinia";
import { fetchData, addItem, updateItem, deleteItem } from "@/services/httpService";
import { log } from "@/services/loggerService";

const LOG_PREFIX = "StudentsStore";

export const useStudentsStore = defineStore("studentsStore", {
    state: () => {
        return {
            students: []
        };
    },

    getters: {
        count(state) {
            return state.students.length;
        }
    },

    actions: {
        getStudentName(studentId) {
            const student = this.students.find((s) => s.id === studentId);
            return student ? student.firstName + " " + student.lastName : null;
        },
        async fetchStudents() {
            log("info", LOG_PREFIX, "Fetching students");

            const students = await fetchData("/students");
            if (!students) {
                throw new Error("Could not fetch students");
            }
            this.students = students;
        },

        getStudent(id) {
            log("info", LOG_PREFIX, "getStudent", id);

            return this.students.find((s) => s.id === id);
        },

        async deleteStudent(id) {
            log("info", LOG_PREFIX, "deleteStudent", id);

            const index = this.students.findIndex((s) => s.id === id);
            if (index === -1) {
                throw new Error("Student with id " + id + " not found");
            }

            // Delete on server
            await deleteItem("/students/" + id);
            // Delete locally
            this.students = this.students.filter((s) => s.id !== id);
        },

        async addStudent(firstName, lastName) {
            log("info", LOG_PREFIX, "addStudent", firstName, lastName);

            if (!firstName || !lastName) {
                throw new Error("First and last name are required");
            }

            // Add on server
            const student = await addItem("/students", {
                firstName,
                lastName,
                scores: {}
            });

            // Add locally
            this.students.push({
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                scores: {}
            });
        },

        async updateStudent(id, firstName, lastName, scores = null) {
            log("info", LOG_PREFIX, "updateStudent", id, firstName, lastName, scores);

            if (!firstName || !lastName) {
                throw new Error("First and last name are required");
            }

            const index = this.students.findIndex((s) => s.id === id);
            if (index === -1) {
                throw new Error("Student with id " + id + " not found");
            }

            // Use current scores if not provided
            if (!scores) {
                scores = this.students[index].scores;
            }

            // Update on server
            await updateItem("/students/" + id, {
                id,
                firstName,
                lastName,
                scores
            });

            // Update locally
            this.students[index].firstName = firstName;
            this.students[index].lastName = lastName;
            this.students[index].scores = scores;
        },

        async updateStudentScore(studentId, examId, pointsScored, isPostscript = false) {
            log(
                "info",
                LOG_PREFIX,
                "updateStudentScore",
                studentId,
                examId,
                pointsScored,
                isPostscript
            );

            const index = this.students.findIndex((s) => s.id === studentId);
            if (index === -1) {
                throw new Error("Student with id " + studentId + " not found");
            }

            const newScores = JSON.parse(JSON.stringify(this.students[index].scores));
            newScores[examId] = {
                pointsScored: pointsScored,
                isPostscript: isPostscript
            };

            this.updateStudent(
                studentId,
                this.students[index].firstName,
                this.students[index].lastName,
                newScores
            );
        },

        async removeStudentScore(studentId, examId) {
            log("info", LOG_PREFIX, "removeStudentScore", studentId, examId);

            const index = this.students.findIndex((s) => s.id === studentId);
            if (index === -1) {
                throw new Error("Student with id " + studentId + " not found");
            }

            const newScores = JSON.parse(JSON.stringify(this.students[index].scores));
            delete newScores[examId];

            this.updateStudent(
                studentId,
                this.students[index].firstName,
                this.students[index].lastName,
                newScores
            );
        }
    }
});
