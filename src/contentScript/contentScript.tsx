import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import 'fontsource-roboto';
import {
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import WeatherCard from '../components/WeatherCard';
import './contentScript.css';
import { LocalStorageOptions, getStoredOptions } from '../utils/storage';
import { Messages } from '../utils/message';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  const handleMessages = (msg: Messages) => {
    if (msg === Messages.TOGGLE_OVERLAY) {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages);
    };
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
          ;
        </Card>
      )}
    </>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
