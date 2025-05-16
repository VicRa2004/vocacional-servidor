import { Breadcrumb } from "@/components/Breadcrumb";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ProtectedRoute>
        <Breadcrumb />
        {children}
      </ProtectedRoute>
    );
  }