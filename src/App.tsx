import React, {useMemo, useState} from 'react';
import {
  RouterProvider,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/fonts/fonts.css';
import '@/styles/app.css';
import {
  CssBaseline,
  ThemeProvider,
  Theme,
} from "@mui/material";
import AppRouter from "@/AppRouter";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { theme as themeLight } from '@/styles/theme/light';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import Fallback from "@/components/Fallback";

const LightThemeToastContainer = styled(ToastContainer)`
      // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
      &&& {
        text-align: left;
      }
      .Toastify__progress-bar--error {
        background: ${themeLight.palette.primary.main};
      }
      .Toastify__toast-icon svg{
        fill: ${themeLight.palette.primary.main};
      }
    `;

const App: React.FunctionComponent = () => {
  // TODO add dark theme
  const [themeMode] = useState<string>("light");
  const theme: Theme = useMemo(
      (): Theme => themeMode === "light" ? themeLight : themeLight,
      [themeMode]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <LightThemeToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              progressClassName=""
          />

          <RouterProvider
              router={AppRouter}
              fallbackElement={<Fallback />}
          />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
