import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";

interface SomethingWentWrongProps {
  // Defaults to reloading the page; the error boundary re-renders instead
  onRetry?: () => void;
}

// Figma "Something Went Wrong": "!" over Burst in the error roles
const SomethingWentWrong = ({
  onRetry = () => window.location.reload(),
}: SomethingWentWrongProps) => {
  const { t } = useI18n();
  return (
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
      headline={t.system.error}
      supportingText={t.system.errorText}
      actions={[
        { label: t.system.tryAgain, onClick: onRetry },
        { label: t.system.backHome, to: "/" },
      ]}
    />
  );
};

export default SomethingWentWrong;
