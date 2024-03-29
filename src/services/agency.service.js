import { BSON } from "mongodb-stitch-browser-sdk";

import StitchService from "./stitch.service";

const stitchService = StitchService.getInstance();

export default class AgencyService {
  static serviceInstance = null;

  static getInstance() {
    if (AgencyService.serviceInstance == null) {
      AgencyService.serviceInstance = new AgencyService();
    }
    return AgencyService.serviceInstance;
  }

  getAgency(id) {
    const objectId = new BSON.ObjectId(id);

    return stitchService.database
      .collection("Agency")
      .findOne({ _id: objectId });
  }

  getAgencyByName(name) {
    return stitchService.database.collection("Agency").findOne({ name });
  }

  getStats(searchQuery, currentFilter) {
    return stitchService.client.callFunction("getDashboardStats", [
      searchQuery,
      currentFilter,
    ]);
  }

  getTime(searchQuery, currentFilter) {
    return stitchService.client.callFunction("getDashboardTime", [
      searchQuery,
      currentFilter,
    ]);
  }


  getAgencies(limit, offset, searchQuery, currentFilter) {
    return stitchService.client.callFunction("getAgencies", [
      limit,
      offset,
      searchQuery,
      currentFilter,
    ]);
  }

  searchAgencies(limit, offset, searchQuery, currentFilter) {
    return stitchService.client.callFunction("searchFacetByAgency", [
      limit,
      offset,
      searchQuery,
      currentFilter,
    ]);
  }

  createAgency(data) {
    return stitchService.database.collection("Agency").insertOne(data);
  }

  updateAgency(id, data) {
    id = new BSON.ObjectId(id);
    return stitchService.database.collection("Agency").updateOne(
      {
        _id: id,
      },
      data
    );
  }
}
