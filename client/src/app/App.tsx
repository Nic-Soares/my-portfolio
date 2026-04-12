import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/normalize.css";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import { HomePage as Home } from "@/features/home";
import { ProjectListPage, ProjectDetailPage } from "@/features/work";
import NotFound from "@/app/pages/NotFound/NotFound";
import UnderConstruction from "@/app/pages/UnderConstruction/UnderConstruction";

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
