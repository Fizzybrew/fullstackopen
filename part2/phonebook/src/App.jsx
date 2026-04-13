import { useState, useEffect } from "react";
import ModalWindow from "./components/ModalWindow";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
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
            personService.getAll();
            setNewName("");
            setNewNumber("");
            setIsModalOpen(true);
            setTimeout(() => {
              setIsModalOpen(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error updating:", error);
            alert("Failed to update");
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
        // Правильное добавление нового контакта
        setPersons((prevPersons) => [...prevPersons, response.data]);
        setNewName("");
        setNewNumber("");
        setIsModalOpen(true);
            setTimeout(() => {
              setIsModalOpen(false);
            }, 3000);
      })
      .catch((error) => {
        console.error("Error creating:", error);
        alert("Failed to add person");
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
        })
        .catch((error) => {
          console.error("Error deleting:", error);
          alert("Failed to delete person");
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {isModalOpen && <ModalWindow />}
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
