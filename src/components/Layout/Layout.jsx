import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const isFirstRender = useRef(true);

  // Ao trocar de página: volta ao topo e leva o foco para o conteúdo,
  // para quem navega por teclado ou leitor de tela não ficar "perdido" no menu.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <Page>
      <Header />
      <Main id="conteudo" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </Main>
      <Footer />
    </Page>
  );
}
