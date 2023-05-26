import { createRoot } from "react-dom/client";
import React from "react";
import './options.css';

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<img src="icon.png"/>);
