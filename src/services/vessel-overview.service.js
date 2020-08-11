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

  getBoardings(permitNumber) {
    return stitchService.client.callFunction("getVesselBoardings", [permitNumber]);
  }
}
