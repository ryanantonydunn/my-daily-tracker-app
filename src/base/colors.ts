export const white = "#FFFFFF";
export const black = "#000000";
export const blue_500 = "#4299E1";
export const gray_100 = "#F7FAFC";
export const gray_200 = "#EDF2F7";
export const gray_300 = "#E2E8F0";
export const gray_400 = "#CBD5E0";
export const gray_500 = "#A0AEC0";
export const gray_600 = "#718096";
export const gray_700 = "#4A5568";
export const gray_800 = "#2D3748";
export const gray_900 = "#1A202C";
export const red = "#E53E3E";
export const green = "#48BB78";
export const yellow = "#D69E2E";
export const yellow_200 = "#FEFCBF";
export const yellow_300 = "#FAF089";
export const yellow_400 = "#F6E05E";
export const yellow_500 = "#ECC94B";
export const yellow_700 = "#B7791F";

export const teal_100 = "#";
export const teal_200 = "#";
export const teal_300 = "#";
export const teal_400 = "#";
export const teal_500 = "#";
export const teal_600 = "#";
export const teal_700 = "#";
export const teal_800 = "#";
export const teal_900 = "#";

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    "1": "#F7FAFC",
    "2": "#EDF2F7",
    "3": "#E2E8F0",
    "4": "#CBD5E0",
    "5": "#A0AEC0",
    "6": "#718096",
    "7": "#4A5568",
    "8": "#2D3748",
    "9": "#1A202C",
  },
  red: {
    "1": "#FFF5F5",
    "2": "#FED7D7",
    "3": "#FEB2B2",
    "4": "#FC8181",
    "5": "#F56565",
    "6": "#E53E3E",
    "7": "#C53030",
    "8": "#9B2C2C",
    "9": "#742A2A",
  },
  blue: {
    "1": "#EBF8FF",
    "2": "#BEE3F8",
    "3": "#90CDF4",
    "4": "#63B3ED",
    "5": "#4299E1",
    "6": "#3182CE",
    "7": "#2B6CB0",
    "8": "#2C5282",
    "9": "#2A4365",
  },
  green: {
    "1": "#F0FFF4",
    "2": "#C6F6D5",
    "3": "#9AE6B4",
    "4": "#68D391",
    "5": "#48BB78",
    "6": "#38A169",
    "7": "#2F855A",
    "8": "#276749",
    "9": "#22543D",
  },
  teal: {
    "1": "#E6FFFA",
    "2": "#B2F5EA",
    "3": "#81E6D9",
    "4": "#4FD1C5",
    "5": "#38B2AC",
    "6": "#319795",
    "7": "#2C7A7B",
    "8": "#285E61",
    "9": "#234E52",
  },
  yellow: {
    "1": "#FFFFF0",
    "2": "#FEFCBF",
    "3": "#FAF089",
    "4": "#F6E05E",
    "5": "#ECC94B",
    "6": "#D69E2E",
    "7": "#B7791F",
    "8": "#975A16",
    "9": "#744210",
  },
};

export const col = (str) => {
  if (colors[str]) return colors[str];
  const split = str.split("-");
  return colors[split[0]][split[1]] || colors.black;
};
