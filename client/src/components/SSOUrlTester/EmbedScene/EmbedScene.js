/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
import React, { useState } from "react";
import { Box, Aside, Layout, Heading, TextArea } from "@looker/components";

import { EmbedForm } from "./EmbedForm/EmbedForm";

const dashboardId = 1;

/**
 * Renders a form for dynamically embedding content
 */
export const EmbedScene = () => {
  const [authRequest, setAuthRequest] = useState({
    target_url: `/embed/dashboards/${dashboardId}`,
    first_name: "",
    last_name: "",
    models: [],
    permissions: [],
    group_ids: [],
    session_length: 3600,
    force_logout_login: true,
  });
  const [embedUrl, setEmbedUrl] = useState("");

  return (
    <Box display="flex">
      <Box bg="background" padding="small" py="xlarge" width="25rem">
        <EmbedForm
          authRequest={authRequest}
          setAuthRequest={setAuthRequest}
          setEmbedUrl={setEmbedUrl}
        />
      </Box>
      <Box
        borderLeft="1px solid grey"
        marginLeft="medium"
        padding="medium"
        width="100%"
      >
        <Heading as="h3">Embed URL</Heading>
        <TextArea resize={false} disabled value={embedUrl} />
        <Heading py="medium" as="h3">
          Embed Preview
        </Heading>
        <Box boxShadow="0 0 2px 2px grey" height="80%">
          {embedUrl && (
            <iframe
              className="iframe"
              style={{ height: "100%", width: "100%" }}
              src={embedUrl}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
