import { Routes, Route } from "react-router-dom";
import { AppShellLayout } from "./layout/AppShellLayout";
import { DashboardPage } from "./pages/Dashboard";
import { PessoasPage } from "./pages/Pessoas";
import { CategoriasPage } from "./pages/Categorias";
import { TransacoesPage } from "./pages/Transacoes";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShellLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/pessoas" element={<PessoasPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/transacoes" element={<TransacoesPage />} />
      </Route>
    </Routes>
  );
}
