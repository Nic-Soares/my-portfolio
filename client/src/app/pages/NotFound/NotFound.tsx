import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";

// Figma "Error 404": Very sunny with the numeral, Gem and Pill around it
const NotFound = () => (
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
    headline="Page not found"
    supportingText="The link you followed doesn't exist or has moved. Check the address or head back home."
    actions={[
      { label: "Back to home", to: "/" },
      { label: "View projects", to: "/projects" },
    ]}
  />
);

export default NotFound;
