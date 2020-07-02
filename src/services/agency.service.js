import StitchService from "./stitch.service";

const stitchService = StitchService.getInstance();

export default class AgencyService {
  static serviceInstance: AgencyService = null;

  static getInstance() {
    if (AgencyService.serviceInstance == null) {
      AgencyService.serviceInstance = new AgencyService();
    }
    return AgencyService.serviceInstance;
  }

  getAgency(critheria) {
    return stitchService.database.collection("Agency").findOne(critheria);
  }

  getAgencies(limit, offset, searchQuery, currentFilter) {
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
}
