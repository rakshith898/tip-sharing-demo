import React, { useState } from "react";
import BillScreen from "./BillScreen";
import TipAllocationScreen from "./TipAllocationScreen";
import ThankYouScreen from "./ThankYouScreen";

function App() {
  const [screen, setScreen] = useState("bill"); // 'bill', 'allocation', 'thankyou'
  const [billAmount, setBillAmount] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [tipDetails, setTipDetails] = useState(null);

  const handleBillConfirm = (bill, tip) => {
    setBillAmount(bill);
    setTipAmount(tip);
    setScreen("allocation");
  };

  const handleConfirmAllocation = (details) => {
    setTipDetails(details);
    setScreen("thankyou");
  };

  const handleBack = () => {
    setScreen("bill");
  };

  return (
    <>
      {screen === "bill" && <BillScreen onConfirm={handleBillConfirm} />}
      {screen === "allocation" && (
        <TipAllocationScreen
          tipAmount={tipAmount}
          onBack={handleBack}
          onConfirmAllocation={handleConfirmAllocation}
        />
      )}
      {screen === "thankyou" && (
        <ThankYouScreen
          tipDetails={tipDetails}
          totalTip={tipAmount}
          billAmount={billAmount}
        />
      )}
    </>
  );
}

export default App;
