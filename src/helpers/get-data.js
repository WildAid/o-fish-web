import SearchService from "./../services/search.service";

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
      return "red";
    case "yellow":
      return "yellow";
    case "green":
      return "green";
    case "amber":
      return "#FFBF00";
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
