import { User } from '@/types/UserType';
import React, { createContext, useState } from 'react';

interface DialogContextType {
  isDialogOpen: boolean;
  currentUser: User | null;
  openDialog: (user: User) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const openDialog = (user: User) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentUser(null);
  };

  return (
    <DialogContext.Provider value={{ isDialogOpen, currentUser, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};