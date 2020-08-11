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

  getVessel(permitNumber) {
    return stitchService.client.callFunction("getVessel", [permitNumber]);
  }

  getPhotos(permitNumber) {
    return stitchService.client.callFunction("getVesselPhotos", [permitNumber]);
  }

  getNotes(permitNumber) {
    return stitchService.client.callFunction("getVesselNotes", [permitNumber]);
  }

  getBoardings(permitNumber) {
    return stitchService.client.callFunction("getVesselBoardings", [permitNumber]);
  }

  getViolations(permitNumber) {
    return stitchService.client.callFunction("getVesselViolations", [permitNumber]);
  }

  getCrew(permitNumber) {
    return stitchService.client.callFunction("getVesselCrew", [permitNumber]);
  }

  getDeliveries(permitNumber) {
    return stitchService.client.callFunction("getVesselDeliveries", [permitNumber]);
  }
}
