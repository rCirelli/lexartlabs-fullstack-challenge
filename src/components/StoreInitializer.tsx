'use client';
import { useRef } from 'react';
import { State, useStore } from '@/store';

export default function StoreInitializer({ source, category, query }: Partial<State>) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ source, category, query });
    initialized.current = true;
  }
  return null;
}
