import { defineStore } from 'pinia';
import {
    getAllExams,
    deleteExam,
    addExam,
    updateExam,
    addScore,
    updateScore,
    deleteScore
} from '@/services/HttpService';
import { log } from '@/services/LoggerService';

const LOG_PREFIX = 'ExamsStore';

export const useExamsStore = defineStore('examsStore', {
    state: () => {
        return {
            exams: []
        };
    },

    getters: {
        count(state) {
            return state.exams.length;
        },

        nextId(state) {
            // find max id
            const maxId = state.exams.reduce((max, exam) => {
                return exam.id > max ? exam.id : max;
            }, 0);
            return maxId + 1;
        }
    },

    actions: {
        parseGradingScaleFromObject(gradingScaleObject) {
            return [
                gradingScaleObject.aPercent,
                gradingScaleObject.bPercent,
                gradingScaleObject.cPercent,
                gradingScaleObject.dPercent,
                gradingScaleObject.ePercent,
                gradingScaleObject.fPercent
            ];
        },

        praseGradingScaleToObject(gradingScaleArray) {
            return {
                aPercent: gradingScaleArray[0],
                bPercent: gradingScaleArray[1],
                cPercent: gradingScaleArray[2],
                dPercent: gradingScaleArray[3],
                ePercent: gradingScaleArray[4],
                fPercent: gradingScaleArray[5]
            };
        },

        async fetchExams() {
            log('info', LOG_PREFIX, 'Fetching exams');

            const exams = await getAllExams();
            exams.forEach((exam) => {
                exam.id = String(exam.id);
                // Parse grading scale; TODO: update frontend to handle the new format
                exam.gradingScale = this.parseGradingScaleFromObject(exam.gradingScale);
                exam.scores.forEach((score) => {
                    score.id = String(score.id);
                    score.studentId = String(score.studentId);
                    score.examId = String(score.examId);
                });
            });

            this.exams = exams;
        },

        getExam(id) {
            log('info', LOG_PREFIX, 'getExam', id);

            return this.exams.find((e) => e.id === id);
        },

        async deleteExam(id) {
            log('info', LOG_PREFIX, 'deleteExam', id);

            const index = this.exams.findIndex((e) => e.id === id);

            if (index === -1) {
                throw new Error('Exam with ID ' + id + ' not found');
            }

            // Delete on server
            await deleteExam(id);
            // Delete locally
            this.exams = this.exams.filter((e) => e.id !== id);
        },

        async addExam(name, maxScore, gradingScale) {
            log('info', LOG_PREFIX, 'addExam', name, maxScore, gradingScale);

            if (!name || !maxScore) {
                throw new Error('Name and max score are required');
            }

            // Parse grading scale; TODO: update frontend to handle the new format
            const newGradingScaleFormat = this.praseGradingScaleToObject(gradingScale);

            // Add on server
            const exam = await addExam(name, maxScore, newGradingScaleFormat);
            log('info', LOG_PREFIX, 'added Exam', exam);
            // Add locally
            this.exams.push({
                id: String(exam.id),
                name: exam.name,
                maxScore: exam.maxScore,
                gradingScale: this.parseGradingScaleFromObject(exam.gradingScale),
                scores: exam.scores,
                postscripts: exam.postscripts
            });
        },

        async updateExam(id, name, maxScore, gradingScale) {
            log('info', LOG_PREFIX, 'updateExam', id, name, maxScore, gradingScale);

            if (!name || !maxScore) {
                throw new Error('Name and max score are required');
            }

            const index = this.exams.findIndex((e) => e.id === id);

            if (index === -1) {
                throw new Error('Exam with ID ' + id + ' not found');
            }

            // Parse grading scale; TODO: update frontend to handle the new format
            const newGradingScaleFormat = this.praseGradingScaleToObject(gradingScale);

            // Update on server
            await updateExam(id, name, maxScore, newGradingScaleFormat);
            // Update locally
            this.exams[index].name = name;
            this.exams[index].maxScore = maxScore;
            this.exams[index].gradingScale = gradingScale;
        },

        async addScore(examId, studentId, value) {
            log('info', LOG_PREFIX, 'addScore', examId, studentId, value);

            const index = this.exams.findIndex((e) => e.id === examId);

            if (index === -1) {
                throw new Error('Exam with ID ' + examId + ' not found');
            }

            // Add on server
            const score = await addScore(examId, studentId, value);
            // Add locally
            this.exams[index].scores.push({
                id: String(score.id),
                examId: String(score.examId),
                studentId: String(score.studentId),
                value: score.value,
                isPostscript: score.isPostscript
            });
        },

        async updateScore(id, examId, studentId, value, isPostscript) {
            log('info', LOG_PREFIX, 'updateScore', id, examId, studentId, value);

            const examIndex = this.exams.findIndex((e) => e.id === examId);

            if (examIndex === -1) {
                throw new Error('Exam with ID ' + examId + ' not found');
            }

            const scoreIndex = this.exams[examIndex].scores.findIndex((s) => s.id === id);

            if (scoreIndex === -1) {
                throw new Error('Score with ID ' + id + ' not found');
            }

            // Sanitiy check
            if (this.exams[examIndex].scores[scoreIndex].studentId !== studentId) {
                throw new Error('Student ID mismatch');
            }

            // Update on server
            await updateScore(id, examId, studentId, value, isPostscript);
            // Update locally
            this.exams[examIndex].scores[scoreIndex].value = value;
            this.exams[examIndex].scores[scoreIndex].isPostscript = isPostscript;
        },

        async deleteScore(id, examId, studentId) {
            log('info', LOG_PREFIX, 'deleteScore', id, examId, studentId);

            const examIndex = this.exams.findIndex((e) => e.id === examId);

            if (examIndex === -1) {
                throw new Error('Exam with ID ' + examId + ' not found');
            }

            const scoreIndex = this.exams[examIndex].scores.findIndex((s) => s.id === id);

            if (scoreIndex === -1) {
                throw new Error('Score with ID ' + id + ' not found');
            }

            // Sanitiy check
            if (this.exams[examIndex].scores[scoreIndex].studentId !== studentId) {
                throw new Error('Student ID mismatch');
            }

            // Delete on server
            await deleteScore(id);
            // Delete locally
            this.exams[examIndex].scores = this.exams[examIndex].scores.filter(
                (s) => s.id !== id
            );
        }
    }
});
