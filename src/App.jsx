import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { contrastTheme, lightTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './routes/AppRoutes';

function ThemedApp() {
  const { highContrast } = useAccessibility();

  return (
    <ThemeProvider theme={highContrast ? contrastTheme : lightTheme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <ThemedApp />
      </AccessibilityProvider>
    </BrowserRouter>
  );
}
