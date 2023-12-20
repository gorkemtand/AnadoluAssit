import React, { useState } from "react";
import SideBar from "./SideBar";

export default function PackageSpec({
  title,
  description,
  fiyat,
  includedHeaders,
  excluded,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="package-specs">
      <h2>{title}</h2>
      <p className="package-specs-description">{description}</p>
      <p className="package-specs-price">{fiyat},00₺</p>
      <ul className="package-specs-list">
        {includedHeaders &&
          includedHeaders.map((header, index) => (
            <li key={index}>
              {header.header || header}
              <img
                className="package-specs-list-check"
                src="../images/check.png"
                alt="check-icon"
              />
            </li>
          ))}
      </ul>
      <button className="btn btn-info" onClick={openSidebar}>
        Paket Detayları
      </button>

      {isSidebarOpen && (
        <SideBar
          includedHeaders={includedHeaders}
          excluded={excluded}
          onClose={closeSidebar}
        />
      )}
    </div>
  );
}
