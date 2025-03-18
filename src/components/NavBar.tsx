import React from "react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { Heart } from "lucide-react";
import { useAuthContext } from "@/context/AuthProvider";
type Props = {};

const NavBar = (props: Props) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <></>;
  }

  return (
    <header className="flex h-12 items-center gap-4 bg-amber-500 dark:bg-gray-800">
      <Heart />
      <h1 className="text-2xl"> supermraket</h1>
      <nav className="flex items-center justify-between gap-2">
        <div className="flex gap-4">
          <NavLink to={"/products"}>products</NavLink>
          <NavLink to={"/Cart"}>cart</NavLink>
        </div>
      </nav>
      {/* <div className="ml-auto flex gap-2">
        <Button variant={"default"}>sign in</Button>
        <Button>sign up</Button>
        <ModeToggle />
      </div> */}
      <div className="ml-auto flex items-center gap-2">
        {user ? (
          <h1 className="">welcome {user.email}</h1>
        ) : (
          <>
            <Button asChild>
              <NavLink to={"/auth/register"}>sign up</NavLink>
            </Button>
            <Button asChild>
              <NavLink to={"/auth/login"}>sign in</NavLink>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default NavBar;
