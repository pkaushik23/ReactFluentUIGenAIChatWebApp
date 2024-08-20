import { createContext } from 'react';
import { useContext } from 'react';

import { MasterChatDataContextType } from '../models/types/chatTypes';

export const MasterChatDataContext = createContext<MasterChatDataContextType | undefined>(undefined);

//custom hook
export const useMasterChatDataContext = (): MasterChatDataContextType => {
  const context = useContext(MasterChatDataContext);
  if (context === undefined) {
    throw new Error('useMasterChatDataContext must be used within an MasterChatDataProvider');
  }
  return context;
};