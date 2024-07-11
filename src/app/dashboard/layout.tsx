"use client";
import { AvatarImg } from "@/src/assets";
import VerifyAuth from "@/src/components/auth/verifyAuth";
import HeaderDashboard from "@/src/components/dashboard/header";
import MenuDashboard from "@/src/components/dashboard/menu";
import NavBar from "@/src/components/dashboard/navbar";
import { useAppDispatch, useAppSelector } from "@/src/redux/reduxHook";
import { isAuth } from "@/src/utils/isAuth";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  if (!isAuth()) {
    router.push("/login");
  }
  
  useEffect(() => {
    if (userData.id) {
      setIsLoading(false);
    }
  }, [userData]);

  if (isLoading) return <div>Loading....</div>;

  return (
    <main className="w-screen h-screen flex flex-row flex">
      <NavBar />
      <MenuDashboard />
      <section className="w-full h-full flex flex-col">
        <HeaderDashboard />
        <div>{children}</div>
      </section>
    </main>
  );
};

export default RootLayout;
