import moment from "moment";

export default class CrewDataHelper {
  constructor(permitNumber, boardings) {
    this.permitNumber = permitNumber;
    this.boardings = boardings;
  }

  getLicenseNumbersByCrewName(crewName) {
    const collection = {};
    this.boardings.forEach((boarding) => {
      if (boarding.crew && boarding.crew.length) {
        for (let crew of boarding.crew) {
          if (crew.name === crewName) {
            collection[crew.license] = null;
          }
        }
      }
    });
    return Object.keys(collection);
  }

  getCrewName(license) {
    this.boardings.forEach((boarding) => {
      if (boarding.crew && boarding.crew.length) {
        for (let crew of boarding.crew) {
          if (crew.license === license) {
            return crew.name;
          }
        }
      }
    });
    return null;
  }

  getBoardings() {
    return this.boardings.map((boarding) => {
      const violations = boarding.inspection.summary.violations
        ? boarding.inspection.summary.violations
        : [];
      return {
        date: moment(boarding.date).format("MM/DD/yyyy"),
        time: moment(boarding.date).format("LT"),
        vessel:
          boarding.vessel && boarding.vessel.name
            ? boarding.vessel.name
            : boarding.vessel,
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

  getViolations() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (
        boarding.inspection &&
        boarding.inspection.summary &&
        boarding.inspection.summary.violations
      ) {
        const violation = boarding.inspection.summary.violations;
        collection.push({
          violation: violation.offence ? violation.offence.explanation : "",
          vessel: boarding.vessel ? boarding.vessel.name : "",
          result: violation.disposition,
          boardingDate: moment(boarding.date).format("MM/DD/yyyy"),
        });
      }
    });
    return collection;
  }

  getVessels() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (
        boarding.vessel &&
        !collection.find((c) => c.permitNumber === boarding.vessel.permitNumber)
      ) {
        collection.push({
          permitNumber: boarding.vessel.permitNumber,
          name: boarding.vessel.name,
          photos: boarding.vessel.attachments
            ? boarding.vessel.attachments.photoIDs
            : [],
          notes: boarding.vessel.attachments
            ? boarding.vessel.attachments.notes
            : [],
        });
      }
    });
    return collection;
  }

  getPhotos(crewLicense) {
    let photos = [];
    this.boardings.map((boarding) => {
      if (boarding.crew && boarding.crew.length) {
        boarding.crew.forEach((crewMember) => {
          if (
            crewLicense === crewMember.license &&
            crewMember.attachments &&
            crewMember.attachments.photoIDs
          ) {
            crewMember.attachments.photoIDs.slice(0, 12).map((photo) => {
              photos.push({ photo });
            });
          }
        });
      }
    });
    console.log(photos);
    // return photos;
  }

  getNotes() {
    return this.boardings.map((boarding) => {
      if (boarding.crew && boarding.crew.length) {
        return boarding.crew.map((crewMember) => {
          if (crewMember.attachments && crewMember.attachments.notes) {
            return crewMember.attachments.notes.slice(0, 12).map((note) => {
              return { note };
            });
          }
        });
      }
    });
  }
}
