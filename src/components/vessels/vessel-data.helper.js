import moment from "moment";

export default class VesselDataHelper {

  constructor(permitNumber, boardings){
      this.permitNumber = permitNumber;
      this.boardings = boardings;
  }


  getBoardings() {
    return this.boardings.map((boarding) => {
      const violations = boarding.inspection.summary.violations ? boarding.inspection.summary.violations: [];
      return {
        date: moment(boarding.date).format("MM/DD/yyyy"),
        time: moment(boarding.date).format("LT"),
        agency: boarding.agency && boarding.agency.name ? boarding.agency.name: boarding.agency,
        violations: violations.length,
        citaions: violations.length,
        warnings: violations.length,
        risk: boarding.inspection.summary.safetyLevel.levely,
        boardingBy: boarding.reportingOfficer && boarding.reportingOfficer.name ?  boarding.reportingOfficer.name.first + " " + boarding.reportingOfficer.name.last : ""
      }
    });
  }

  getNationalities() {
    const collection = {};
    this.boardings.forEach((boarding) => {
      if (boarding.vessel.nationality){
        collection[boarding.vessel.nationality] = null
      }
    });
    return Object.keys(collection);
  }


  getHomePorts() {
      const collection = {};
      this.boardings.forEach((boarding) => {
        if (boarding.vessel.homePort){
          collection[boarding.vessel.homePort] = null
        }
      });
      return Object.keys(collection);
  }

  getCaptains() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (!collection.find(c=> c.license == boarding.captain.license)){
        collection.push({
          license : boarding.captain.license,
          name :  boarding.captain.name
        });
      }
    });
    return collection;
  }

  getPhotos() {
    return [];
  }

  getNotes() {
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
