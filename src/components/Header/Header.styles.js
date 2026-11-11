import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const lg = ({ theme }) => theme.breakpoints.lg;

/* Link "Pular para o conteúdo": só aparece quando recebe foco pelo teclado */
export const SkipLink = styled.a`
  position: absolute;
  left: 1rem;
  top: -100px;
  z-index: 2000;
  padding: 0.85rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
  text-decoration: none;

  &:focus {
    top: 0.75rem;
  }
`;

/* ---------- Barra de acessibilidade (faixa escura no topo) ---------- */

export const A11yBar = styled.section`
  background: ${({ theme }) => theme.colors.night};
  color: ${({ theme }) => theme.colors.onDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;

    @media (min-width: 576px) {
      justify-content: flex-end;
    }
    padding-block: 0.4rem;
  }
`;

export const A11yGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

export const A11yLabel = styled.span`
  font-size: 0.95rem;
  margin-right: 0.25rem;
  color: ${({ theme }) => theme.colors.onDarkSoft};
`;

export const A11yButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-width: 2.6rem;
  min-height: 2.4rem;
  padding: 0 ${({ $wide }) => ($wide ? '0.9rem' : '0.5rem')};
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.onDark};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: ${({ $big }) => ($big ? '1.05rem' : '0.95rem')};
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.14);
    border-color: #fff;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &[aria-pressed='true'],
  &[aria-pressed='true']:hover {
    background: ${({ theme }) => theme.colors.waterLight};
    border-color: ${({ theme }) => theme.colors.waterLight};
    color: #14202B;
  }
`;

/* ---------- Barra principal com logo e menu ---------- */

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1030;
  background: ${({ theme }) => theme.colors.headerBg};
  backdrop-filter: saturate(1.4) blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  .container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 4.75rem;
  }
`;

export const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0 1.1rem;
  border: 2px solid ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;

  @media (min-width: ${lg}) {
    display: none;
  }
`;

export const Nav = styled.nav`
  /* Celular: menu vira um painel abaixo da barra */
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.lift};

  @media (min-width: ${lg}) {
    display: block;
    position: static;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  @media (min-width: ${lg}) {
    flex-direction: row;
    gap: 0.25rem;
  }
`;

const activeStyle = css`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.ink};
  box-shadow: inset 0 -3px 0 ${({ theme }) => theme.colors.water};
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 3.25rem;
  padding: 0 1.15rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.ink};
    text-decoration: underline;
  }

  /* NavLink coloca aria-current="page" no link da página atual */
  &[aria-current='page'],
  &[aria-current='page']:hover {
    ${activeStyle}
    text-decoration: none;
  }

  @media (min-width: ${lg}) {
    min-height: 2.9rem;
    font-size: 1.05rem;
  }
`;
