import React, {createContext, ReactNode, useContext, useState} from 'react';

export type ContactType = {
  phone: string,
};

export type ContactsContextType = {
  contacts: ContactType[];
  setContacts: (contacts: ContactType[]) => void;
};

export const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const ContactsProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);

  return <ContactsContext.Provider value={{contacts, setContacts}}>
    {children}
  </ContactsContext.Provider>;
};

export const useContactsContext = (): ContactsContextType => {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
