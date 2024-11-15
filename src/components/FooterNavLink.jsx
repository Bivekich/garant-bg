import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const text = isActive ? "text-[#FF6402]" : "text-white";
  const className = `text-start text-xl font-semibold h-fit w-fit ${text} transition hover:text-[#FF6402] hover:scale-110`;

  return (
    <Link className={className} {...props}>
      {props.children}
    </Link>
  );
};

export default NavLink;
