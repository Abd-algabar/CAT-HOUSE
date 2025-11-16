import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter  } from 'react-router-dom';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: '"Playpen Sans Arabic", "Arial", sans-serif',
    h1: {
      fontWeight: 700, // Bold
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
       <App />
      </BrowserRouter>
      
    </ThemeProvider>
  
  </StrictMode>,
)
