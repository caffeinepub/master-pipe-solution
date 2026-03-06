import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Assignment {
    id: bigint;
    customerName: string;
    status: string;
    workerId: bigint;
    customerPhone: string;
    jobDescription: string;
    customerZip: string;
    customerAddress: string;
    workerZip: string;
    timestamp: bigint;
}
export interface Worker {
    id: bigint;
    age: bigint;
    workVolume: bigint;
    name: string;
    isAvailable: boolean;
    mobileNumber: string;
    emergencyNumber: string;
    zipCode: string;
    bloodGroup: string;
    rating: number;
}
export interface Contact {
    id: bigint;
    status: string;
    name: string;
    language: Language;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum Language {
    hindi = "hindi",
    gujarati = "gujarati",
    english = "english"
}
export interface backendInterface {
    addWorker(name: string, age: bigint, bloodGroup: string, emergencyNumber: string, mobileNumber: string, zipCode: string): Promise<bigint>;
    assignWork(workerId: bigint, customerName: string, customerPhone: string, customerAddress: string, customerZip: string, jobDescription: string): Promise<bigint>;
    deleteWorker(id: bigint): Promise<void>;
    getAllAssignments(): Promise<Array<Assignment>>;
    getAllContacts(): Promise<Array<Contact>>;
    getAllWorkers(): Promise<Array<Worker>>;
    getContact(id: bigint): Promise<Contact>;
    getDefaultReply(): Promise<string>;
    getVisitCount(): Promise<bigint>;
    getWorker(id: bigint): Promise<Worker>;
    getWorkerAssignments(workerId: bigint): Promise<Array<Assignment>>;
    incrementVisits(): Promise<void>;
    setDefaultReply(text: string): Promise<void>;
    setWorkerAvailability(id: bigint, isAvailable: boolean): Promise<void>;
    submitContact(name: string, phone: string, message: string, language: Language): Promise<void>;
    updateAssignmentStatus(id: bigint, status: string): Promise<void>;
    updateContactStatus(id: bigint, status: string): Promise<void>;
    updateWorker(id: bigint, name: string, age: bigint, bloodGroup: string, emergencyNumber: string, mobileNumber: string, zipCode: string): Promise<void>;
    updateWorkerRating(id: bigint, rating: number): Promise<void>;
}
