import React, { useState } from "react";
import backgroundImage from "./restaurant-bg.jpg"; // Add a restaurant-style image to your project folder
import logo from "./restaurant-logo.png"; // Add a logo to your project folder

function BillScreen({ onConfirm }) {
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState("");

  const foodItems = [
    { name: "Appetizer", price: 20 },
    { name: "Main Course", price: 120 },
    { name: "Dessert", price: 35 },
    { name: "Drinks", price: 30 }
  ];

  const subtotal = foodItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const totalBill = subtotal + tax;

  const predefinedTips = [0, 10, 15, 25];

  const handleConfirmClick = () => {
    if (selectedTip === "custom") {
      const customTipAmount = parseFloat(customTip);
      if (!isNaN(customTipAmount) && customTipAmount >= 0) {
        onConfirm(totalBill, customTipAmount);
      } else {
        alert("Please enter a valid custom tip.");
      }
    } else if (selectedTip !== null) {
      const tipAmount = (totalBill * selectedTip) / 100;
      onConfirm(totalBill, tipAmount);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Courier New, Courier, monospace",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          border: "2px dashed #333",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img src={logo} alt="Restaurant Logo" style={{ height: "60px" }} />
          <h2 style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>Your Bill</h2>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          {foodItems.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}
            >
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <hr style={{ margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Subtotal</strong>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Tax (10%)</strong>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginTop: "8px",
            }}
          >
            <strong>Total</strong>
            <span>${totalBill.toFixed(2)}</span>
          </div>
        </div>

        <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Select Tip Percentage</h3>
        <div style={{ margin: "1rem 0" }}>
</div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {predefinedTips.map((percentage) => (
            <button
              key={percentage}
              onClick={() => setSelectedTip(percentage)}
              style={{
                padding: "12px 20px",
                fontSize: "1.0rem",
                backgroundColor: selectedTip === percentage ? "#2196F3" : "#D3D3D3",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "22%",
              }}
            >
              {percentage}%
            </button>
          ))}
          <button
            onClick={() => setSelectedTip("custom")}
            style={{
              padding: "12px 20px",
              fontSize: "1.0rem",
              backgroundColor: selectedTip === "custom" ? "#2196F3" : "#D3D3D3",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "22%",
            }}
          >
            Custom
          </button>
        </div>

        {selectedTip === "custom" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Enter custom tip"
              style={{
                padding: "10px",
                width: "80%",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        )}

        <button
          onClick={handleConfirmClick}
          disabled={selectedTip === null}
          style={{
            padding: "14px 20px",
            fontSize: "1.25rem",
            backgroundColor: selectedTip !== null ? "#4CAF50" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: selectedTip !== null ? "pointer" : "not-allowed",
            width: "100%",
          }}
        >
          Confirm Tip & Proceed
        </button>
      </div>
    </div>
  );
}

export default BillScreen;
