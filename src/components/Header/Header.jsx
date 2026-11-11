import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../../routes/navigation';
import { useAccessibility } from '../../context/AccessibilityContext';
import { IconClose, IconContrast, IconMenu } from '../Icons/Icons';
import Logo from '../UI/Logo';
import {
  A11yBar,
  A11yButton,
  A11yGroup,
  A11yLabel,
  Bar,
  BrandLink,
  MenuButton,
  Nav,
  NavItem,
  NavList,
  SkipLink,
} from './Header.styles';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const {
    fontPercent,
    canIncrease,
    canDecrease,
    increaseFont,
    decreaseFont,
    resetFont,
    highContrast,
    toggleContrast,
  } = useAccessibility();

  // Fecha o menu do celular quando a página muda
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Fecha o menu com a tecla Esc
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>

      <A11yBar aria-label="Opções de acessibilidade">
        <div className="container">
          <A11yGroup role="group" aria-label="Tamanho do texto">
            <A11yLabel aria-hidden="true">Texto</A11yLabel>
            <A11yButton
              type="button"
              onClick={decreaseFont}
              disabled={!canDecrease}
              aria-label="Diminuir o tamanho do texto"
            >
              A−
            </A11yButton>
            <A11yButton
              type="button"
              onClick={resetFont}
              aria-label={`Tamanho padrão do texto. Agora em ${fontPercent}%`}
            >
              A
            </A11yButton>
            <A11yButton
              type="button"
              onClick={increaseFont}
              disabled={!canIncrease}
              aria-label="Aumentar o tamanho do texto"
              $big
            >
              A+
            </A11yButton>
          </A11yGroup>

          <A11yButton type="button" onClick={toggleContrast} aria-pressed={highContrast} $wide>
            <IconContrast size={18} />
            <span>
              <span className="d-none d-sm-inline">Alto </span>Contraste
            </span>
          </A11yButton>
        </div>
      </A11yBar>

      <Bar>
        <div className="container">
          <BrandLink to="/" aria-label="Quem Fica? — ir para a página inicial">
            <Logo />
          </BrandLink>

          <MenuButton
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
            {menuOpen ? 'Fechar' : 'Menu'}
          </MenuButton>

          <Nav id="menu-principal" aria-label="Menu principal" $open={menuOpen}>
            <NavList>
              {navLinks.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavItem as={NavLink} to={to} end={end}>
                    <Icon size={22} />
                    {label}
                  </NavItem>
                </li>
              ))}
            </NavList>
          </Nav>
        </div>
      </Bar>
    </>
  );
}

