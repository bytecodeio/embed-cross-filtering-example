import { Space } from "@looker/components";
import React, { ReactNode, useEffect } from "react";
import styled from "styled-components";
import CodeDrawer from "./components/common/CodeDrawer";

export default function Container({ content, path }) {
  const [drawerToggle, setDrawerToggle] = React.useState(false);

  const handleDrawer = () => {
    setDrawerToggle(!drawerToggle);
  };
  return (
    <div className="main-container">

      {content}

    </div>
  );
}



const Button = styled.button`
  margin-left: auto;
  background: rgb(26, 115, 232);
  border: 1px solid rgb(66, 133, 244);
  padding: 0px 1.5rem;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  font-size: 0.875rem;
  height: 36px;
  color: white;
`;
