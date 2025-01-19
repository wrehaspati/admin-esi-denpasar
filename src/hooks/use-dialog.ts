import { useContext } from 'react';
import { DialogContext } from '../context/DialogContext';

export const useDialog = <T,>() => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context as typeof context & { dialogs: Record<string, { currentItem: T | null }> };
}
