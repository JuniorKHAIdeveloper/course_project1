import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        height: "52.5px",
        position: "absolute",
        bottom: "0px",
        left: "0px",
        width: "100%",
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          margin: "0 24px",
          height: "100%",
        }}
      >
        <p style={{ textAlign: "center", margin: "8px 0" }}>
          Всі права захищені ©
        </p>
        <p style={{ textAlign: "center", margin: "8px 0" }}>
          Контакт: a.g.ivanov@student.csn.khai.edu
        </p>
      </div>
    </div>
  );
};

export default Footer;
