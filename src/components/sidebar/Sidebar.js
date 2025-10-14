import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartBar,
  FaPaintBrush,
  FaBoxOpen,
  FaUsers,
  FaBlog,
} from "react-icons/fa";

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/main/overview", icon: <FaChartBar />, label: "Overview" },
    { href: "/main/products", icon: <FaPaintBrush />, label: "Products" },
    { href: "/main/orders", icon: <FaBoxOpen />, label: "Orders" },
    { href: "/main/users", icon: <FaUsers />, label: "Users" },
    { href: "/main/blog", icon: <FaBlog />, label: "Blog" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="btn btn-sm btn-outline-secondary" onClick={onToggle}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <Nav className="flex-column p-3">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.href}
            as={Link}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}
