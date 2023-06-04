import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import 'fontsource-roboto';
import './popup.css';
import WeatherCard from './WeatherCard';
import { setStoredCities, getStoredCities } from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);

  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === '') return;

    const updatedCities = [...cities, cityInput];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  console.log(cityInput);

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);

    const updatedCities = [...cities];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  return (
    <div>
      <Box mx="8px" my="16px">
        <Grid container>
          <Grid item>
            <Paper>
              <Box px="15px" py="5px">
                <InputBase
                  placeholder="Add city"
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                ></InputBase>
                <IconButton onClick={handleCityButtonClick}>
                  <AddIcon></AddIcon>
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {cities.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            onDelete={() => handleCityDeleteButtonClick(index)}
          ></WeatherCard>
        ))}
        <Box height="16px"></Box>
      </Box>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
