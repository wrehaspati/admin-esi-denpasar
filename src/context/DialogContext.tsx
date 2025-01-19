import React, { createContext, useState, ReactNode } from "react";

interface DialogState<T> {
  isOpen: boolean;
  currentItem: T | null;
}

interface DialogContextType<T> {
  dialogs: Record<string, DialogState<T>>;
  openDialog: (key: string, item: T) => void;
  closeDialog: (key: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DialogContext = createContext<DialogContextType<any> | undefined>(undefined);

export const DialogProvider = <T,>({ children }: { children: ReactNode }) => {
  const [dialogs, setDialogs] = useState<Record<string, DialogState<T>>>({});

  const openDialog = (key: string, item: T) => {
    setDialogs((prev) => ({
      ...prev,
      [key]: { isOpen: true, currentItem: item },
    }));
  };

  const closeDialog = (key: string) => {
    setDialogs((prev) => ({
      ...prev,
      [key]: { isOpen: false, currentItem: null },
    }));
  };

  return (
    <DialogContext.Provider value={{ dialogs, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
