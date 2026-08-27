import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../styles/global.css";
import "../styles/normalize.css";

import NotFound from "@/app/pages/NotFound/NotFound.tsx";
import UnderConstruction from "@/app/pages/UnderConstruction/UnderConstruction.tsx";
import Sidebar from "@/components/layout/sidebar/Sidebar.tsx";
import { HomePage as Home } from "@/features/home/index.ts";
import { ProjectDetailPage, ProjectListPage } from "@/features/work/index.ts";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/coming-soon" element={<UnderConstruction />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
