import React, { useState } from "react";

const sections = [
  {
    id: "paketler",
    label: "Paketler",
    items: [
      "Paket Satın Al",
      "Paket Satış Listesi",
      "Paket Yenileme Listesi",
      "Paket İptal Listesi",
    ],
  },
  {
    id: "musteri",
    label: "Müşteri",
    items: ["Müşteriler", "Müşteri Araçları"],
  },
  {
    id: "raporlar",
    label: "Raporlar",
    items: [
      "Toplam Paket Satış",
      "Paket Satış Listesi",
      "Günlük Satış Grafiği",
      "Aylara Göre Satış",
    ],
  },
  {
    id: "diger",
    label: "Diğer",
    items: [
      "Duyurular",
      "Talep Merkezi",
      "Medyalar",
      "Acente Temsilcimiz",
      "Hasar İhbar Hattı",
    ],
  },
];

export default function NavBar({ toggleDarkMode }) {
  const [expandedSections, setExpandedSections] = useState({
    paketler: true,
    musteri: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [section]: !prevExpandedSections[section],
    }));
  };

  return (
    <div className="navbar">
      
      <div className="mode-switch slideThree">
        <input
          type="checkbox"
          value="None"
          id="slideThree"
          name="check"           
          onChange={toggleDarkMode}
        />
        <label htmlFor="slideThree"></label>
      </div>

      {sections.map((section) => (
        <div key={section.id} className={`navbar-inner`}>
          <div
            className="navbar-group"
            onClick={() => toggleSection(section.id)}
          >
            <label className="navbar-group-label">{section.label}</label>
          </div>

          {expandedSections[section.id] && (
            <ul className="navbar-list">
              {section.items.map((item, index) => (
                <li key={index} className="navbar-list-item">
                  <img
                    className="navbar-group-image"
                    src="../images/li-icon.png"
                    alt="Package Icon"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
