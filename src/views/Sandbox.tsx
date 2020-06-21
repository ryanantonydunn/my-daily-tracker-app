import React from "react";
import Icon from "../base/Icon";
import T, { H1 } from "../base/Text";
import Box from "../layout/Box";
import LayoutWithHeader from "../layout/LayoutWithHeader";

const icons = [
  "all-inclusive",
  "arrow-back",
  "arrow-forward",
  "check",
  "close",
  "delete",
  "edit",
  "linear-scale",
  "more-vert",
  "playlist-add",
  "playlist-play",
  "short-text",
  "star-border",
  "unfold-more",
];

const Sandbox = () => {
  return (
    <LayoutWithHeader back title={<H1>Sandbox</H1>}>
      <Box scroll p1>
        <T>Base</T>
        <T serif>Serif</T>
        <T sm>Small</T>
        <T lg>Large</T>
        <T xl>Extra Large</T>
        <T bold>Bold</T>
        <T light>Light</T>
        <T xLight>Extra Light</T>
        <Box h2 />
        <Box row wrap>
          {icons.map((name, i) => (
            <Icon key={i} name={name} size={36} />
          ))}
        </Box>
      </Box>
    </LayoutWithHeader>
  );
};

export default Sandbox;
