import React, { useState } from "react";

const SearchBar = () => {
  const [defendantSearch, setDefendantSearch] = useState("");
  return (
    <form>
      <label htmlFor="defendantSearch">Defendant Search: </label>
      <input
        name="defendantSearch"
        type="search"
        placeholder="Search Name"
        onChange={(e) => {
          setDefendantSearch(e.target.value);
        }}
      ></input>
    </form>
  );
};

export default SearchBar;
