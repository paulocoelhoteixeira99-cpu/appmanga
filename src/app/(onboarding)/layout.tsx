export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-manga-background-default flex flex-col">
      {children}
    </div>
  );
}
