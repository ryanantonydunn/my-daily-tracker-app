import React from "react";
import T, { H1 } from "../base/Text";
import Box from "../layout/Box";
import LayoutWithHeader from "../layout/LayoutWithHeader";

const TrackerView = () => {
  return (
    <LayoutWithHeader back title={<H1>View Tracker</H1>}>
      <Box scroll p1>
        <T>View Tracker</T>
        <Box h2 />
      </Box>
    </LayoutWithHeader>
  );
};

export default TrackerView;
