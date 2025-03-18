import { useAuthContext } from "@/context/AuthProvider";
import React from "react";
import { Navigate, Outlet } from "react-router";
type Props = {};

const ProtectedRoute = (props: Props) => {
  const { loading, user } = useAuthContext();

  if (loading) return <p>loading</p>;

  return user ? (
    <Outlet/>
  ) : (
    <Navigate to={"auth/login"} replace />
  );
};

export default ProtectedRoute;
