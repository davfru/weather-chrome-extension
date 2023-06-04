import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import './options.css';
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
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from '../utils/storage';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    console.log(homeCity);
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState('saving');
    setStoredOptions(options).then(() => setFormState('ready'));
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city name"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
