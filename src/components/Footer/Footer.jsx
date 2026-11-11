import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { navLinks } from '../../routes/navigation';
import { IconPhone } from '../Icons/Icons';
import Logo from '../UI/Logo';

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.night};
  color: ${({ theme }) => theme.colors.onDark};
  padding-block: 3.5rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  a {
    color: ${({ theme }) => theme.colors.onDark};
  }
`;

const Tagline = styled.p`
  margin: 1rem 0 0;
  color: ${({ theme }) => theme.colors.onDarkSoft};
  max-width: 32ch;
`;

const Heading = styled.h2`
  font-size: 1.05rem;
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.waterLight};
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;

  a {
    display: inline-block;
    padding-block: 0.15rem;
  }
`;

const Emergency = styled.div`
  display: grid;
  gap: 0.6rem;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.35rem;
    color: ${({ theme }) => theme.colors.waterLight};
  }
`;

const Bottom = styled.div`
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.98rem;
  color: ${({ theme }) => theme.colors.onDarkSoft};

  p {
    max-width: none;
    margin: 0 0 0.4rem;
  }
`;

export default function Footer() {
  return (
    <Wrap>
      <div className="container">
        <div className="row gy-5 gx-4">
          <div className="col-12 col-lg-5">
            <Logo light />
            <Tagline>Planejar para ninguém ficar para trás.</Tagline>
          </div>

          <nav className="col-12 col-sm-6 col-lg-3" aria-label="Menu do rodapé">
            <Heading>Páginas</Heading>
            <LinkList>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </LinkList>
          </nav>

          <div className="col-12 col-sm-6 col-lg-4">
            <Heading>Em uma emergência real</Heading>
            <Emergency>
              <p>
                <IconPhone size={20} />
                <span>
                  <strong>199</strong> Defesa Civil
                </span>
              </p>
              <p>
                <IconPhone size={20} />
                <span>
                  <strong>193</strong> Bombeiros
                </span>
              </p>
            </Emergency>
          </div>
        </div>

        <Bottom>
          <p>
            Protótipo acadêmico · Global Solution FIAP 2026/2 · CitizenTech.
          </p>
          <p>
            As famílias e os cenários são fictícios. Os resultados são estimativas e não substituem as
            orientações da Defesa Civil.
          </p>
        </Bottom>
      </div>
    </Wrap>
  );
}
