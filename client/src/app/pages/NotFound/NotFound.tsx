import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";

// Figma "Error 404": Very sunny with the numeral, Gem and Pill around it
const NotFound = () => {
  const { t } = useI18n();
  return (
    <StateLayout
      illustration={
        <StateIllustration
          shape="very-sunny"
          color="primary-container"
          decor={[
            {
              shape: "gem",
              color: "tertiary-container",
              x: 268,
              y: -16,
              size: 96,
            },
            {
              shape: "pill",
              color: "secondary-container",
              x: -22,
              y: 268,
              size: 64,
            },
          ]}
          mark="404"
        />
      }
      headline={t.system.notFound}
      supportingText={t.system.notFoundText}
      actions={[
        { label: t.system.backHome, to: "/" },
        { label: t.system.viewProjects, to: "/projects" },
      ]}
    />
  );
};

export default NotFound;
