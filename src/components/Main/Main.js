import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  TextField,
  MenuItem,
  Button,
  Chip,
} from "@material-ui/core";
import { GoogleGenerativeAI } from "@google/generative-ai";
import useStyles from "./styles";

// Wanderlist component allows users to input travel details, select interests, activities, and cuisines, and generate a travel itinerary using AI.
const Wanderlist = ({ addItinerary }) => {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI("AIzaSyBwJtpI9NNR4APWgF2Dp2sk6f0mr82eRGM");

  // Initializes session storage to clear local storage if the app is not already initialized
  useEffect(() => {
    const isInitialized = sessionStorage.getItem("appInitialized");
    if (!isInitialized) {
      localStorage.clear();
      sessionStorage.setItem("appInitialized", "true");
    }
  }, []);

  // Handles form submission to generate itinerary based on user inputs
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `Generate a travel itinerary for ${city} for ${days} days focusing on interests: ${selectedInterests.join(", ")}, activities: ${selectedActivities.join(", ")}, and cuisines: ${selectedCuisines.join(", ")}.`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      console.log(responseText);

      const newItinerary = {
        city,
        days,
        interests: selectedInterests,
        activityTypes: selectedActivities,
        cuisineTypes: selectedCuisines,
        response: responseText,
      };

      addItinerary(newItinerary);
      resetForm();
    } catch (error) {
      console.error("Something Went Wrong", error);
    } finally {
      setLoading(false);
    }
  };

  // Resets form fields after itinerary generation
  const resetForm = () => {
    setCity("");
    setDays("");
    setSelectedInterests([]);
    setSelectedActivities([]);
    setSelectedCuisines([]);
  };

  const handleInterestChange = (interest) => {
    if (selectedInterests.length < 3 && !selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleActivityChange = (activity) => {
    if (selectedActivities.length < 3 && !selectedActivities.includes(activity)) {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleCuisineChange = (cuisine) => {
    if (selectedCuisines.length < 3 && !selectedCuisines.includes(cuisine)) {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleDeleteInterest = (interest) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
  };

  const handleDeleteActivity = (activity) => {
    setSelectedActivities(selectedActivities.filter((a) => a !== activity));
  };

  const handleDeleteCuisine = (cuisine) => {
    setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography align="center" variant="h5">
          Wanderlist
        </Typography>
        <Typography variant="subtitle1" align="center" style={{ marginBottom: "20px" }}>
          Plan your dream adventure with ease! 🌍✈️
        </Typography>
        <Divider className={classes.divider} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City Traveling To"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Number of Days Traveling For"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                variant="outlined"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Interests:</Typography>
              <div>
                {selectedInterests.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    onDelete={() => handleDeleteInterest(interest)}
                    style={{ margin: "4px" }}
                  />
                ))}
              </div>
              <TextField
                fullWidth
                select
                label="Select Interests"
                variant="outlined"
                disabled={selectedInterests.length >= 3}
              >
                {[
                  { name: "History", emoji: "📜" },
                  { name: "Art", emoji: "🎨" },
                  { name: "Food", emoji: "🍽️" },
                  { name: "Music", emoji: "🎶" },
                  { name: "Nature", emoji: "🌳" },
                  { name: "Sports", emoji: "⚽" },
                  { name: "Photography", emoji: "📷" },
                  { name: "Architecture", emoji: "🏛️" },
                  { name: "Literature", emoji: "📚" },
                ]
                  .filter((interest) => !selectedInterests.includes(interest.name))
                  .map((interest) => (
                    <MenuItem key={interest.name} value={interest.name} onClick={() => handleInterestChange(interest.name)}>
                      {interest.emoji} {interest.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Activities:</Typography>
              <div>
                {selectedActivities.map((activity) => (
                  <Chip
                    key={activity}
                    label={activity}
                    onDelete={() => handleDeleteActivity(activity)}
                    style={{ margin: "4px" }}
                  />
                ))}
              </div>
              <TextField
                fullWidth
                select
                label="Select Activities"
                variant="outlined"
                disabled={selectedActivities.length >= 3}
              >
                {[
                  { name: "Outdoor", emoji: "🏞️" },
                  { name: "Sightseeing", emoji: "👀" },
                  { name: "Shopping", emoji: "🛍️" },
                  { name: "Nightlife", emoji: "🌃" },
                  { name: "Museums", emoji: "🏛️" },
                  { name: "Theme Parks", emoji: "🎢" },
                  { name: "Water Sports", emoji: "🏄" },
                  { name: "Yoga and Wellness", emoji: "🧘" },
                ]
                  .filter((activity) => !selectedActivities.includes(activity.name))
                  .map((activity) => (
                    <MenuItem key={activity.name} value={activity.name} onClick={() => handleActivityChange(activity.name)}>
                      {activity.emoji} {activity.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Cuisines:</Typography>
              <div>
                {selectedCuisines.map((cuisine) => (
                  <Chip
                    key={cuisine}
                    label={cuisine}
                    onDelete={() => handleDeleteCuisine(cuisine)}
                    style={{ margin: "4px" }}
                  />
                ))}
              </div>
              <TextField
                fullWidth
                select
                label="Select Cuisines"
                variant="outlined"
                disabled={selectedCuisines.length >= 3}
              >
                {[
                  { name: "Traditional", emoji: "😋" },
                  { name: "Japanese", emoji: "🍱" },
                  { name: "Italian", emoji: "🍝" },
                  { name: "American", emoji: "🍔" },
                  { name: "Korean", emoji: "🍜" },
                  { name: "Mexican", emoji: "🌮" },
                  { name: "Thai", emoji: "🍲" },
                  { name: "Turkish", emoji: "🥙" },
                  { name: "Indian", emoji: "🍛" },
                  { name: "French", emoji: "🥐" },
                  { name: "Spanish", emoji: "🥘" },
                  { name: "Greek", emoji: "🍗" },
                  { name: "Chinese", emoji: "🥡" },
                ]
                  .filter((cuisine) => !selectedCuisines.includes(cuisine.name))
                  .map((cuisine) => (
                    <MenuItem key={cuisine.name} value={cuisine.name} onClick={() => handleCuisineChange(cuisine.name)}>
                      {cuisine.emoji} {cuisine.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Itinerary"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Wanderlist;
