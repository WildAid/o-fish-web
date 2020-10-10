import React, { useState, useEffect } from "react";
import ChartsEmbedSDK, {
  getRealmUserToken,
} from "@mongodb-js/charts-embed-dom";
import StitchService from "./../../services/stitch.service";
import "./chart-box.css";

const stitchService = StitchService.getInstance();

const sdk = new ChartsEmbedSDK({
  baseUrl: stitchService.chartsConfig.baseUrl,
});

// when using npm:
// import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

async function renderChart(boxId, options) {
  const elementSelector = "#" + boxId;
  options.showAttribution = false;
  if (options.useAuthenticatedAccess) {
    delete options.useAuthenticatedAccess;
    options.getUserToken = () => {
      return getRealmUserToken(stitchService.client);
    };
  }
  const chart = sdk.createChart(options);
  const chartElem = document.querySelector(elementSelector);
  if (chartElem) {
    await chart.render(chartElem);
  }
}

export default function ChartBox({ options, className }) {
  const [boxId] = useState(("chartBox" + Math.random()).replace("0.", ""));
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (filter !== options.filter) {
      setFilter(options.filter);
      renderChart(boxId, options);
    }
  }, [boxId, filter, options]);

  return <div id={boxId} className={`chart-box ${className}`}></div>;
}
