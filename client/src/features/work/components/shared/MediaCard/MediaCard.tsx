import { useRef, useState } from "react";
import Container from "@/components/layout/container/Container.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import styles from "./MediaCard.module.css";

type MediaCardProps = {
  src: string;
  srcSet?: string; // image width variants, with sizes
  sizes?: string;
  type: "image" | "video";
  alt?: string;
  autoPlay?: boolean;
  borderRadius?: string; // Allow the border radius to be customized here as well.
  minHeight?: string;
  maxHeight?: string;
};

export default function MediaCard({
  src,
  srcSet,
  sizes,
  type,
  alt,
  autoPlay = true,
  borderRadius,
  minHeight = "400px",
  maxHeight = "544px",
}: MediaCardProps) {
  const { t } = useI18n();
  const [mediaError, setMediaError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleError = () => {
    setMediaError(true);
  };

  const handleCanPlay = () => {
    // Start autoplay without blocking the UI and avoid unhandled promise warnings.
    if (videoRef.current && autoPlay) {
      videoRef.current.muted = true;
      const p = videoRef.current.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // Browsers may block autoplay; intentionally ignore this error.
        });
      }
    }
  };

  return (
    <Container
      padding="0" // Let the media reach the card edge.
      backgroundColor="transparent"
      borderRadius={borderRadius}
      style={{ minHeight, maxHeight }}
    >
      {mediaError ? (
        <div
          className={styles.mediaFallback}
          role="status"
          aria-live="polite"
          aria-label={alt || t.work.mediaUnavailable}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "#111",
            color: "#fff",
            fontSize: "0.95rem",
            padding: "12px",
          }}
        >
          <p style={{ margin: 0 }}>{t.work.mediaError}</p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1ea7fd", textDecoration: "underline" }}
          >
            {t.work.openInNewTab}
          </a>
        </div>
      ) : type === "video" ? (
        <video
          ref={videoRef}
          className={styles.mediaObject}
          src={src}
          autoPlay={autoPlay}
          muted={autoPlay}
          loop={autoPlay}
          playsInline
          controls
          onError={handleError}
          onCanPlay={handleCanPlay}
        />
      ) : (
        <img
          className={styles.mediaObject}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt || t.work.mediaContent}
          // The project hero: the page's largest paint, fetched first
          fetchPriority="high"
          onError={handleError}
        />
      )}
    </Container>
  );
}
