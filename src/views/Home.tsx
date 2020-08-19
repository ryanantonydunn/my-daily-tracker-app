import React, { useContext } from "react";
import DataContext from "../store/DataContext";
import GetStarted from "./GetStarted";
import TrackerTable from "./TrackerTable";

const Home = ({ route }) => {
  const { trackers } = useContext(DataContext);
  const hasTrackers = trackers.some(({ disabled }) => !disabled);
  return hasTrackers ? <TrackerTable route={route} /> : <GetStarted />;
};

export default Home;
