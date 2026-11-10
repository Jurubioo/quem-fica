import { useEffect } from 'react';

// Muda o título da aba do navegador. Leitores de tela também anunciam
// esse título, então cada página deve chamar com um nome próprio.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Quem Fica?` : 'Quem Fica? — Planejar para ninguém ficar para trás';
  }, [title]);
}
