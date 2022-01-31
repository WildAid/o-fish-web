import StitchService from "./stitch.service";
import EventEmitter from "events";

import { getRanks, getHighlightedText } from "../helpers/get-data";

const stitchService = StitchService.getInstance();

export default class SearchService extends EventEmitter {
  static serviceInstance = null;

  static getInstance() {
    if (SearchService.serviceInstance == null) {
      SearchService.serviceInstance = new SearchService();
    }
    return SearchService.serviceInstance;
  }

  constructor() {
    super();
    this.searchResults = null;
  }

  clearSearchResults() {
    return (this.searchResults = null);
  }

  search(critheria) {
    return stitchService.client
      .callFunction("search", [critheria])
      .then((data) => {
        this.searchResults = {
          query: critheria,
          highlighted: getHighlightedText(data.highlighted),
          vessels: data.vessels.length ? data.vessels : [],
          boardings: data.boardings.length ? data.boardings : [],
          crew: data.crew ? getRanks(data.crew) : [],
          vesselsAmount: data.vesselsAmount.length
            ? data.vesselsAmount[0].total
            : 0,
          boardingsAmount: data.boardingsAmount.length
            ? data.boardingsAmount[0].total
            : 0,
          crewAmount: data.crew.length || 0,
        };
        return this.searchResults;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getData(limit, offset, funcName, value) {
    return stitchService.client.callFunction(funcName, [limit, offset, value]);
  }
}
