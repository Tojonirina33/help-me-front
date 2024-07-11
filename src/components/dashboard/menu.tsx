import { AvatarImg } from "@/src/assets";
import { useAppSelector } from "@/src/redux/reduxHook";
import Image from "next/image";
import Link from "next/link";

const MenuDashboard = () => {
  const userData = useAppSelector((state) => state.user);
  return (
    <section className="w-[300px] min-w-[300px] h-full bg-grey-bg flex flex-col items-center px-2">
      <div className="w-full flex flex-col items-center mt-8">
        <p className="w-[80px] h-[80px] box-border transition-all">
          <Image
            src={AvatarImg}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </p>
        <h1 className="text-center text-lg text-black-text font-bold mt-2">
          {userData.identity.first_name} {userData.identity.last_name}{" "}
        </h1>
        <p className="text-center text-md text-grey-text">Doctor</p>
      </div>
      <ul className="w-full mt-4 text-black-text flex flex-col items-start">
        <Link href={'/dashboard/register-user'} className="my-1 hover:cursor-pointer hover:scale-105 hover:text-primary hover:ml-1 transition-all">
          Ajouter une personne
        </Link>
        <Link href={'/dashboard/historical'} className="my-1 hover:cursor-pointer hover:scale-105 hover:text-primary hover:ml-1 transition-all">
          Historique
        </Link>
      </ul>
    </section>
  );
};

export default MenuDashboard;
