const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="overflow-hidden h-screen">{children}</main>
    </div>
  );
};

export default LandingLayout;
