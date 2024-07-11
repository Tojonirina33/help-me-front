"use client";
import { usePathname } from "next/navigation";

interface AuthContainerProps {
  children: React.ReactNode;
}
const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  const pathname = usePathname();
  if( pathname === "/signup") console.log("signup");
  
  return (
    <div
      className="transition-all flex flex-row max-w-[940px] w-[80%] bg-primary min-h-[580px] p-2 rounded-xxxl bg-white"
      style={{
        background: pathname === '/signup' ? 
          "linear-gradient(270deg, #FFFFFF 0%,#F0EEF6 90%, #F0EEF6 100%)" :
          "linear-gradient(90deg, #FFFFFF 0%,#F0EEF6 90%, #F0EEF6 100%)",
      }}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
