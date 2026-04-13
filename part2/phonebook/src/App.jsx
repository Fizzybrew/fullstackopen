import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import ModalWindow from "./components/ModalWindow";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const [modalType, setModalType] = useState(null);

  const showModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setTimeout(() => {
      setModalMessage(null);
      setModalType(null);
    }, 2000);
  };

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((err) => {
        console.log(err);
        showModal("Failed to load contact list", "error");
      });
  }, []);

  const addPersons = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(() => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === existingPerson.id
                  ? { ...person, number: newNumber }
                  : person,
              ),
            );
            setNewName("");
            setNewNumber("");
            showModal(`Contact ${newName} successfully updated!`, "success");
          })
          .catch((error) => {
            console.error("Error updating:", error);
            showModal(`Failed to update ${newName}`, "error");
          });
      }
      return;
    }

    if (newName === "" || newNumber === "") {
      alert(newName === "" ? "Enter name..." : "Phone number cannot be empty");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((response) => {
        setPersons((prevPersons) => [...prevPersons, response.data]);
        setNewName("");
        setNewNumber("");
        showModal(`Contact ${newName} successfully added!`, "success");
      })
      .catch((error) => {
        console.error("Error creating:", error);
        showModal("Failed to add person", "error");
      });
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id),
          );
          showModal(`Contact ${name} successfully deleted!`, "success");
        })
        .catch((error) => {
          console.error("Error deleting:", error);
          showModal(`Failed to delete ${name}`, "error");
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {modalMessage && <ModalWindow message={modalMessage} type={modalType} />}
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPersons={addPersons}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        onDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
