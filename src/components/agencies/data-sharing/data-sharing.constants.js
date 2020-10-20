export const boardingInformation = [
  {
    name: "DATA_SHARING.MANAGE_SHARED_DATA.GENERAL_BOARDING_INFORMATION",
    itemsToShare: [
      {
        itemName: "DATA_SHARING.MANAGE_SHARED_DATA.AGENCY_INFO",
        subItems: [
          { subItemName: "AGENCY_PAGE.EDIT_AGENCY.NAME", key: "agency" },
        ],
      },
      {
        itemName: "TABLE.BOARDED_BY",
        subItems: [
          {
            subItemName: "DATA_SHARING.MANAGE_SHARED_DATA.OFFICER_NAME",
            key: "reportingOfficer",
          },
        ],
      },
      {
        itemName: "FILTER.HOME_PAGE.DATE_TIME",
        subItems: [
          { subItemName: "TABLE.DATE", key: "date" },
          { subItemName: "TABLE.TIME", key: "date" },
        ],
      },
      {
        itemName: "FILTER.MAIN.BOARDING_INFO.LOCATION",
        subItems: [
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.LONGTITUDE",
            key: "longtitude",
          },
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.LATITUDE",
            key: "latitude",
          },
        ],
      },
    ],
  },
  {
    name: "TABLE.VESSEL",
    itemsToShare: [
      {
        itemName: "FILTER.MAIN.VESSEL_INFO.NAME",
        subItems: [
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.STATUS",
            key: "vessel.name",
          },
          { subItemName: "TABLE.PERMIT_NUMBER", key: "vessel.permitNumber" },
          { subItemName: "TABLE.HOME_PORT", key: "vessel.homePort" },
          {
            subItemName: "DATA_SHARING.MANAGE_SHARED_DATA.FLAG_STATE",
            key: "vessel.nationality",
          },
        ],
      },
      {
        itemName: "FILTER.MAIN.LAST_DELIVERY.NAME",
        subItems: [
          {
            subItemName: "TABLE.DATE",
            key: "vessel.lastDelivery.date",
          },
          {
            subItemName: "TABLE.BUSINESS",
            key: "vessel.lastDelivery.business",
          },
          {
            subItemName: "FILTER.MAIN.BOARDING_INFO.LOCATION",
            key: "vessel.lastDelivery.location",
          },
        ],
      },
      {
        itemName: "DATA_SHARING.MANAGE_SHARED_DATA.ELECTRINIC_SYSTEM",
        subItems: [
          { subItemName: "BOARDING_PAGE.EDIT_BOARDING.TYPE", key: "" },
          {
            subItemName: "BOARDING_PAGE.EDIT_BOARDING.REGISTRY_NUMBER",
            key: "",
          },
        ],
      },
    ],
  },
  {
    name: "NAVIGATION.CREW",
    itemsToShare: [
      {
        itemName: "TABLE.CAPTAIN",
        subItems: [
          {
            subItemName: "TABLE.NAME",
            key: "captain.name",
          },
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.LICENSE_NUMBER",
            key: "captain.license",
          },
        ],
      },
      {
        itemName: "SEARCH.CREW_MEMBERS",
        subItems: [
          {
            subItemName: "TABLE.NAME",
            key: "crew.name",
          },
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.LICENSE_NUMBER",
            key: "crew.license",
          },
        ],
      },
    ],
  },
  {
    name: "BOARDING_PAGE.VIEW_BOARDING.ACTIVITY",
    itemsToShare: [
      {
        itemName: "BOARDING_PAGE.VIEW_BOARDING.ACTIVITY",
        subItems: [
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.ACTIVITY",
            key: "inspection.activity",
          },
        ],
      },
      {
        itemName: "BOARDING_PAGE.VIEW_BOARDING.FISHERY",
        subItems: [
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.FISHERY",
            key: "inspection.fishery",
          },
        ],
      },
      {
        itemName: "BOARDING_PAGE.VIEW_BOARDING.GEAR",
        subItems: [
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.GEAR",
            key: "inspection.gearType",
          },
        ],
      },
    ],
  },
  {
    name: "FILTER.MAIN.CATCH.NAME",
    itemsToShare: [
      {
        itemName: "FILTER.MAIN.CATCH.NAME",
        subItems: [
          {
            subItemName: "FILTER.MAIN.CATCH.SPECIES",
            key: "actualCatch.fish",
          },
          {
            subItemName: "FILTER.MAIN.CATCH.WEIGHT",
            key: "actualCatch.weight",
          },
          {
            subItemName: "FILTER.MAIN.CATCH.COUNT",
            key: "actualCatch.count",
          },
        ],
      },
    ],
  },
  {
    name: "TABLE.VIOLATIONS",
    itemsToShare: [
      {
        itemName: "TABLE.VIOLATIONS",
        subItems: [
          {
            subItemName: "TABLE.VIOLATION",
            key: "inspection.summary.violations.disposition",
          },
          {
            subItemName: "DATA_SHARING.MANAGE_SHARED_DATA.RESULT_OF_VIOLATION",
            key: "inspection.summary.violations.disposition",
          },
          {
            subItemName: "DATA_SHARING.MANAGE_SHARED_DATA.VIOLATION_ISSUED_TO",
            key: "inspection.summary.violations.crewMember.name",
          },
          {
            subItemName: "BOARDING_PAGE.EDIT_BOARDING.SEIZURES",
            key: "inspection.summary.seizures.text",
          },
        ],
      },
    ],
  },
  {
    name: "TABLE.RISK",
    itemsToShare: [
      {
        itemName: "TABLE.RISK",
        subItems: [
          {
            subItemName: "TABLE.RISK",
            key: "inspection.summary.safetyLevel.level",
          },
        ],
      },
    ],
  },
  {
    name: "BOARDING_PAGE.VIEW_BOARDING.NOTES",
    itemsToShare: [
      {
        itemName: "BOARDING_PAGE.VIEW_BOARDING.NOTES",
        subItems: [
          {
            subItemName: "BOARDING_PAGE.VIEW_BOARDING.NOTES",
            key: "crew.attachments.notes",
          },
        ],
      },
    ],
  },
];
