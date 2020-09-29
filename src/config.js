const config = {
  appName: 'WildAid O-FISH',
  realmServiceName: 'mongodb-atlas',
  realmAppId: 'o-fish-trial-dmssx',
  database: 'wildaid',
  chartsConfig: {
    baseUrl: "https://charts.mongodb.com/charts-o-fish-psrir",
    "boardings": {
      chartId: "77702f8f-71f2-4650-a05b-ea0126943bf8"
    },
    "boarding-compliance":{
      chartId: "26107bcf-68b4-4d9e-8bd1-ee0fb191a230"
    },
    "patrol-hours":{
      chartId: "caedf1d9-d7fd-4bb4-b6b2-30e3b63757bc"
    },
    "compliance-rate":{
      chartId: "d36c9cd0-b345-4997-bccc-ca0ded7d6f3f"
    },
    "boardings-count-chart":{
      chartId: "f7353834-d9f1-41de-9884-c7ac9e7f01ee"
    },
    "citations-and-warnings":{
      chartId: "12f86c49-0ca4-4994-8dbc-5ceac48ded82"
    }
  },
  sandbox: false,
};

module.exports = config;
