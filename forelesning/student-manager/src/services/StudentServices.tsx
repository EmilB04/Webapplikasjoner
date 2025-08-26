import { Student } from "../models/Student";
import { Subject } from '../models/Subjects';

let students: Student[] = [];

export const addStudent = (student: Student) => {
    students.push(student);
};

export const getStudent = (id: string): Student | undefined => {
    return students.find((s) => s.id === id);
};

export const addSubject = (studentId: string, subject: Subject) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
        student.subjects.push(subject);
    }
};

export const getStudentSubjects = (studentId: string): Subject[] => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.subjects : [];
};

export const getGradeDistribution = () => {
    return students
        .flatMap((s) => s.subjects)
        .reduce<Record<string, number>>((acc, subj) => {
            acc[subj.grade as string] = (acc[subj.grade as string] || 0) + 1;
            return acc;
        }, {});
};