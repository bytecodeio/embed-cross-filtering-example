import styled from "styled-components";
import React from "react";
import { Spinner, Box2 } from "@looker/components";

export const LoadingSpinner = ({ loading }) => {
  return (
    <Box2 position="absolute" top="50%" left="50%">
      {loading && <Spinner size={60} color="rgb(26, 115, 232)" />}
    </Box2>
  );
};
