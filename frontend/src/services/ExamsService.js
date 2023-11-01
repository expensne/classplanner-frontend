function validInput(score, maxScore) {
    if (score < 0 || maxScore < score) {
        return false
    }
    return true
}

function roundFloat(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100
}

export function computeGrade(score, maxScore, gradingScale) {
    if (score === null || score === undefined || !validInput(score, maxScore)) {
        return undefined
    }

    let gradingScores = gradingScale.map((percent) => {
        return maxScore * (percent / 100)
    })

    let grade = 1
    while (score < gradingScores[grade - 1]) {
        grade++;
    }

    return grade;
}

export function computePercentage(score, maxScore) {
    if (score === null || score === undefined || !validInput(score, maxScore)) return undefined

    return roundFloat((score / maxScore) * 100);
}

export function computeAverageGrade(scores, maxScore, gradingScale) {
    let grades = [];
    for (const score of scores) {
        if (score === null || score === undefined || !validInput(score, maxScore)) {
            new Error('error computing average grade');
        }
        grades.push(computeGrade(score, maxScore, gradingScale));
    }

    let sum = grades.reduce((a, b) => a + b, 0);
    return roundFloat(sum / grades.length)
}
