import React from "react";
import EmbedDashboard from "./components/EmbedDashboard/EmbedDashboard";
import EmbedExplore from "./components/EmbedExplore/EmbedExplore";
import VizComponent from "./components/VizComponent/VizComponent";
import VizComponentWFilter from "./components/VizComponent/VizComponentWFilter";
import EmbedQuery from "./components/EmbedQuery/EmbedQuery";
import EmbedDashboardEvents from "./components/EmbedDashboardEvents/EmbedDashboardEvents";
import "./App.css";
import TopBanner from "./components/Navigation/TopBanner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import EmbedLookSDK from './components/EmbedLookSDK'
import { ComponentsProvider } from "@looker/components-providers";
import Container from "./RouteContainer";
import { Space } from "@looker/components";
import { NavigationMenu } from "./components/Navigation/NavigationMenu";
import { EmbedSDKInit } from "./components/common/EmbedInit";
import EmbedTwoIframes from "./components/EmbedTwoIframes/EmbedTwoIframes";
import EmbedDashboardLayout from "./components/EmbedDashboardLayout/EmbedDashboardLayout";
import EmbedDashboardDownload from "./components/EmbedDashboardDownload/EmbedDashboardDownload";
import SSOUrlTester from "./components/SSOUrlTester/SSOUrlTester";
import EmbedDashboardWFilters from "./components/EmbedDashboardWFilters/EmbedDashboardWFilters";

const routes = {
  title: "Embed Examples",
  examples: [

    {
      url: "/embed-dashboard-with-filters",
      text: "Embedded Dashboard With Filters",
      component: <EmbedDashboardWFilters />,
      path: "EmbedDashboardWFilters/EmbedDashboardWFilters.js",
    },

  ],
};

function App() {
  // Update the page height to have the app fit in viewport without scrolling

  const [menuToggle, setMenuToggle] = React.useState(true);
  // This code adds a Components Provider, which allows Looker components to be easily used later
  // It also adds a top banner, which includes navigation
  // It switches 'routes' based on the path and renders a 'Container' with the appropriate content

  /*
    Calls EmbedSDK init() pointing the SDK to a looker host, a service to get the iframe URLs from, and passing user identifying information in the header
    no call to the auth service is made at this step
  */
  EmbedSDKInit();

  return (
    <ComponentsProvider>
      <Router>


          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to={routes.examples[0].url} />}
            />

            {routes.examples.map((e) => {
              return (
                <Route
                  path={e.url}
                  default
                  element={<Container content={e.component} path={e.path} />}
                  key={e.text}
                />
              );
            })}
          </Routes>

      </Router>
    </ComponentsProvider>
  );
}

export default App;
