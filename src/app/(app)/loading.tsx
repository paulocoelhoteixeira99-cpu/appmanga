import Image from "next/image";

export default function AppLoading() {
  return (
    <div
      className="flex flex-col items-center justify-center bg-manga-background-default"
      style={{ minHeight: "100dvh" }}
    >
      {/* Logo — Figma: 160×96 centered, ~40% from top */}
      <Image
        src="/assets/logo-symbol.svg"
        alt="Manga"
        width={100}
        height={96}
        priority
      />

      {/* Text — Figma: Inter 400 16/22, text-primary, centered, 40px below logo */}
      <p
        className="text-manga-text-primary"
        style={{
          marginTop: "40px",
          fontSize: "16px",
          lineHeight: "22px",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Iniciando\u2026
      </p>
    </div>
  );
}
