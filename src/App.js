import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Wanderlist from "./components/Main/Main"; 
import ItineraryList from "./components/Itinerary/Itinerary";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  const [itineraries, setItineraries] = useState([]);

  // Load stored itineraries from local storage on component mount
  useEffect(() => {
    const storedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    setItineraries(storedItineraries);
  }, []);

  // Adds a new itinerary to the state and updates local storage
  const addItinerary = (newItinerary) => {
    const updatedItineraries = [...itineraries, newItinerary];
    setItineraries(updatedItineraries);
    localStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
  };

  return (
    <div className={classes.outerWrapper}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={4} className={classes.formContainer}>
          {/* Wanderlist component for user input to create itineraries */}
          <Wanderlist addItinerary={addItinerary} /> 
        </Grid>
        <Grid item xs={12} sm={8} className={classes.itineraryContainer}>
          {/* ItineraryList component to display generated itineraries */}
          <ItineraryList itineraries={itineraries} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
