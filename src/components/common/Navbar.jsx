import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../../public/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/ApiConnector";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Navbar() {
  const location = useLocation();
  const matchRoute = (path) => {
    return matchPath({ path: path }, location.pathname);
  };

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalitem } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchCategories = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-[#2C333F]">
      <div className="flex w-[90%] max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src="/Logo-Full-Light.png" alt="" width={160} height={42} />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-[#DBDDEA]">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <MdKeyboardArrowDown />
                    <div className="invisible translate-x-[-50%] translate-y-[15%] absolute left-[50%] top-[50%] flex flex-col rounded-md bg-[#F1F2FF] p-4 text-[#000814] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-50">
                      <div className="absolute left-1/2 top-0 h-6 w-6 rotate-45 rounded bg-[#F1F2FF] translate-x-[80%] translate-y-[-45%]"></div>
                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                            className="p-1"
                          >
                            <p className="px-1.5 py-3 rounded-md text-[17px] font-[400] hover:bg-[#C5C7D4]">
                              {subLink?.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-[#FFE83D]"
                          : "text-[#DBDDEA]"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to="/daashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-[#AFB2BF]" />
              {totalitem > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-[#6E5503] text-center text-xs font-bold text-[#E7C009]">
                  {totalitem}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-[#2C333F] bg-[#161D29] px-[12px] py-[8px] text-[#AFB2BF]">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-[#2C333F] bg-[#161D29] px-[12px] py-[8px] text-[#AFB2BF]">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
}
