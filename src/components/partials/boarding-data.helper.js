import moment from "moment";

export default class BoardingDataHelper {
  constructor(boardings) {
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

  getCaptainName(item) {
    let captainName;
    this.boardings.forEach((boarding) => {
      if (boarding.captain.license === item || boarding.captain.name === item) {
        captainName = boarding.captain.name;
      }
    });
    return captainName;
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
            ? `${boarding.reportingOfficer.name.first} ${boarding.reportingOfficer.name.last}`
            : "",
      };
    });
  }

  getViolations(crewLicense) {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (
        boarding.inspection &&
        boarding.inspection.summary &&
        boarding.inspection.summary.violations
      ) {
        const { violations } = boarding.inspection.summary;
        violations.map((violation) => {
          if (crewLicense) {
            if (violation.crewMember.license !== crewLicense) return "";
          }
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
      return "";
    });
    return collection;
  }

  getVessels() {
    const crewVessels = [];

    this.boardings.forEach((boarding) => {
      if (boarding.vessel) {
        crewVessels.push({
          permitNumber: boarding.vessel.permitNumber,
          name: boarding.vessel.name,
          photos:
            boarding.vessel.attachments && boarding.vessel.attachments.photoIDs
              ? boarding.vessel.attachments.photoIDs
              : [],
          notes:
            boarding.vessel.attachments && boarding.vessel.attachments.notes
              ? boarding.vessel.attachments.notes
              : [],
        });
      }
      return "";
    });
    return crewVessels;
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
              photos.push({
                url: photo,
                date: boarding.date,
                risk: boarding.inspection.summary.safetyLevel.level,
                vessel:
                  boarding.vessel && boarding.vessel.name
                    ? boarding.vessel.name
                    : boarding.vessel,
                boardedBy:
                  boarding.reportingOfficer && boarding.reportingOfficer.name
                    ? `${boarding.reportingOfficer.name.first} ${boarding.reportingOfficer.name.last}`
                    : "",
              });
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
              notes.push({
                note: note,
                date: boarding.date,
                risk: boarding.inspection.summary.safetyLevel.level,
                vessel:
                  boarding.vessel && boarding.vessel.name
                    ? boarding.vessel.name
                    : boarding.vessel,
                boardedBy:
                  boarding.reportingOfficer && boarding.reportingOfficer.name
                    ? `${boarding.reportingOfficer.name.first} ${boarding.reportingOfficer.name.last}`
                    : "",
              });
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
