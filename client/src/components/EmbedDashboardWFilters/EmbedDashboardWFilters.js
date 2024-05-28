import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { Space, SpaceVertical } from "@looker/components";
import { PageTitle } from "../common/PageTitle";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { sdk } from "../../helpers/CorsSessionHelper";
import {
  Filter,
  i18nResources,
  ComponentsProvider,
  useSuggestable,
  useExpressionState,
} from "@looker/filter-components";
import { InputDateRange } from "@looker/components-date/InputDateRange";

// import { Button, Form, Modal } from "react-bootstrap";

let dashboard = [];

const EmbedDashboardWFilters = () => {
  const [loading, setLoading] = React.useState(true);
  // const [dashboard, setDashboard] = React.useState();

  // State for all the available filters for the embedded dashboard
  const [dashboardFilters, setDashboardFilters] = React.useState();

  // State for the filter values, selected by the filter components located outside the embedded dashboard
  const [filterValues, setFilterValues] = React.useState({});

  // Looker API call using the API SDK to get all the available filters for the embedded dashboard
  useEffect(() => {
    const initialize = async () => {
      const filters = await sdk.ok(
        sdk.dashboard(935, "dashboard_filters", "listens_to_filters")
      );

      setDashboardFilters(filters["dashboard_filters"]);
    };
    initialize();
  }, []);

  // Set the new selected filter values in state, when selected using the components outside the dashboard
  const handleFilterChange = (newFilterValue, filterName) => {
    console.log(newFilterValue, "newFilterValue");
    console.log(filterName, "filterName");
    dashboard.forEach((dash) => {
      dash.send("dashboard:filters:update", {
        filters: {
          [filterName]: newFilterValue,
        },
      });
      // The "dashboard:run" message has to be sent for the filter change to take effect
      dash.send("dashboard:run");
    });
  };

  // Set the state of the dashboard so we can update filters and run
  const handleDashboardLoaded = (dashboard) => {
    // setDashboard(dashboard);
    setLoading(false);
  };

  const canceller = (event) => {
    return { cancel: !event.modal };
  };

  /*
   Step 1 Initialization of the EmbedSDK happens when the user first access the application
   See App.js for reference
  */

  const makeDashboard = useCallback(
    (id) => (el) => {
      if (!el) {
        return;
      }

      el.innerHTML = "";

      LookerEmbedSDK.createDashboardWithId(id)

        .appendTo(el)

        //
        // .on("dashboard:filters:changed", (e) => {
        //   console.log("Filters have been applied or changed.");
        //   console.log(e);
        // })

        .on("drillmenu:click", canceller)
        .on("drillmenu:click", (e) => {
          const url = e.url;
          const filters = url.split("::")[1];

          const filterPairs = filters.split(",");

          const filterObject = {};

          filterPairs.forEach((pair) => {
            const [key, value] = pair.split("=");
            filterObject[key] = value;
          });

          dashboard.forEach((dash) => {
            dash.send("dashboard:filters:update", {
              filters: filterObject,
            });
            dash.send("dashboard:run");
          });
        })

        // .withParams({ _theme: '{"show_filters_bar":false}' })
        .build()
        .connect()
        .then((response) => {
          dashboard.push(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    []
  );

  return (
    <div className={"embed-dashboard-main"} style={{ padding: "20px" }}>
      <PageTitle
        text={"Two Dashboards with Filters"}
        style={{ marginBottom: "50px" }}
      />
      <LoadingSpinner loading={loading} />
      <ComponentsProvider resources={i18nResources}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: "2em",
          }}
        >
          {dashboardFilters?.map((filter) => {
            return filter.ui_config.type === "day_range_picker" ? (
              <DashFilters2
                filter={filter}
                expression={filterValues[filter.name]}
                onChange={(event) => handleFilterChange(event, filter.name)}
                // handleFilterChange={handleFilterChange}
                key={filter.id}
              />
            ) : (
              <DashFilters
                filter={filter}
                expression={filterValues[filter.name]}
                onChange={(event) => handleFilterChange(event, filter.name)}
                key={filter.id}
              />
            );
          })}
        </div>
      </ComponentsProvider>
      {/* Step 0) we have a simple container, which performs a callback to our makeDashboard function */}

      <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
        {[935, 932].map((id, index) => (
          <div key={index}>
            <p>Dashboard {id}</p>
            <Dashboard ref={makeDashboard(id)}></Dashboard>
          </div>
        ))}
      </div>
    </div>
  );
};

// A little bit of style here for heights and widths.
const Dashboard = styled.div`
  width: 100%;
  height: 100%;
  min-height: 800px;
  bargin-bottom: 200px;
  border: 1px solid #dedede;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

export default EmbedDashboardWFilters;

// Utilizes the more custom implementation of Looker filter components described in the filter components documentation.
// Refer to the Looker filter components documentation for more details:
// https://github.com/looker-open-source/components/blob/HEAD/packages/filter-components/USAGE.md
export const DashFilters = ({ filter, expression, onChange }) => {
  const stateProps = useExpressionState({
    filter,
    // These props will likely come from higher up in your application
    expression,
    onChange,
  });

  const { suggestableProps } = useSuggestable({
    filter,
    sdk,
  });

  const FilterLabel = styled.span`
    font-family: inherit;
    margin: 0px;
    padding: 0px;
    color: rgb(64, 70, 75);
    font-size: 0.75rem;
    font-weight: 500;
    padding-bottom: 0.25rem;
  `;

  return (
    <>
      <div style={{ margin: ".5em 0em 1em 0em" }}>
        <>
          <FilterLabel>{filter.name}</FilterLabel>
          <Filter
            name={filter.name}
            type={filter.type}
            config={{ type: ["button_group", "dropdown_list"] }}
            {...suggestableProps}
            {...stateProps}
          />
        </>
      </div>
    </>
  );
};

export const DashFilters2 = ({ filter, expression, onChange }) => {
  const defaultValue = filter.default_value;

  const [startDateStr, endDateStr] = defaultValue.split(" to ");

  const fromDate = new Date(startDateStr);
  const toDate = new Date(endDateStr);

  const [dateValue, setDateValue] = useState({
    from: fromDate,
    to: toDate,
  });

  const handleDateChange = (newState) => {
    const fromDateStr = `${newState?.from.getFullYear()}/${String(
      newState?.from.getMonth() + 1
    ).padStart(2, "0")}/${String(newState?.from.getDate()).padStart(2, "0")}`;
    const toDateStr = `${newState?.to.getFullYear()}/${String(
      newState?.to.getMonth() + 1
    ).padStart(2, "0")}/${String(newState?.to.getDate()).padStart(2, "0")}`;
    const dateRangeStr = `${fromDateStr} to ${toDateStr}`;
    console.log(dateRangeStr, "dateRangeStr");
    onChange(dateRangeStr, filter.name);
  };

  return (
    <>
      <div style={{ margin: ".5em 0em 1em 0em" }}>
        <>
          <InputDateRange
            name={filter.name}
            type={filter.type}
            value={dateValue}
            onChange={(event) => {
              setDateValue((prevState) => {
                const newState = event;
                handleDateChange(newState);
                return newState;
              });
            }}
          />
        </>
      </div>
    </>
  );
};
