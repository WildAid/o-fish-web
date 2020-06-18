import React, { memo } from "react";

import "./search-results-for.css";

const SearchResultsFor = ({ query, total }) => (
  <div className="flex-column margin-top margin-bottom search-results-for">
    {query && (<div className="results-for">Search Results for "{query}"</div>)}
    <div className="records-found">{total} Records Found</div>
  </div>
);

export default memo(SearchResultsFor);
