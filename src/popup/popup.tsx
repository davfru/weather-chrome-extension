import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core';
import { Add as AddIcon, PictureInPicture } from '@material-ui/icons';
import 'fontsource-roboto';
import './popup.css';
import WeatherCard from '../components/WeatherCard';
import {
  setStoredCities,
  getStoredCities,
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';
import { Messages } from '../utils/message';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);

  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === '') return;

    const updatedCities = [...cities, cityInput];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);

    const updatedCities = [...cities];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleOverlayButton = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
          console.log('message sent');
        }
      }
    );
  };

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    };

    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions);
    });
  };

  if (!options) return null;

  return (
    <div>
      <Box mx="8px" my="16px">
        <Grid container justify="space-evenly">
          <Grid item>
            <Paper>
              <Box px="15px" py="5px">
                <InputBase
                  placeholder="Add city"
                  name="cityName"
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                ></InputBase>
                <IconButton onClick={handleCityButtonClick}>
                  <AddIcon></AddIcon>
                </IconButton>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box py="4px">
                <IconButton onClick={handleTempScaleButtonClick}>
                  {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
                </IconButton>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box py="4px">
                <IconButton onClick={handleOverlayButton}>
                  <PictureInPicture />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {options.homeCity != '' && (
          <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
        )}

        {cities.map((city, index) => (
          <WeatherCard
            city={city}
            tempScale={options.tempScale}
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
