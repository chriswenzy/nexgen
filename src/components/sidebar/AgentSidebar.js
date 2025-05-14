import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidDashboard } from "react-icons/bi";
import logo from "../../assets/qompass-logo.png";
import { Image } from "react-bootstrap";
import { PiBuildingsFill } from "react-icons/pi";
import { LuMessagesSquare } from "react-icons/lu";
import { TbClock24 } from "react-icons/tb";
import { RiSettings4Line } from "react-icons/ri";

function AgentSideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const agentItems = [
    {
      to: "/auth-properties",
      icon: <PiBuildingsFill className="sidebar-icon" />,
      text: "My Listings",
    },
    {
      to: "/auth-messages",
      icon: <LuMessagesSquare className="sidebar-icon" />,
      text: "Messages",
    },
    {
      to: "/auth-request",
      icon: <BiSolidDashboard className="sidebar-icon" />,
      text: "Requests",
    },

    {
      to: "/help-center",
      icon: <TbClock24 className="sidebar-icon" />,
      text: "Help Center",
    },

    {
      to: "/settings",
      icon: <RiSettings4Line className="sidebar-icon" />,
      text: "Settings",
    },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <aside
        className="sidebar shadow"
        style={{ left: showMenu ? "0" : "-390px" }}
      >
        <div className="text-center py-1">
          <Link to="/">
            <Image src={logo} className="img-fluid" />
          </Link>{" "}
        </div>
        <div className="sidebar-toggle shadow" id="m-tog" onClick={toggleMenu}>
          <div className="text-center mt-1 p-1  h3">
            <GiHamburgerMenu />
          </div>
        </div>
        <div className="mt-5"></div>
        {agentItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={
              location.pathname === item.to
                ? "admin-active-side admin-sidebar-link"
                : "admin-sidebar-link"
            }
          >
            <span className="m-2 fw-bold">{item.icon}</span>
            {item.text}
          </Link>
        ))}
      </aside>
    </>
  );
}
export default AgentSideBar;
