import { atom } from "jotai";

export interface FormState {
  source: string;
  category: string;
  query: string;
}

export const shouldFetchAtom = atom(false);

export const formAtom = atom({
  source: '',
  category: '',
  query: '',
});
