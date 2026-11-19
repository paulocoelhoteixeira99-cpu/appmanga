import Image from "next/image";

/**
 * E01 · Splash — Figma: 360×800
 * Background: rgb(241,240,243) — manga-background-default
 * Logo: centralizado, y=320 no frame
 * "Iniciando…": y=456, centralizado, 16/400, fill=rgb(35,25,56)
 * Gap logo→texto: 40px
 */
export default function Loading() {
  return (
    <div
      className="flex flex-col items-center justify-center bg-manga-background-default"
      style={{ minHeight: "100dvh" }}
    >
      <Image
        src="/assets/logo-gradient.svg"
        alt="Manga"
        width={160}
        height={37}
        priority
      />
      <p
        className="text-manga-text-primary"
        style={{
          marginTop: "40px",
          fontSize: "16px",
          lineHeight: "22px",
          fontWeight: 400,
        }}
      >
        Iniciando…
      </p>
    </div>
  );
}
