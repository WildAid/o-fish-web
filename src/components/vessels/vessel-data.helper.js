import moment from "moment";

export default class VesselDataHelper {

  constructor(permitNumber, boardings){
      this.permitNumber = permitNumber;
      this.boardings = boardings;
  }

  getVessel() {
    return [];
  }

  getPhotos() {
    return [];
  }

  getNotes() {
    return [];
  }

  getBoardings() {
    return this.boardings.forEach((boarding) => {
      return {
        date: boarding.date,
        time: boarding.date,
        agency: boarding.agency.name,
        violations: boarding.inspection.summary.violations.length,
        citaions: boarding.inspection.summary.violations.length,
        warnings: boarding.inspection.summary.violations.length,
        risk: boarding.inspection.summary.safetyLevel.level
      }
    });
  }

  getNationalities() {
    return [];
  }

  getViolations() {
    return [];
  }

  getCrew() {
    return [];
  }

  getDeliveries() {
    return [];
  }
}
