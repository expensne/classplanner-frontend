import { defineStore } from "pinia";
import { fetchData, addItem, updateItem, deleteItem } from "@/services/httpService";
import { log } from "@/services/loggerService";

const LOG_PREFIX = "ExamsStore";

export const useExamsStore = defineStore("examsStore", {
    state: () => {
        return {
            exams: []
        };
    },

    getters: {
        count(state) {
            return state.exams.length;
        }
    },

    actions: {
        getExamName(examId) {
            const exam = this.exams.find((e) => e.id === examId);
            return exam ? exam.name : null;
        },
        async fetchExams() {
            log("info", LOG_PREFIX, "Fetching exams");

            const exams = await fetchData("/exams");
            if (!exams) {
                throw new Error("Could not fetch exams");
            }

            this.exams = exams;
        },

        getExam(id) {
            log("info", LOG_PREFIX, "getExam", id);

            return this.exams.find((e) => e.id === id);
        },

        async deleteExam(id) {
            log("info", LOG_PREFIX, "deleteExam", id);

            const index = this.exams.findIndex((e) => e.id === id);
            if (index === -1) {
                throw new Error("Exam with ID " + id + " not found");
            }

            // Delete on server
            await deleteItem("/exams/" + id);
            // Delete locally
            this.exams = this.exams.filter((e) => e.id !== id);
        },

        async addExam(name, maxPoints, gradingScale) {
            log("info", LOG_PREFIX, "addExam", name, maxPoints, gradingScale);

            if (!name || !maxPoints || !gradingScale) {
                throw new Error("Name, max points and grading scale are required");
            }

            // Add on server
            const exam = await addItem("/exams/", {
                name,
                maxPoints,
                gradingScale
            });

            // Add locally
            this.exams.push({
                id: exam.id,
                name: exam.name,
                maxPoints: exam.maxPoints,
                gradingScale: exam.gradingScale
            });
        },

        async updateExam(id, name, maxPoints, gradingScale) {
            log("info", LOG_PREFIX, "updateExam", id, name, maxPoints, gradingScale);

            if (!name || !maxPoints || !gradingScale) {
                throw new Error("Name, max points and grading scale are required");
            }

            const index = this.exams.findIndex((e) => e.id === id);
            if (index === -1) {
                throw new Error("Exam with ID " + id + " not found");
            }

            // Update on server
            await updateItem("/students/" + id, {
                id,
                name,
                maxPoints,
                gradingScale
            });

            // Update locally
            this.exams[index].name = name;
            this.exams[index].maxScore = maxPoints;
            this.exams[index].gradingScale = gradingScale;
        }
    }
});
