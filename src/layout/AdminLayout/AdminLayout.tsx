import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOutFireBase } from "@/services/FireBaseAuthApi";
const AdminRoute = () => {
  const { user, role, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/auth/login" />;
  if (role !== "admin") return <Navigate to="/" />;

  function handleLogOut() {
    LogOutFireBase();
  }

  return (
    <div className="container mx-auto h-svh">
      <Button onClick={handleLogOut}>log out {role}</Button>
      <Outlet />
    </div>
  );
};

export default AdminRoute;
