import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import Simulation from '../pages/Simulation/Simulation';
import Impact from '../pages/Impact/Impact';
import Team from '../pages/Team/Team';
import NotFound from '../pages/NotFound/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Todas as páginas usam o mesmo Layout (cabeçalho + rodapé) */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="simulacao" element={<Simulation />} />
        <Route path="impacto" element={<Impact />} />
        <Route path="equipe" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
