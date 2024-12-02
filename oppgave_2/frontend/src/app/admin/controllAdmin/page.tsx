"use client"
import React, { useState } from "react";

const AdminRegistrations = () => {
  // State for påmeldinger
  const [registrations, setRegistrations] = useState([
    { name: "Karl Andersen", email: "karl@example.com", status: "Venter" },
    { name: "Mari Hansen", email: "mari@example.com", status: "Venter" },
  ]);

  // State for det nye manuelle skjemaet
  const [newRegistration, setNewRegistration] = useState({
    name: "",
    email: "",
  });

  // Håndter inputendringer for det manuelle skjemaet
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRegistration({ ...newRegistration, [name]: value });
  };

  // Legg til ny påmelding
  const handleAddRegistration = (e) => {
    e.preventDefault();
    if (newRegistration.name && newRegistration.email) {
      setRegistrations((prev) => [
        ...prev,
        { ...newRegistration, status: "Venter" },
      ]);
      setNewRegistration({ name: "", email: "" });
    } else {
      alert("Vennligst fyll inn både navn og e-post!");
    }
  };

  // Håndter statusoppdatering (Godkjenn eller Avvis)
  const handleStatusChange = (index, status) => {
    setRegistrations((prev) =>
      prev.map((reg, i) =>
        i === index ? { ...reg, status: status } : reg
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Administrasjon av påmeldinger</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Email</th>
            <th>Status</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, index) => (
            <tr key={index}>
              <td>{reg.name}</td>
              <td>{reg.email}</td>
              <td>{reg.status}</td>
              <td>
                <button
                  onClick={() => handleStatusChange(index, "Godkjent")}
                  disabled={reg.status === "Godkjent"}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    marginRight: "5px",
                  }}
                >
                  Godkjenn
                </button>
                <button
                  onClick={() => handleStatusChange(index, "Avvist")}
                  disabled={reg.status === "Avvist"}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginRight: "5px",
                  }}
                >
                  Avvis
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Legg til Manuell Påmelding</h3>
      <form onSubmit={handleAddRegistration}>
        <label>
          Navn:
          <input
            type="text"
            name="name"
            value={newRegistration.name}
            onChange={handleInputChange}
            required
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newRegistration.email}
            onChange={handleInputChange}
            required
            style={{ marginLeft: "10px", marginTop: "10px" }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            backgroundColor: "blue",
            color: "white",
            padding: "5px 10px",
          }}
        >
          Legg til påmelding
        </button>
      </form>
    </div>
  );
};

export default AdminRegistrations;
