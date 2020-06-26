import React from "react";
import T from "./Text";
import Box from "../layout/Box";

const Logo = () => {
  return (
    <Box row>
      <T lg serif light>
        My
      </T>
      <T lg serif xLight>
        Daily
      </T>
      <T lg serif light>
        Tracker
      </T>
    </Box>
  );
};

export default Logo;
