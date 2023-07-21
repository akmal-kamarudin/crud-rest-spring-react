import { useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactList = () => {
  const {
    contacts,
    retrieveContacts,
    searchTerm,
    searchResults,
    searchHandler,
  } = useContactsCrud();

  useEffect(() => {
    retrieveContacts();
  }, [retrieveContacts]);

  const renderContactList = (
    searchTerm.length < 1 ? contacts : searchResults
  ).map((contact) => {
    return <ContactCard contact={contact} key={contact.id}></ContactCard>;
  });

  const getSearchTerm = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className="main">
      <h2 id="title-container">
        Contact List
        <Link to="/add">
          <button className="ui button blue right floated">Add Contact</button>
        </Link>
      </h2>
      <div id="search-container" className="ui search">
        <div className="ui icon input">
          <input
            id="search-bar"
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={searchTerm}
            onChange={(e) => getSearchTerm(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No contacts are available"}
      </div>
    </div>
  );
};

export default ContactList;
