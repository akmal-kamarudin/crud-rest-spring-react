import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import ContactDelete from "./components/ContactDelete";
import EditContact from "./components/EditContact";
import { ContacstCrudContextProvider } from "./context/ContactsCrudContext";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="ui container">
          <ContacstCrudContextProvider>
            <Routes>
              <Route path="/" exact element={<ContactList />} />
              <Route path="/add" element={<AddContact />} />
              <Route path="/edit/:id" element={<EditContact />} />
              <Route path="/contact/:id" element={<ContactDetail />} />
              <Route path="/delete/:id" element={<ContactDelete />} />
            </Routes>
          </ContacstCrudContextProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
