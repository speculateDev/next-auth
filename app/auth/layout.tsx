export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#38bdf8_0%,_#1d4ed8_100%)]">
      {children}
    </div>
  );
}
