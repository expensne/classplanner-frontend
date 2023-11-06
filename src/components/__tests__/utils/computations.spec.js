import { describe, it, expect } from "vitest";

import { computeGrade } from "@/utils/computation.js";

describe("computeGrade", () => {
    const gradingScale = {
        A: 90,
        B: 80,
        C: 70,
        D: 60,
        E: 40,
        F: 10
    };

    it("should return null if no points are scored", () => {
        expect(computeGrade(null, 100, gradingScale)).toBe(null);
    });

    it("should return A for points as percentage 90 and above", () => {
        expect(computeGrade(90, 100, gradingScale)).toBe("A");
        expect(computeGrade(100, 100, gradingScale)).toBe("A");
    });

    it("should return B for points as percentage 80 to 89", () => {
        expect(computeGrade(80, 100, gradingScale)).toBe("B");
        expect(computeGrade(89, 100, gradingScale)).toBe("B");
    });

    // Add more tests for other grades (C, D, E, F) here...

    it("should return F for points as percentage less than 10", () => {
        expect(computeGrade(9, 100, gradingScale)).toBe("F");
        expect(computeGrade(0, 100, gradingScale)).toBe("F");
    });
});
