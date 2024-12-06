import { createContext } from 'react';
import { useContext } from 'react';

import { MasterChatDataContextType } from '../models/types/chatTypes';

//Creating the context
export const MasterChatDataContext = createContext<MasterChatDataContextType | undefined>(undefined);

//custom hook to consume the context
export const useMasterChatDataContext = (): MasterChatDataContextType => {
  const context = useContext(MasterChatDataContext);
  if (context === undefined) {
    throw new Error('useMasterChatDataContext must be used within an MasterChatDataProvider');
  }
  return context;
};