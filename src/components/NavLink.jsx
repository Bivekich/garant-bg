import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const bg = isActive ? "bg-[#FF6402]" : "bg-[#363636]";
  const className = `rounded-full text-white text-center text-base h-fit p-3 m-auto ${bg} transition hover:text-white hover:scale-110`;

  return (
    <Link className={className} {...props}>
      {props.children}
    </Link>
  );
};

export default NavLink;
