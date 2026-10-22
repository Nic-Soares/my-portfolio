import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";

// Figma "Under Construction": a cone (Triangle) over Soft boom
const UnderConstruction = () => {
  const { t } = useI18n();
  return (
    <StateLayout
      illustration={
        <StateIllustration
          shape="soft-boom"
          color="secondary-container"
          decor={[
            { shape: "triangle", color: "primary", x: 81, y: 87, size: 178 },
            {
              shape: "gem",
              color: "primary-container",
              x: 272,
              y: -10,
              size: 84,
            },
            {
              shape: "circle",
              color: "tertiary-container",
              x: -18,
              y: 272,
              size: 58,
            },
          ]}
        />
      }
      headline={t.system.underConstruction}
      supportingText={t.system.underConstructionText}
      actions={[
        { label: t.system.backHome, to: "/" },
        { label: t.system.viewProjects, to: "/projects" },
      ]}
    />
  );
};

export default UnderConstruction;
