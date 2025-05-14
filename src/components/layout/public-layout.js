"use client";

import PublicFooter from "../footer/footer";
import Navbar from "../Navbar";
import PublicNavigationBar from "../navbar/PublicNavigation";

function PublicLayout({ children }) {
  return (
    <div>
      <PublicNavigationBar />
      <div> {children} </div>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
