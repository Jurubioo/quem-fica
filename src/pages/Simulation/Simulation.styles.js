import styled from 'styled-components';

export const Workspace = styled.section`
  padding-block: 2rem 4rem;
  h2 { font-size: 1.55rem; }
  p { max-width: 75ch; }
`;
export const Controls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  label { display: flex; flex-direction: column; gap: 0.4rem; font-size: 1rem; font-weight: 700; }
  select {
    width: 100%; min-width: 0; min-height: 2.9rem; padding: 0.45rem 0.6rem;
    color: ${({ theme }) => theme.colors.ink}; background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.inkSoft}; border-radius: ${({ theme }) => theme.radius.sm};
    font: inherit; font-weight: 400;
  }
`;
export const Toolbar = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;
  margin-block: 1.25rem;
  p { margin: 0; font-size: 1rem; }
`;
export const TextButton = styled.button`
  min-height: 2.75rem; padding: 0.4rem 0.6rem; background: transparent;
  color: ${({ theme }) => theme.colors.water}; border: 1px solid currentColor;
  border-radius: ${({ theme }) => theme.radius.sm}; font-size: 1rem; cursor: pointer;
  &:hover { background: ${({ theme }) => theme.colors.surfaceAlt}; }
`;
export const Legend = styled.ul`
  display: flex; flex-wrap: wrap; list-style: none; gap: 0.5rem 1.25rem;
  padding: 0; margin: 1rem 0 1.5rem; font-size: 0.95rem;
`;
export const FamilyList = styled.ul`
  list-style: none; padding: 0; margin: 1rem 0 0; display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem;
`;
export const Notice = styled.div`
  padding: 1rem 1.25rem; margin-bottom: 1.25rem;
  background: ${({ theme }) => theme.colors.surfaceAlt}; border-left: 4px solid ${({ theme }) => theme.colors.water};
  p:last-child { margin-bottom: 0; }
`;
export const ResourceDetails = styled.details`
  margin-top: 2rem; padding: 1.25rem; border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}; background: ${({ theme }) => theme.colors.surface};
  summary { cursor: pointer; font-weight: 700; min-height: 2.75rem; }
  h3 { font-size: 1.2rem; margin-top: 1rem; }
  li { margin-bottom: 0.75rem; font-size: 1rem; }
`;
