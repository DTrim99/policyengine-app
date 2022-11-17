import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { apiCall } from "../../../api/call";
import {
  getPlotlyAxisFormat,
  getValueFromHousehold,
} from "../../../api/variables";
import ErrorPage from "../../../layout/Error";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";
import FadeIn from "../../../layout/FadeIn";

export default function EarningsVariation(props) {
  const { household, metadata } = props;
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let householdData = JSON.parse(JSON.stringify(household.input));
    householdData.people.you.employment_income["2022"] = null;
    householdData.axes = [
      [
        {
          name: "employment_income",
          period: "2022",
          min: 0,
          max: 200_000,
          count: 101,
        },
      ],
    ];
    apiCall(`/${metadata.countryId}/calculate`, householdData)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      })
      .catch((err) => {
        setError(err);
      });
  });

  if (error) {
    return (
      <ErrorPage message="We ran into an issue when trying to simulate your household's net income under different earnings. Please try again later." />
    );
  }

  let plot;

  if (result) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      result,
      metadata
    );
    const netIncomeArray = getValueFromHousehold(
      "household_net_income",
      "2022",
      null,
      result,
      metadata
    );
    const currentEarnings = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      household.input,
      metadata
    );
    const currentNetIncome = getValueFromHousehold(
      "household_net_income",
      "2022",
      null,
      household.computed,
      metadata
    );
    // Add the main line, then add a 'you are here' line
    plot = (
      <FadeIn>
        <Plot
          data={[
            {
              x: earningsArray,
              y: netIncomeArray,
              type: "line",
              name: "Net income",
            },
            {
              x: [currentEarnings, currentEarnings],
              y: [0, currentNetIncome],
              type: "line",
              name: "Your current net income",
              line: {
                color: style.colors.DARK_GRAY,
              },
            },
          ]}
          layout={{
            xaxis: {
              title: "Employment income",
              ...getPlotlyAxisFormat(metadata.variables.employment_income.unit),
            },
            yaxis: {
              title: "Net income",
              ...getPlotlyAxisFormat(
                metadata.variables.household_net_income.unit
              ),
            },
          }}
          config={{
            displayModeBar: false,
          }}
          style={{
            width: "100%",
          }}
        />
      </FadeIn>
    );
  }

  return (
    <ResultsPanel
      title="Your net income changes under different earnings"
      description="This chart shows how your net income changes under different earnings. It is based on your household's current situation."
    >
      {plot}
    </ResultsPanel>
  );
}
