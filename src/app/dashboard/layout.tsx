export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="px-10 py-10">{children}</main>;
};

export default DashboardLayout;
