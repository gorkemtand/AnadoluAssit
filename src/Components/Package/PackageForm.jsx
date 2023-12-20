import React from "react";

export default function PackageForm({ pricingDetails, onPriceChange }) {
  return (
    <form className="package-form">
      <label>Fiyatlar</label>
      <select
        className="input"
        onChange={(e) => onPriceChange(e.target.selectedIndex)}
      >
        {pricingDetails.map((price, index) => (
          <option key={index}>{price.fiyat}</option>
        ))}
      </select>
      <label>Paket Başlangıç Tarihi</label>
      <input className="input" type="date" />
    </form>
  );
}
