'use client';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';
import { formAtom, FormState } from '@/store';


export default function FormInitializer({ source, category, query }: FormState) {
  const initialized = useRef(false);
  const setForm = useSetAtom(formAtom);
  if (!initialized.current) {
    setForm({ source, category, query });
    initialized.current = true;
  }
  return null;
}
