import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAboutData } from "@/features/about/data/useAboutData.ts";
import { useProjectData } from "@/features/work/hooks/useProjectData.ts";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import { headTags, pageMeta } from "./pageMeta.ts";

// Keeps <head> (title, description, canonical, Open Graph) in step with the
// route and the language. The build already wrote these tags per route;
// this updates them as the visitor navigates or switches language.
export default function RouteMeta() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const about = useAboutData();
  const { getAllProjects } = useProjectData();

  useEffect(() => {
    const meta = pageMeta(pathname, { t, about, projects: getAllProjects() });
    for (const { tag, key, attrs, text } of headTags(meta, about.name)) {
      if (tag === "title") {
        document.title = text ?? "";
        continue;
      }
      const [attr, value] = key;
      let element = document.head.querySelector(`${tag}[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement(tag);
        document.head.append(element);
      }
      for (const [name, content] of Object.entries(attrs)) {
        element.setAttribute(name, content);
      }
    }
  }, [pathname, t, about, getAllProjects]);

  return null;
}
