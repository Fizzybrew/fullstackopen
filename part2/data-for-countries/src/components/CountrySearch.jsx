const CountrySearch = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="country-input">Find countries</label>
      <input
        id="country-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter your country..."
      />
    </div>
  );
};

export default CountrySearch;
