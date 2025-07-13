import React, { useState } from "react";

function ThankYouScreen({ tipDetails, totalTip, billAmount }) {
  const [receiptOption, setReceiptOption] = useState("");

  const handleReceiptChoice = (option) => {
    setReceiptOption(option);
    if (option === "print") window.print();
  };

  const totalAmount = billAmount + totalTip;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "'Courier New', monospace",
      }}
    >
      <h2>Thank You for Your Payment!</h2>
      <p>We appreciate your visit and hope to serve you again soon!</p>

      <div style={{ margin: "2rem 0" }}>
        <h3>Receipt Summary</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "1rem", textAlign: "left", margin: "0 auto", maxWidth: "300px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Bill Amount</span>
            <span>${billAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Tip</span>
            <span>${totalTip.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "1px dashed #ccc", paddingTop: "6px" }}>
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <h3>How would you like your receipt?</h3>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", margin: "1rem 0" }}>
        {["print", "email", "SMS", "no receipt"].map((option) => (
          <button
            key={option}
            onClick={() => handleReceiptChoice(option)}
            style={{
              padding: "10px 16px",
              fontSize: "1.0rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: receiptOption === option ? "#2196F3" : "#D3D3D3",
              color: "#fff",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={() => window.location.reload()}
        disabled={!receiptOption}
        style={{
          marginTop: "2rem",
          padding: "12px 20px",
          fontSize: "16px",
          backgroundColor: receiptOption ? "#4CAF50" : "#ccc",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: receiptOption ? "pointer" : "not-allowed",
          width: "100%",
        }}
      >
        Done
      </button>
    </div>
  );
}

export default ThankYouScreen;
