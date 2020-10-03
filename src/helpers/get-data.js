import { getData } from "country-list";

import SearchService from "./../services/search.service";

import history from "../root/root.history";

import { VIEW_CREW_PAGE } from "../root/root.constants.js";

//TODO Show pics in Users list
// import StitchService from "./../services/stitch.service";
// const stitchService = StitchService.getInstance();

export const getViolations = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return "No violations";

  return arr
    .map((el) => {
      return el.offence && el.offence.explanation;
    })
    .join(", ");
};

export const getCatches = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return "";

  return arr.join(", ");
};

export const getColor = (color) => {
  switch (color) {
    case "red":
      return { bg: "#f6d4d4", color: "#a24242" };
    case "green":
      return { bg: "#deefe5", color: "#0b6831" };
    case "amber":
      return { bg: "#ffecbc", color: "#725614" };
    default:
      return;
  }
};

export const getUsersList = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return "No users";

  let allUsers = [];

  arr.map((el) => {
    const dispositions = [];

    el.dispositions.map((el) => {
      return el.map((element) => {
        return dispositions.push(element);
      });
    });

    allUsers.push({
      name: `${el._id.first} ${el._id.last}`,
      agency: el.agency[0],
      boardings: el.boardings,
      citations: dispositions.filter((el) => el === "Citation").length,
      warnings: dispositions.filter((el) => el === "Warning").length,
    });
    return null;
  });

  return allUsers;
};

export const resetSearch = () => {
  SearchService.getInstance().clearSearchResults();

  return null;
};

export const getRanks = (data) => {
  let allCrew = [];

  data.map((crewMember) => {
    return crewMember.highlights.map((el) => {
      if (el.path.includes("captain")) {
        const addedCrew = allCrew.find(
          (item) => item.name === crewMember.captain.name
        );
        if (!addedCrew) {
          allCrew.push({
            name: crewMember.captain.name,
            rank: "captain",
            vessels: [crewMember.vessel.name],
            license: crewMember.captain.license,
            violations: Array.isArray(crewMember.violations)
              ? crewMember.violations.length
              : 0,
            date: crewMember.date,
            safetyLevel: crewMember.safetyLevel,
          });
          return null;
        } else {
          addedCrew.vessels.push(crewMember.vessel.name);
        }
        return null;
      } else {
        crewMember.crew.map((member) => {
          const foundCrewMember = el.texts.find((item) => {
            if (item.type === "hit") {
              return item.value;
            }
            return null;
          }).value;
          if (member.name.includes(foundCrewMember)) {
            const addedCrew = allCrew.find((item) => item.name === member.name);
            if (addedCrew) {
              addedCrew.vessels.push(crewMember.vessel.name);
            } else {
              allCrew.push({
                name: member.name,
                rank: "crew",
                vessels: [crewMember.vessel.name],

                license: member.license,
                violations: Array.isArray(crewMember.violations)
                  ? crewMember.violations.length
                  : 0,
                date: crewMember.date,
                safetyLevel: crewMember.safetyLevel,
              });
            }
          }
          return null;
        });
        return null;
      }
    });
  });

  return allCrew;
};

export const getHighlightedText = (data) => {
  const add = [];

  data.map((item) => {
    return item.highlights.map((el) => {
      return el.texts.map((elem) => {
        if (elem.type === "hit") {
          add.push(elem.value);
        }
        return null;
      });
    });
  });

  return [...new Set(add)];
};

export const checkUserRole = (user) => {
  if (user.global && user.global.admin) {
    return "global";
  } else if (user.agency.admin) {
    return "agency";
  }
  return "field";
};

export const checkUserType = (user) => {
  let userRole = "";

  if (user.global && user.global.admin) {
    userRole = "Global Admin";
  } else if (user.agency.admin) {
    userRole = "Agency Admin";
  } else {
    userRole = "Field Officer";
  }

  return userRole;
};

export const goToPage = (path, id) => {
  path = path.replace(":id", id);
  path = path.replace(":filter", "null");
  history.push(path);
};

export const pageWithFilterURL = (path, filter) => {
  return path.replace(":filter", JSON.stringify(filter));
};

export const goToPageWithFilter = (path, filter) => {
  history.push(path.replace(":filter", JSON.stringify(filter)));
};

export const goCrewViewPage = (item) => {
  const filter = {};
  if (item.isCaptain || item.rank === "captain") {
    if (item.license) {
      filter["captain.license"] = item.license;
    }
    if (item.name) {
      filter["captain.name"] = item.name;
    }
  } else {
    if (item.license) {
      filter["crew.license"] = item.license;
    }
    if (item.name) {
      filter["crew.name"] = item.name;
    }
  }
  goToPageWithFilter(VIEW_CREW_PAGE, filter);
};

export const bufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const required = (values, key) =>
  !values[key] && values[key] !== 0
    ? { [key]: "VALIDATION.REQUIRED" }
    : undefined;

export const getCountryCode = (countryName) => {
  if (!countryName) return;

  const countries = getData();
  const countryCode = countries.find((country) =>
    country.name.includes(countryName)
  );
  if (!countryCode) return "";
  return countryCode.code;
};
