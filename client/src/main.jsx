import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import './styles/fonts.css';
import './styles/index.css';

import './styles/App.css';
import './styles/main.css';
import './styles/last.css';

const container = document.getElementById("root");
if (!container) throw new Error("container not found");

const root = createRoot(container);
root.render(<React.StrictMode><App /></React.StrictMode>);
