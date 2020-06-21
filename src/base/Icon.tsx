import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { gray_500 } from "./colors";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon = ({ name, size = 24, color = gray_500 }: IconProps) => (
  <MaterialIcons name={name} size={size} color={color} />
);

export default Icon;
