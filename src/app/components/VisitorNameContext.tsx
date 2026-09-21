"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "baodao-visitor-name";
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return null;
}

type VisitorNameContextValue = {
  name: string | null;
  setName: (name: string) => void;
  clearName: () => void;
};

const VisitorNameContext = createContext<VisitorNameContextValue | null>(null);

export function VisitorNameProvider({ children }: { children: ReactNode }) {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setName = useCallback((next: string) => {
    const trimmed = next.trim();
    if (!trimmed) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // localStorage unavailable (e.g. private browsing) — name won't persist
    }
    emitChange();
  }, []);

  const clearName = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (e.g. private browsing)
    }
    emitChange();
  }, []);

  return (
    <VisitorNameContext.Provider value={{ name, setName, clearName }}>
      {children}
    </VisitorNameContext.Provider>
  );
}

export function useVisitorName() {
  const ctx = useContext(VisitorNameContext);
  if (!ctx) {
    throw new Error("useVisitorName must be used within VisitorNameProvider");
  }
  return ctx;
}
