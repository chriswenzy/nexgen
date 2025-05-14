"use client";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/qompass-logo.png";
import { PiBuildingsFill } from "react-icons/pi";
import { TbClock24, TbPigMoney } from "react-icons/tb";
import { RiDashboardFill, RiSettings4Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiUsers } from "react-icons/hi2";
import { AiFillFund } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdVoiceChat } from "react-icons/md";
function SideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const adminItems = [
    {
      to: "/main/dashboard",
      icon: <RiDashboardFill className="sidebar-icon" />,
      text: "Dashboard",
    },
    {
      to: "/main/users",
      icon: <HiUsers className="sidebar-icon" />,
      text: "Users",
    },
    {
      to: "/main/crowdfunding",
      icon: <AiFillFund className="sidebar-icon" />,
      text: "Crowdfunding",
    },

    {
      to: "/main/investment",
      icon: <TbClock24 className="sidebar-icon" />,
      text: "Investments",
    },

    {
      to: "/main/savings",
      icon: <FaMoneyCheck className="sidebar-icon" />,
      text: "Savings",
    },

    {
      to: "/main/transaction",
      icon: <FaMoneyBillTransfer className="sidebar-icon" />,
      text: "Transaction",
    },

    {
      to: "/main/settings",
      icon: <RiSettings4Line className="sidebar-icon" />,
      text: "Settings",
    },

    {
      to: "/main/support",
      icon: <MdVoiceChat className="sidebar-icon" />,
      text: "Support",
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
          <Link href="/">
            <Image src={logo} className="img-fluid" alt="application logo" />
          </Link>
        </div>
        <div className="sidebar-toggle shadow" id="m-tog" onClick={toggleMenu}>
          <div className="text-center mt-1 p-1  h3">
            <GiHamburgerMenu />
          </div>
        </div>
        <div className="mt-5"></div>
        {adminItems.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={
              pathname === item.to || pathname.startsWith(item.to)
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
export default SideBar;
