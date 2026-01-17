import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tagsAvailableAtom = atom<string[]>([]);

export const preferenceTagsAtom = atomWithStorage<string[]>("preferenceTagsAtom", []);
