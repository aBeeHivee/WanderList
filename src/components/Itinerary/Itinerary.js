import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import useStyles from './styles';
import Mascot from './Mascot'; // Import your mascot here

// ItineraryList component displays the user's generated itineraries
const ItineraryList = ({ itineraries }) => {
  const classes = useStyles();
  const [expandedItineraryIndex, setExpandedItineraryIndex] = useState(null);

  // Toggles the display of detailed itinerary information
  const handleToggleItinerary = (index) => {
    setExpandedItineraryIndex(expandedItineraryIndex === index ? null : index);
  };

  // Display a message and mascot when there are no itineraries
  if (itineraries.length === 0) {
    return (
      <div className={classes.noItinerary}>
        <Typography variant="h5" className={classes.header} align="center">
          Your Itineraries ✈️
        </Typography>
        <Mascot />
      </div>
    );
  }

  return (
    <div className={classes.itineraryWrapper}>
      <Typography variant="h5" className={classes.header} align="center">
        Your Itineraries ✈️
      </Typography>
      <Divider style={{ margin: '10px 0' }} />
      <List className={classes.itineraryList}>
        {itineraries.map((itinerary, index) => (
          <div key={index}>
            <ListItem
              button
              onClick={() => handleToggleItinerary(index)}
              className={classes.listItem}
            >
              <ListItemText primary={itinerary.city} />
            </ListItem>
            {expandedItineraryIndex === index && (
              <Card className={classes.expandedCard}>
                <CardContent>
                  <Typography variant="h6">{itinerary.tripName}</Typography>
                  <Typography>{itinerary.response}</Typography>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </List>
    </div>
  );
};

export default ItineraryList;
