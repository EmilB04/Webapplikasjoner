import { Subject } from "./Subjects";

export interface Student {
    id: string;
    name: string;
    subjects: Subject[];
}
