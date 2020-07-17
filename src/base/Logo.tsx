import React from "react";
import T from "./Text";
import Box from "../layout/Box";
import { yellow_200, yellow_300 } from "./colors";

const Logo = () => {
  return (
    <Box row>
      <T title white>
        My
      </T>
      <T title style={{ color: yellow_300 }}>
        Daily
      </T>
      <T title white>
        Tracker
      </T>
    </Box>
  );
};

export default Logo;
