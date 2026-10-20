import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";

interface SomethingWentWrongProps {
  // Defaults to reloading the page; the error boundary re-renders instead
  onRetry?: () => void;
}

// Figma "Something Went Wrong": "!" over Burst in the error roles
const SomethingWentWrong = ({
  onRetry = () => window.location.reload(),
}: SomethingWentWrongProps) => (
  <StateLayout
    illustration={
      <StateIllustration
        shape="burst"
        color="error-container"
        decor={[
          { shape: "diamond", color: "error", x: 270, y: -14, size: 88 },
          {
            shape: "circle",
            color: "secondary-container",
            x: -18,
            y: 272,
            size: 58,
          },
        ]}
        mark="!"
        markColor="on-error-container"
      />
    }
    headline="Something went wrong"
    supportingText="We couldn't load this content right now. Try again in a moment."
    actions={[
      { label: "Try again", onClick: onRetry },
      { label: "Back to home", to: "/" },
    ]}
  />
);

export default SomethingWentWrong;
