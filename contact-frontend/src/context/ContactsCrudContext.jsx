import { createContext, useContext, useState } from "react";
import api from "../api/contact";
import { v4 as uuid } from "uuid";

const contactsCrudContext = createContext();

// eslint-disable-next-line react/prop-types
export function ContacstCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      const jsonData = await response.data;
      if (jsonData) setContacts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addContactHandler = async (contact) => {
    try {
      const request = { uuid: uuid(), ...contact };
      const response = await api.post("/contacts", request);
      // const response = await api.post("/contacts", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   data: request,
      // });
      const jsonData = await response.data;
      // console.log(jsonData);
      setContacts([...contacts, jsonData]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateContactHandler = async (contact) => {
    try {
      const { uuid, ...body } = contact;
      const response = await api.put(`/contacts/${uuid}`, body);

      // const response = await api.put(`/contacts/${uuid}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   data: body,
      // });
      const jsonData = await response.data;
      console.log(jsonData);
      setContacts(
        contacts.map((contact) => {
          return contact.uuid === uuid ? { ...jsonData } : contact;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const removeContactHandler = async (uuid) => {
    try {
      await api.delete(`/contacts/${uuid}`);
      // const response = await api.delete(`/contacts/${uuid}`);
      // const jsonData = await response.data;
      // console.log(response);
      // console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }

    const newContactList = contacts.filter((contact) => {
      return contact.uuid !== uuid;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        // eslint-disable-next-line no-unused-vars
        const { id, ...rest } = contact;
        return Object.values(rest)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contacts,
    searchTerm,
    searchResults,
    retrieveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
    searchHandler,
  };

  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
