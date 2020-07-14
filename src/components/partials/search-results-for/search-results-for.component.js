import React, { memo } from "react";
import { withTranslation } from "react-i18next";

import "./search-results-for.css";

const SearchResultsFor = ({ query, total, t }) => (
  <div className="flex-column margin-top margin-bottom search-results-for">
    {query && (
      <div className="results-for">
        {t("SEARCH.SEE_ALL_RESULTS", { searchQuery: query })}
      </div>
    )}

    <div className="records-found">{`${total} ${t(
      "BOARDING_PAGE.RECORDS_FOUND"
    )}`}</div>
  </div>
);

export default withTranslation("translation")(memo(SearchResultsFor));
