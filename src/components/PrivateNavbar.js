import Link from "next/link";

const PrivateNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/private/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/private/profile">Profile</Link>
        </li>
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PrivateNavbar;
