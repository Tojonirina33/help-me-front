import { localStorageItem } from "@/src/utils/constant";
import { StorageUtils } from "@/src/utils/storageUtils";
import {
  faBars,
  faCog,
  faHeartbeat,
  faQuestionCircle,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const logOut = () => {
    StorageUtils.removeData(localStorageItem.accessToken);
    StorageUtils.removeData(localStorageItem.refreshToken);
    StorageUtils.removeData(localStorageItem.userData);
    // dispatch(
    //   setUserState({
    //     id: "",
    //     username: "",
    //     user_type: "regular_user",
    //     identity: {
    //       id: "",
    //       identity_key: "",
    //       first_name: "",
    //       last_name: "",
    //       sexe: "male",
    //       birth_date: "",
    //       birth_place: "",
    //       address: "",
    //       profession: "",
    //       distinctive_trait: "",
    //       status: "pending",
    //       father: null,
    //       mother: null,
    //     },
    //   })
    // );
    router.push("/login");
  };

  return (
    <aside className="w-[4rem] min-w-[4rem] h-full bg-black flex flex-col justify-between items-center py-4">
      <div className="flex flex-col items-center">
        <p className="">
          <FontAwesomeIcon
            icon={faHeartbeat}
            color="#ffffff"
            className="text-[30px]"
          />
        </p>
        <div className="flex flex-col mt-12">
          <p className="my-2">
            <FontAwesomeIcon
              icon={faBars}
              color="#ffffff"
              className="text-[20px]"
            />
          </p>
          <p className="my-2">
            <FontAwesomeIcon
              icon={faCog}
              color="#ffffff"
              className="text-[20px]"
            />
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="my-2">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            color="#ffffff"
            className="text-[20px]"
          />
        </p>
        <p className="my-2" onClick={logOut}>
          <FontAwesomeIcon
            icon={faSignOut}
            color="#ffffff"
            className="text-[20px]"
          />
        </p>
      </div>
    </aside>
  );
};

export default NavBar;
