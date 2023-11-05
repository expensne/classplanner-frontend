import { log } from '@/services/LoggerService';

const LOG_PREFIX = 'HttpService';
const API_URL = 'https://api.cp.dev101.de/v1';


async function fetchData(path = '/', options = {}) {
    options = {
        ...options,
        credentials: 'include',
    };
    try {
        const response = await fetch(API_URL + path, options);
        // Return json if there is a body, otherwise return null
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.log('Error fetching data from server for URL: ' + path);
        console.log('Error was:', error);
    }
}

function deleteItem(path) {
    log('info',  LOG_PREFIX, 'deleteItem', path);
    
    return fetchData(path, {
        method: 'DELETE'
    });
}

function addItem(path, data) {
    log('info',  LOG_PREFIX, 'addItem', path, data);

    return fetchData(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function updateItem(path, data) {
    log('info',  LOG_PREFIX, 'updateItem', path, data);

    return fetchData(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// Students

export function getAllStudents() {
    return fetchData('/students');
}

export function getStudent(id) {
    return fetchData('/students/' + id);
}

export function deleteStudent(id) {
    return deleteItem('/students/' + id);
}

export function addStudent(firstName, lastName) {
    return addItem('/students', { firstName, lastName });
}

export function updateStudent(id, firstName, lastName) {
    return updateItem('/students/' + id, { id, firstName, lastName });
}

// Exams

export function getAllExams() {
    return fetchData('/exams');
}

export function getExam(id) {
    return fetchData('/exams/' + id);
}

export function deleteExam(id) {
    return deleteItem('/exams/' + id);
}

export function addExam(name, maxScore, gradingScale) {
    return addItem('/exams', { name, maxScore, gradingScale });
}

export function updateExam(id, name, maxScore, gradingScale) {
    return updateItem('/exams/' + id, { id, name, maxScore, gradingScale });
}

// Scores

export function addScore(examId, studentId, value) {
    return addItem('/scores', { examId, studentId, value, isPostscript: false });
}

export function updateScore(id, examId, studentId, value, isPostscript) {
    return updateItem('/scores/' + id, { id, examId, studentId, value, isPostscript });
}

export function deleteScore(id) {
    return deleteItem('/scores/' + id);
}
