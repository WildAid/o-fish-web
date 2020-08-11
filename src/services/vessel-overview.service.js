import StitchService from "./stitch.service";

const stitchService = StitchService.getInstance();

export default class VesselOverviewService {
  static serviceInstance: VesselOverviewService = null;

  static getInstance() {
    if (VesselOverviewService.serviceInstance == null) {
      VesselOverviewService.serviceInstance = new VesselOverviewService();
    }
    return VesselOverviewService.serviceInstance;
  }

  getBoardingsByPermitNumber(permitNumber) {
    const result = stitchService.database.collection("BoardingReports").find({"vessel.permitNumber": permitNumber}).toArray();
    return result;
  }


  getBoardingsByVesselName(name) {
    const result = stitchService.database.collection("BoardingReports").find({"vessel.name": name}).toArray();
    return result;
  }
}
