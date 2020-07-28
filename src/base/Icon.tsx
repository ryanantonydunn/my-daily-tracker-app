import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { col } from "./styles/tailwind";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon = ({ name, size = 24, color = "gray-500" }: IconProps) => (
  <MaterialIcons name={name} size={size} color={col(color)} />
);

export default Icon;
