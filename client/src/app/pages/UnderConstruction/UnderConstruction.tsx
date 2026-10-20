import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";

// Figma "Under Construction": a cone (Triangle) over Soft boom
const UnderConstruction = () => (
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
    headline="Under construction"
    supportingText="This page is still being built. It'll be here soon — in the meantime, take a look at the projects."
    actions={[
      { label: "Back to home", to: "/" },
      { label: "View projects", to: "/projects" },
    ]}
  />
);

export default UnderConstruction;
