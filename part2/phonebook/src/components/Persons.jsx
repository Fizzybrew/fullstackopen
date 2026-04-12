const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person, i) => (
        <li key={i}>
          {person.name}: {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
