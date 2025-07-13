import React, { useState } from "react";
import backgroundImage from "./restaurant-bg.jpg";
import logo from "./restaurant-logo.png";

function TipAllocationScreen({ tipAmount, onBack, onConfirmAllocation }) {
  const [allocations, setAllocations] = useState({
    server: 33,
    kitchen: 33,
    bar: 34,
  });

  const [allocationType, setAllocationType] = useState("even");
  const [signature, setSignature] = useState("");

  const total = Object.values(allocations).reduce((a, b) => a + b, 0);
  const isValid = total === 100 && signature.trim().length > 0;

  const handleChange = (role, value) => {
    let newValue = parseInt(value, 10);
    const totalWithoutRole = total - allocations[role];
    if (totalWithoutRole + newValue <= 100) {
      setAllocations(prev => ({
        ...prev,
        [role]: newValue,
      }));
    }
  };

  const handleAllocationTypeChange = (type) => {
    setAllocationType(type);
    if (type === "server") {
      setAllocations({ server: 100, kitchen: 0, bar: 0 });
    } else if (type === "even") {
      setAllocations({ server: 33, kitchen: 33, bar: 34 });
    } else {
      setAllocations({ server: 50, kitchen: 30, bar: 20 });
    }
  };

  const handleConfirm = () => {
    const totalTip = {
      server: (tipAmount * allocations.server) / 100,
      kitchen: (tipAmount * allocations.kitchen) / 100,
      bar: (tipAmount * allocations.bar) / 100,
    };
    const tipDetails = {
      server: totalTip.server.toFixed(2),
      kitchen: totalTip.kitchen.toFixed(2),
      bar: totalTip.bar.toFixed(2),
    };
    onConfirmAllocation(tipDetails);
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
          position: "relative",
        }}
      >
        <button
          onClick={onBack}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "8px",
            cursor: "pointer",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
          title="Go back"
        >
          ←
        </button>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img src={logo} alt="Restaurant Logo" style={{ height: "60px" }} />
          <h2 style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>Tip Allocation</h2>
        </div>

        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Total Tip: ${tipAmount.toFixed(2)}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            marginBottom: "1rem",
          }}
        >
          {["server", "even", "custom"].map((type) => (
            <button
              key={type}
              onClick={() => handleAllocationTypeChange(type)}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: allocationType === type ? "#2196F3" : "#D3D3D3",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "30%",
                textTransform: "capitalize",
              }}
            >
              {type} Split
            </button>
          ))}
        </div>

        {Object.keys(allocations).map((role) => (
          <div key={role} style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontWeight: "bold" }}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={allocations[role]}
              onChange={(e) => handleChange(role, e.target.value)}
              disabled={allocationType !== "custom"}
              style={{
                width: "100%",
                marginBottom: "0.5rem",
                cursor: allocationType !== "custom" ? "not-allowed" : "pointer",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{allocations[role]}%</span>
              <span>${((tipAmount * allocations[role]) / 100).toFixed(2)}</span>
            </div>
          </div>
        ))}

        <p style={{ marginBottom: "1rem" }}>
          Total Allocation: {total}% {total === 100 ? "✅" : "❌ (Must equal 100%)"}
        </p>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: "bold" }}>Digital Signature:</label>
          <input
            type="text"
            placeholder="Sign your name here"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1.0rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem", color: "#666" }}>
            By signing above, I agree to pay the above total amount according to the card issuer agreement.
          </p>
        </div>

        <button
          disabled={!isValid}
          onClick={handleConfirm}
          style={{
            padding: "12px 20px",
            fontSize: "1.20rem",
            backgroundColor: isValid ? "#4CAF50" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: isValid ? "pointer" : "not-allowed",
            width: "100%",
          }}
        >
          Confirm Allocation
        </button>
      </div>
    </div>
  );
}

export default TipAllocationScreen;
