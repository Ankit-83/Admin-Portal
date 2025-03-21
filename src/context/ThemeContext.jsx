import { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#1976d2' },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                }
              }
            : {
                primary: { main: '#90caf9' },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                }
              })
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}