import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/qompass-logo.png";
import { Image } from "react-bootstrap";
import { PiBuildingsFill } from "react-icons/pi";
import { SlPicture } from "react-icons/sl";
import { HiSaveAs } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TbClock24, TbUsers } from "react-icons/tb";
import { LuMessagesSquare } from "react-icons/lu";
import { RiSettings4Line } from "react-icons/ri";

function BuyerSideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const buyerItems = [
    {
      to: "/buyer-overview",
      icon: <SlPicture className="sidebar-icon" />,
      text: "Overview",
    },

    {
      to: "/saved-searches",
      icon: <HiSaveAs className="sidebar-icon" />,
      text: "Saved Searches",
    },
    {
      to: "/auth-favorite",
      icon: <FaRegHeart className="sidebar-icon" />,
      text: "Favorite Properties",
    },
    {
      to: "/auth-properties",
      icon: <PiBuildingsFill className="sidebar-icon" />,
      text: "My Properties",
    },

    {
      to: "/auth-find-agent",
      icon: <FiSearch className="sidebar-icon" />,
      text: "Search Agents",
    },

    {
      to: "/auth-recommend-agent",
      icon: <TbUsers className="sidebar-icon" />,
      text: "Recommended Agents",
    },
    {
      to: "/auth-messages",
      icon: <LuMessagesSquare className="sidebar-icon" />,
      text: "Messages",
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
        {buyerItems.map((item) => (
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
export default BuyerSideBar;
