export function computeGrade(pointsScored, maxPoints, gradingScale) {
    if (pointsScored === undefined) {
        throw new Error("pointsScored is undefined");
    }

    if (pointsScored === null) {
        return null;
    }

    let pointsAsPercentage = (parseFloat(pointsScored) / parseFloat(maxPoints)) * 100.0;

    let gradeOrder = ["A", "B", "C", "D", "E", "F"];
    let gradeIndex = 0;
    while (pointsAsPercentage < gradingScale[gradeOrder[gradeIndex]]) {
        gradeIndex++;
    }

    gradeIndex = Math.min(gradeIndex, gradeOrder.length - 1);
    return gradeOrder[gradeIndex];
}

// --- REMOVE: TODO

/*
function validInput(score, maxScore) {
    if (score < 0 || maxScore < score) {
        return false;
    }
    return true;
}

function roundFloat(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

export function computeGrade(scoreValue, maxScore, gradingScale) {
    if (scoreValue === null || scoreValue === undefined || !validInput(scoreValue, maxScore)) {
        return undefined;
    }

    let gradingScores = gradingScale.map((percent) => {
        return maxScore * (percent / 100);
    });

    let grade = 1;
    while (scoreValue < gradingScores[grade - 1]) {
        grade++;
    }

    return grade;
}

export function computePercentage(score, maxScore) {
    if (score === null || score === undefined || !validInput(score, maxScore)) return undefined;

    return roundFloat((score / maxScore) * 100);
}

export function computeGrades(scores, maxScore, gradingScale) {
    let grades = [];
    for (const score of scores) {
        let scoreValue = score.value;

        if (score === null || score === undefined || !validInput(score, maxScore)) {
            new Error("error computing grades");
        }

        grades.push(computeGrade(scoreValue, maxScore, gradingScale));
    }

    return grades;
}

export function computeAverageGrade(grades) {
    let sum = grades.reduce((a, b) => a + b, 0);
    return roundFloat(sum / grades.length);
}
*/
