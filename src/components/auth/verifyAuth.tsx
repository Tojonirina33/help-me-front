'use client';
import { isAuth } from "@/src/utils/isAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      if (isAuth()) {
        setIsAuthenticated(true);
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    }, [router]);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
  return Wrapper;
};

export default VerifyAuth;
