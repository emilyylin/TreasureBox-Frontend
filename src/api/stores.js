import { writable } from "svelte/store";

export const userEmail = writable("");
export const userToken = writable("");
export const token = writable(localStorage.getItem('token'));

