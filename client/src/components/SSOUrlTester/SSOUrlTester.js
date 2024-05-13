// Embedded dashboards let you build an interactive and highly curated data experience within your application
// This file is used to embed a dashboard using LookerEmbedSDK with EmbedBuilder to initialize your connection and help create the iframe element

import React, { useCallback } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { Space } from "@looker/components";
import { PageTitle } from "../common/PageTitle";
import { EmbedScene } from "./EmbedScene/EmbedScene";

const SSOUrlTester = () => {
  return (
    <Space>
      <div className={"embed-dashboard-main"}>
        <PageTitle text={"SSO Embed URL Tester"} />
        <EmbedScene />
      </div>
    </Space>
  );
};

export default SSOUrlTester;
