import { createRoot } from 'react-dom/client';
import React from 'react';
import 'fontsource-roboto';
import './popup.css';
import WeatherCard from './WeatherCard';

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Rome" />
      <WeatherCard city="Guidoniaa" />
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
