import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthProvider";
import RegisterForm from "@/features/Auth/RegisterForm";
import { LogInFireBase, LogOutFireBase } from "@/services/FireBaseAuthApi";
import React from "react";
import { Outlet } from "react-router";
import NavBar from "@/components/NavBar";
type Props = {};

const AuthLayout = (props: Props) => {

  const {user} = useAuthContext()
  
  return (
    <div className="h-screen flex flex-col">
      <NavBar/>
      <div className="container mx-auto flex-auto">
      <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
