import React, { createContext, useState, ReactNode } from "react";

interface DialogContextType<T> {
  isDialogOpen: boolean;
  currentItem: T | null;
  openDialog: (item: T) => void;
  closeDialog: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DialogContext = createContext<DialogContextType<any> | undefined>(undefined);

export const DialogProvider = <T,>({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<T | null>(null);

  const openDialog = (item: T) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentItem(null);
  };

  return (
    <DialogContext.Provider value={{ isDialogOpen, currentItem, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
