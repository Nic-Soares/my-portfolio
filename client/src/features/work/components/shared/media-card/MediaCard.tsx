import { useState, useRef } from "react";
import Container from "@/components/layout/container/Container";
import styles from "./MediaCard.module.css";

type MediaCardProps = {
  src: string;
  type: "image" | "video";
  alt?: string;
  autoPlay?: boolean;
  borderRadius?: string; // Permitir customizar borda aqui também
  minHeight?: string;
  maxHeight?: string;
};

export default function MediaCard({
  src,
  type,
  alt,
  autoPlay = true,
  borderRadius,
  minHeight = "400px",
  maxHeight = "544px",
}: MediaCardProps) {
  const [mediaError, setMediaError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleError = () => {
    setMediaError(true);
  };

  const handleCanPlay = () => {
    // tenta iniciar o autoplay sem bloquear a UI; evita warning de promise não tratada
    if (videoRef.current && autoPlay) {
      videoRef.current.muted = true;
      const p = videoRef.current.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // Autoplay pode ser bloqueado pelo navegador; silenciamos o erro intencionalmente
        });
      }
    }
  };

  return (
    <Container
      padding="0" // Sem padding para a mídia encostar na borda
      backgroundColor="transparent"
      borderRadius={borderRadius}
      style={{ minHeight, maxHeight }}
    >
      {mediaError ? (
        <div
          className={styles.mediaFallback}
          role="status"
          aria-live="polite"
          aria-label={alt || "Mídia indisponível"}
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
          <p style={{ margin: 0 }}>Não foi possível carregar a mídia.</p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1ea7fd", textDecoration: "underline" }}
          >
            Abrir em nova aba
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
          alt={alt || "Media content"}
          onError={handleError}
        />
      )}
    </Container>
  );
}
