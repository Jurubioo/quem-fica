import { createContext, useContext, useEffect, useState } from 'react';

// Guarda as preferências de acessibilidade escolhidas na barra do topo:
// tamanho do texto e alto contraste. Ficam salvas no navegador da pessoa.

const STORAGE_KEY = 'quem-fica:acessibilidade';
const FONT_SCALES = [1, 1.125, 1.25, 1.375]; // 100%, 112,5%, 125%, 137,5%
const DEFAULT_PREFS = { fontStep: 0, highContrast: false };

function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const fontStep = Number.isInteger(saved?.fontStep) ? saved.fontStep : 0;
    return {
      fontStep: Math.min(Math.max(fontStep, 0), FONT_SCALES.length - 1),
      highContrast: saved?.highContrast === true,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [prefs, setPrefs] = useState(loadPrefs);

  useEffect(() => {
    // Como todo o layout usa rem, mudar o tamanho da fonte do <html>
    // aumenta textos, botões e espaçamentos de forma proporcional.
    document.documentElement.style.fontSize = `${FONT_SCALES[prefs.fontStep] * 100}%`;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // navegação anônima ou armazenamento bloqueado: segue sem salvar
    }
  }, [prefs]);

  const maxStep = FONT_SCALES.length - 1;

  function increaseFont() {
    setPrefs((previousPrefs) => ({
      ...previousPrefs,
      fontStep: Math.min(previousPrefs.fontStep + 1, maxStep),
    }));
  }

  function decreaseFont() {
    setPrefs((previousPrefs) => ({
      ...previousPrefs,
      fontStep: Math.max(previousPrefs.fontStep - 1, 0),
    }));
  }

  function resetFont() {
    setPrefs((previousPrefs) => ({ ...previousPrefs, fontStep: 0 }));
  }

  function toggleContrast() {
    setPrefs((previousPrefs) => ({
      ...previousPrefs,
      highContrast: !previousPrefs.highContrast,
    }));
  }

  const value = {
    ...prefs,
    fontPercent: Math.round(FONT_SCALES[prefs.fontStep] * 100),
    canIncrease: prefs.fontStep < maxStep,
    canDecrease: prefs.fontStep > 0,
    increaseFont,
    decreaseFont,
    resetFont,
    toggleContrast,
  };

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility precisa estar dentro de <AccessibilityProvider>.');
  }
  return context;
}
