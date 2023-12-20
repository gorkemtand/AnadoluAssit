export default function SideBar({
  includedHeaders,
  excluded,
  onClose,
  darkMode,
}) {
  const lightModeStyles = {
    backgroundColor: "#f1efef",
    color: "#000", // Adjust text color for light mode
  };

  const darkModeStyles = {
    backgroundColor: "#5a5a5a",
    color: "#fff", // Adjust text color for dark mode
  };

  // Use the appropriate styles based on the current mode
  const sidebarStyles = darkMode ? darkModeStyles : lightModeStyles;
  return (
    <div className="sidebar" style={sidebarStyles}>
      <button className="close-button" onClick={onClose}>
        <img
          src="../images/close-btn.png"
          alt="close-button"
          className="close-btn"
        />
      </button>

      {includedHeaders.map((item, index) => (
        <li className="included-item sidebar-item" key={index}>
          <img
            className="sidebar-check"
            src="../images/check.png"
            alt="check-icon"
          />
          {item.header}
          {item.extra && (
            <ul className="sidebar-extra">
              {item.extra.map((extraItem, extraIndex) => (
                <li key={extraIndex} className="extra-item">
                  {extraItem}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      {excluded &&
        excluded.map((excludedItem, index) => (
          <li key={index} className="excluded-item sidebar-item">
            <img
              className="sidebar-check"
              src="../images/cross.png"
              alt="cross-icon"
            />
            {excludedItem}
          </li>
        ))}
    </div>
  );
}
