import { setStoredCities, setStoredOptions } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    homeCity: '',
    hasAutoOverlay: false,
    tempScale: 'metric',
  });
});
