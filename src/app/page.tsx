"use client";
import { redirect, useRouter } from "next/navigation";
import { isAuth } from "../utils/isAuth";

export default function Home() {
  const router = useRouter();
  if (isAuth()) {
    return router.push("/dashboard");
  } else {
    
  }
  return router.push("/login");
  return <div>{process.env.API_BASE_URL}</div>;
}
