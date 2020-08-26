import StitchService from "./stitch.service";
import SearchService from "./search.service";

const stitchService = StitchService.getInstance();
const searchService = SearchService.getInstance();

export default class OverviewService {
  static serviceInstance: VesselOverviewService = null;

  static getInstance() {
    if (OverviewService.serviceInstance == null) {
      OverviewService.serviceInstance = new OverviewService();
    }
    return OverviewService.serviceInstance;
  }

  getBoardingsByPermitNumber(permitNumber) {
    const result = stitchService.database
      .collection("BoardingReports")
      .find({ "vessel.permitNumber": permitNumber })
      .toArray();
    searchService.searchResults = {
      query: permitNumber,
    };
    return result;
  }

  getBoardingsByVesselName(name) {
    const result = stitchService.database
      .collection("BoardingReports")
      .find({ "vessel.name": name })
      .toArray();
    searchService.searchResults = {
      query: name,
    };
    return result;
  }

  getBoardingsByCrewLicense(licenseNumber) {
    const result = stitchService.database
      .collection("BoardingReports")
      .find({ "crew.license": licenseNumber })
      .toArray();
    searchService.searchResults = {
      query: licenseNumber,
    };
    return result;
  }

  getBoardingsByCrewName(name) {
    const result = stitchService.database
      .collection("BoardingReports")
      .find({ "crew.name": name })
      .toArray();
    return result;
  }
}
