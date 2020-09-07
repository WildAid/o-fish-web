import moment from "moment";

export default class BoardingDataHelper {
  constructor(boardings) {
    this.boardings = boardings;
  }
  //Both overview pages
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

  getViolations(query) {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (
        boarding.inspection &&
        boarding.inspection.summary &&
        boarding.inspection.summary.violations
      ) {
        const { violations } = boarding.inspection.summary;
        violations.map((violation) => {
          if (query && violation.crewMember.license !== query) return "";

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

  getPhotos(crewLicense) {
    let photos = [];
    this.boardings.map((boarding) => {
      if (crewLicense) {
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
      } else {
        if (boarding.vessel.attachments && boarding.vessel.attachments.photos) {
          boarding.vessel.attachments.photos.forEach((photo) => {
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
          });
        }
      }
      return "";
    });
    return photos;
  }

  getNotes(crewLicense) {
    let notes = [];
    this.boardings.map((boarding) => {
      if (crewLicense) {
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
      } else {
        if (boarding.vessel.attachments && boarding.vessel.attachments.notes) {
          boarding.vessel.attachments.notes.forEach((note) => {
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
          });
        }
      }
      return "";
    });
    return notes;
  }

  //Crew overview page
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

  //Vessel overview page
  getPermitNumbers(permitNumber) {
    const collection = {};
    this.boardings.forEach((boarding) => {
      if (boarding.vessel && boarding.vessel.permitNumber) {
        collection[boarding.vessel.permitNumber] = null;
      }
    });
    return Object.keys(collection);
  }

  getVesselNames() {
    const collection = [];
    this.boardings.forEach((boarding) => {
      if (boarding.vessel && boarding.vessel.name) {
        collection.push(boarding.vessel.name);
      }
    });
    return collection;
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
          vessel: boarding.vessel.name,
          location: boarding.vessel.lastDelivery.location,
          business: boarding.vessel.lastDelivery.business,
          date: moment(boarding.date).format("L"),
          lastDelivery: moment(boarding.vessel.lastDelivery.date).format("L"),
          risk: boarding.inspection.summary.safetyLevel.level,
        });
      }
    });
    return collection;
  }
}
