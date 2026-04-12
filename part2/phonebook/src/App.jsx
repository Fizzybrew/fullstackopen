import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "34-345-345-33" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addPersons = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`);
      return;
    }
    if (newName === "" || newNumber === "") {
      alert(newName === "" ? "Enter name..." : "Phone number cannot be empty");
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1>Phonebook</h1>
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
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
