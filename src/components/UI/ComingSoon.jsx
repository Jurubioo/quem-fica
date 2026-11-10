import styled from 'styled-components';
import { IconTools } from '../Icons/Icons';

// Aviso temporário para as páginas que os outros integrantes vão construir.
// Pode apagar este componente quando todas as páginas estiverem prontas.

const Card = styled.section`
  margin-block: clamp(2.5rem, 6vw, 4rem);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 2px dashed ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};

  h2 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    margin: 0 0 0.5rem;
  }

  ul {
    margin: 1rem 0 0;
    padding-left: 1.25rem;
    display: grid;
    gap: 0.4rem;
  }

  .owner {
    color: ${({ theme }) => theme.colors.inkSoft};
    margin: 0;
  }
`;

export default function ComingSoon({ owner, items = [] }) {
  return (
    <div className="container">
      <Card aria-labelledby="em-construcao">
        <h2 id="em-construcao">
          <IconTools size={28} />
          Em construção
        </h2>
        <p className="owner">{owner}</p>
        {items.length > 0 && (
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
