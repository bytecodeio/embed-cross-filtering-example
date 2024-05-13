import styled from "styled-components"
import React from "react"

  export const PageTitle = ({text}) => {
    return (
      <PageTitleDiv>{text}</PageTitleDiv>
    )      
  }

  const PageTitleDiv = styled.div`
  font-family: "Google Sans", "Open Sans", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #5F6368;
  font-weight: 200;
  }
`

