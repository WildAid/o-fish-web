import moment from "moment";

export default class VesselDataHelper {
  constructor(permitNumber, boardings) {
    this.permitNumber = permitNumber;
    this.boardings = boardings;
  }

  getPermitNumbers() {
    const collection = {};
    this.boardings.forEach((boarding) => {
      if (boarding.vessel && boarding.vessel.permitNumber) {
        collection[boarding.vessel.permitNumber] = null;
      }
    });
    return Object.keys(collection);
  }

  getVesselNames() {
    const collection = {};
    this.boardings.forEach((boarding) => {
      if (boarding.vessel && boarding.vessel.name) {
        collection[boarding.vessel.name] = null;
      }
    });
    return Object.keys(collection);
  }

  getBoardings() {
    return this.boardings.map((boarding) => {
      const violations = boarding.inspection.summary.violations
        ? boarding.inspection.summary.violations
        : [];
      return {
        date: boarding.date,
        time: boarding.date,
        agency:
          boarding.agency && boarding.agency.name
            ? boarding.agency.name
            : boarding.agency,
        violations: violations.length,
        citations: violations.length,
        warnings: violations.length,
        risk: boarding.inspection.summary.safetyLevel.level,
        boardedBy:
          boarding.reportingOfficer && boarding.reportingOfficer.name
            ? boarding.reportingOfficer.name.first +
              " " +
              boarding.reportingOfficer.name.last
            : "",
      };
    });
  }

  getNationalities() {
    const collection = {};
    this.boardings.forEach((boarding) => {
      if (boarding.vessel.nationality) {
        collection[boarding.vessel.nationality] = null;
      }
    });
    return Object.keys(collection);
  }

  getHomePorts() {
    const collection = {};
    this.boardings.forEach((boarding) => {
      if (boarding.vessel.homePort) {
        collection[boarding.vessel.homePort] = null;
      }
    });
    return Object.keys(collection);
  }

  getCaptains() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (!collection.find((c) => c.license === boarding.captain.license)) {
        collection.push({
          license: boarding.captain.license,
          name: boarding.captain.name,
        });
      }
    });
    return collection;
  }

  getViolations() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (
        boarding.inspection &&
        boarding.inspection.summary &&
        boarding.inspection.summary.violations
      ) {
        const violations = boarding.inspection.summary.violations;
        violations.map((violation) => {
          return collection.push({
            violation: violation.offence ? violation.offence.explanation : "",
            issuedBy: violation.crewMember.name,
            license: violation.crewMember.license,
            result: violation.disposition,
            boardingDate: moment(boarding.date).format("MM/DD/yyyy"),
          });
        });
      }
    });
    return collection;
  }

  getCrew() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (boarding.crew && boarding.crew.length) {
        boarding.crew.forEach((crewMember) => {
          if (!collection.find((c) => c.license === crewMember.license)) {
            collection.push({
              license: crewMember.license,
              name: crewMember.name,
              photos: crewMember.attachments
                ? crewMember.attachments.photoIDs
                : [],
              notes: crewMember.attachments ? crewMember.attachments.notes : [],
            });
          }
        });
      }
    });
    return collection;
  }

  getDeliveries() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (boarding.vessel && boarding.vessel.lastDelivery) {
        collection.push({
          location: boarding.vessel.lastDelivery.location,
          business: boarding.vessel.lastDelivery.business,
          date: moment(boarding.vessel.lastDelivery.date).format("MM/DD/yyyy"),
        });
      }
    });
    return collection;
  }

  getPhotos() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (boarding.vessel.attachments && boarding.vessel.attachments.photos) {
        boarding.vessel.attachments.photos.forEach((photo) => {
          collection.push({
            photo: photo,
            date: moment(boarding.vessel.lastDelivery.date).format(
              "MM/DD/yyyy"
            ),
          });
        });
      }
    });
    return collection;
  }

  getNotes() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (boarding.vessel.attachments && boarding.vessel.attachments.notes) {
        boarding.vessel.attachments.notes.forEach((note) => {
          collection.push({
            note: note,
            date: moment(boarding.vessel.lastDelivery.date).format(
              "MM/DD/yyyy"
            ),
          });
        });
      }
    });
    return collection;
  }
}
