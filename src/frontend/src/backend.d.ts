import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Contact {
    id: bigint;
    name: string;
    language: Language;
    message: string;
    phone: string;
}
export enum Language {
    hindi = "hindi",
    gujarati = "gujarati",
    english = "english"
}
export interface backendInterface {
    getAllContacts(): Promise<Array<Contact>>;
    getContact(id: bigint): Promise<Contact>;
    getVisitCount(): Promise<bigint>;
    incrementVisits(): Promise<void>;
    submitContact(name: string, phone: string, message: string, language: Language): Promise<void>;
}
