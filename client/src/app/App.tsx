import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../styles/global.css";
import "../styles/normalize.css";

import ErrorBoundary from "@/app/ErrorBoundary/ErrorBoundary.tsx";
import { DelayedFallback, lazyWithFloor } from "@/app/lazyRoute.tsx";
import NotFound from "@/app/pages/NotFound/NotFound.tsx";
import SomethingWentWrong from "@/app/pages/SomethingWentWrong/SomethingWentWrong.tsx";
import UnderConstruction from "@/app/pages/UnderConstruction/UnderConstruction.tsx";
import RouteMeta from "@/app/seo/RouteMeta.tsx";
import { ThemeProvider } from "@/app/theme/ThemeProvider.tsx";
import NavigationBar from "@/components/layout/NavigationBar/NavigationBar.tsx";
import Sidebar from "@/components/layout/Sidebar/Sidebar.tsx";
import TopAppBar from "@/components/layout/TopAppBar/TopAppBar.tsx";
import { AboutPage } from "@/features/about/index.ts";
import { HomePage as Home } from "@/features/home/index.ts";
import ProjectListSkeleton from "@/features/work/components/ProjectList/Skeletons/ProjectListSkeleton.tsx";
import ProjectDetailPage from "@/features/work/pages/ProjectDetailPage/ProjectDetail.page.tsx";
import { I18nProvider, useI18n } from "@/i18n/I18nProvider.tsx";

// Dev-only component gallery. `import.meta.env.DEV` is false in production
// builds, so the import is dropped and the route never exists there.
const GalleryPage = import.meta.env.DEV
  ? lazy(() => import("@/app/gallery/GalleryPage.tsx"))
  : null;

// Code-split: the only page with a designed loading state (Figma "Loading")
const ProjectListPage = lazyWithFloor(
  () => import("@/features/work/pages/ProjectListPage/ProjectList.page.tsx"),
);

function SiteShell() {
  const { t } = useI18n();
  return (
    <>
      <RouteMeta />
      <a href="#main-content" className="skip-link">
        {t.layout.skipToContent}
      </a>
      {/* Rail at Large and up; top app bar + navigation bar below (CSS) */}
      <TopAppBar />
      <Sidebar />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/projects"
              element={
                <Suspense
                  fallback={
                    <DelayedFallback>
                      <ProjectListSkeleton />
                    </DelayedFallback>
                  }
                >
                  <ProjectListPage />
                </Suspense>
              }
            />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/coming-soon" element={<UnderConstruction />} />
            <Route path="/404" element={<NotFound />} />
            {/* Dev-only, for reviewing the 500 state */}
            {import.meta.env.DEV && (
              <Route path="/error" element={<SomethingWentWrong />} />
            )}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <NavigationBar />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
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
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
