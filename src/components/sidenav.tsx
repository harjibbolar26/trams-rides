import { FaHome } from "react-icons/fa";
import { MdContactSupport, MdDashboard } from "react-icons/md";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const SideNav = () => {
  const pathname = useLocation().pathname;
  return (
    <div>
      <div className="bg-primary">
        <div
          className={`flex flex-col justify-center items-center h-screen gap-5`}
        >
          <Link to={"/"}>
            <FaHome
              size={25}
              style={{ color: pathname === "/" ? "#FFF" : "#000" }}
            //   className="hover:text-hover"
            />
          </Link>
          <Link to={"/dashboard"}>
            <MdDashboard
              size={25}
              style={{ color: pathname === "/dashboard" ? "#FFF" : "#000" }}
            />
          </Link>
          <Link to={"/contact"}>
            <MdContactSupport
              size={25}
              style={{ color: pathname === "/contact" ? "#FFF" : "#000" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
