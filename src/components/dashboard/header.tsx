import { AvatarImg } from "@/src/assets";
import { useAppSelector } from "@/src/redux/reduxHook";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const HeaderDashboard = () => {
    
  const userData = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-row justify-between items-center w-full px-8 py-4">
      <div>
        <h1 className="text-lg font-bold text-black-text">
          Bonjour, {userData.identity.first_name} {userData.identity.last_name}
        </h1>
      </div>
      <ul className="flex flex-row items-center">
        <li className="border border-grey-text rounded-full px-[5px] mx-1">
          <FontAwesomeIcon icon={faSearch} className="text-black-text" />
        </li>
        <li className="border border-grey-text rounded-full px-[5px] mx-2">
          <FontAwesomeIcon icon={faBell} className="text-black-text" />
        </li>
        <li className="w-[30px] h-[30px] box-border transition-all mx-1">
          <Image
            src={AvatarImg}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </li>
      </ul>
    </div>
  );
};

export default HeaderDashboard;
