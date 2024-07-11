"use client";
import AuthContainer from "@/src/components/auth/authContainer";
import SplashScreenContainer from "@/src/components/auth/splashScreenContainer";
import { isAuth } from "@/src/utils/isAuth";
import { useRouter } from "next/navigation";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  if (isAuth()) {
    return router.push("/dashboard");
  }

  return (
    <main className="w-full min-h-screen bg-grey-bg flex flex-row items-center justify-center">
      <AuthContainer>
        {children}
      </AuthContainer>
    </main>
  );
};

export default RootLayout;
