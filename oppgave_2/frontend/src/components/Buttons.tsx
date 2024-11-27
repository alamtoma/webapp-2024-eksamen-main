import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/css/page.css";

const Buttons = () => {
  const navigate = useNavigate();

  const handleCreateBooking = () => {
    navigate("/booking");
  };

  const handleManageRegistration = () => {
    navigate("/manage-registration");
  };

  return (
    <div className="buttons">
      <button className="button" onClick={handleCreateBooking}>
        Opprett Nytt arrangement
      </button>
      <button className="button" onClick={handleManageRegistration}>
        Adminstrer påmelding
      </button>
    </div>
  );
};

export default Buttons;
