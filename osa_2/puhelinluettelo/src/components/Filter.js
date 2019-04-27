import React from "react";

const Filter = ({ newFilter, handleFilter }) => (
  <p>
    rajaa näytettäviä<input value={newFilter} onChange={handleFilter} />
  </p>
);

export default Filter;