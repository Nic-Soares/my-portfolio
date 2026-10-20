import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../styles/global.css";
import "../styles/normalize.css";

import NotFound from "@/app/pages/NotFound/NotFound.tsx";
import UnderConstruction from "@/app/pages/UnderConstruction/UnderConstruction.tsx";
import { ThemeProvider } from "@/app/theme/ThemeProvider.tsx";
import NavigationBar from "@/components/layout/NavigationBar/NavigationBar.tsx";
import Sidebar from "@/components/layout/sidebar/Sidebar.tsx";
import TopAppBar from "@/components/layout/TopAppBar/TopAppBar.tsx";
import { AboutPage } from "@/features/about/index.ts";
import { HomePage as Home } from "@/features/home/index.ts";
import { ProjectDetailPage, ProjectListPage } from "@/features/work/index.ts";

// Dev-only component gallery. `import.meta.env.DEV` is false in production
// builds, so the import is dropped and the route never exists there.
const GalleryPage = import.meta.env.DEV
  ? lazy(() => import("@/app/gallery/GalleryPage.tsx"))
  : null;

function SiteShell() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {/* Rail at Large and up; top app bar + navigation bar below (CSS) */}
      <TopAppBar />
      <Sidebar />
      <div id="main-content" className="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/coming-soon" element={<UnderConstruction />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
      <NavigationBar />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {GalleryPage && (
            <Route
              path="/__gallery"
              element={
                <Suspense fallback={null}>
                  <GalleryPage />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<SiteShell />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
