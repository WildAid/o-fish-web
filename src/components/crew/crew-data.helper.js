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
    let name;
    this.boardings.forEach((boarding) => {
      if (boarding.crew && boarding.crew.length) {
        for (let crew of boarding.crew) {
          if (crew.license === license) {
            name = crew.name;
          }
        }
      }
    });
    return name;
  }

  getBoardings() {
    return this.boardings.map((boarding) => {
      const violations = boarding.inspection.summary.violations
        ? boarding.inspection.summary.violations
        : [];
      return {
        id: boarding._id,
        date: boarding.date,
        time: boarding.date,
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
        const { violations } = boarding.inspection.summary;
        violations.map((violation) => {
          collection.push({
            boardingId: boarding._id,
            risk: boarding.inspection.summary.safetyLevel.level,
            vessel:
              boarding.vessel && boarding.vessel.name
                ? boarding.vessel.name
                : boarding.vessel,
            violation: violation.offence ? violation.offence.explanation : "",
            issuedBy: violation.crewMember.name,
            license: violation.crewMember.license,
            result: violation.disposition,
            boardingDate: moment(boarding.date).format("MM/DD/yyyy"),
          });
          return "";
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
            !!crewMember.attachments &&
            !!crewMember.attachments.photoIDs.length
          ) {
            crewMember.attachments.photoIDs.map((photo) => {
              photos.push({ url: photo, date: boarding.date });
              return "";
            });
            return "";
          }
        });
      }
      return "";
    });
    return photos;
  }

  getNotes(crewLicense) {
    let notes = [];
    this.boardings.map((boarding) => {
      if (boarding.crew && boarding.crew.length) {
        boarding.crew.forEach((crewMember) => {
          if (
            crewLicense === crewMember.license &&
            !!crewMember.attachments &&
            !!crewMember.attachments.notes.length
          ) {
            crewMember.attachments.notes.map((note) => {
              notes.push({ note: note, date: boarding.date });
              return "";
            });
            return "";
          }
        });
      }
      return "";
    });
    return notes;
  }
}
