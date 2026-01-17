import { atom } from "jotai";

export const searchQueryAtom = atom<string>("");

export const searchDisabledAtom = atom<boolean>(false);
