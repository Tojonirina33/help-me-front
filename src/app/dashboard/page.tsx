"use client";
import VerifyAuth from "@/src/components/auth/verifyAuth";
import { useAppDispatch, useAppSelector } from "@/src/redux/reduxHook";
import { setUserState } from "@/src/redux/slices/user.slice";
import { localStorageItem } from "@/src/utils/constant";
import { isAuth } from "@/src/utils/isAuth";
import { StorageUtils } from "@/src/utils/storageUtils";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faHeartbeat,
  faTools,
  faChartBar,
  faDedent,
  faCogs,
  faBars,
  faQuestionCircle,
  faCog,
  faSearch,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { AvatarImg } from "@/src/assets";
import Image from "next/image";
import NavBar from "@/src/components/dashboard/navbar";
import MenuDashboard from "@/src/components/dashboard/menu";

const Dashboard = () => {
  // const router = useRouter();
  // if (!isAuth()) {
  //   router.push("/login");
  // }

  return <div>dashboard</div>;
};

export default VerifyAuth(Dashboard);
