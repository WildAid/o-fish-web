const config = {
  appName: 'WildAid O-Fish',
  realmServiceName: 'mongodb-atlas',
  realmAppId: '',
  database: 'wildaid',
  chartsConfig: {
    baseUrl: "https://charts-dev.mongodb.com/charts-wildaid-xxxxx",
    "boardings": {
      chartId: "chart-id"
    },
    "boarding-compliance":{
      chartId: "chart-id"
    },
    "patrol-hours":{
      chartId: "chart-id"
    },
    "compliance-rate":{
      chartId: "chart-id"
    },
    "boardings-count-chart":{
      chartId: "chart-id"
    },
    "citations-and-warnings":{
      chartId: "chart-id"
    }
  }
};

module.exports = config;
