import { Link, useLocation } from "react-router-dom";

const Navbar = ({ width }: { width: string }) => {
  const pathname = useLocation().pathname;
  return (
    <div>
      <nav className={`m-3`} style={{ width: `${width}` }}>
        <ul className="flex justify-between items-center list-none">
          <li className="text-lg tracking-widest">
            <Link
              to={"/"}
              className="text-gradient hover:text-gradient-reverse"
            >
              Trams Rides
            </Link>
          </li>
          <li>
            <button className="bg-primary text-white hover:bg-hover hover:text-primary p-2 rounded-lg transition-all duration-300">
              <Link
                to={
                  pathname === "/dashboard"
                    ? "/contact"
                    : pathname === "/contact"
                    ? "/"
                    : "/dashboard"
                }
              >
                {pathname === "/dashboard"
                  ? "Contact"
                  : pathname === "/contact"
                  ? "Home"
                  : "Dashboard"}
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
