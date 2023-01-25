import React from "react";

const Success = ({ message }) => {
  return (
    <p
      style={{
        color: "rgb(34,197,94)",
        // border: "1px solid red",
        // justifyContent: "center",
        // alignItems: "center",
        // marginRight: "auto",
        // marginLeft: "auto",
        // display: "flex",
        padding: "5px",
      }}
    >
      {message}
    </p>
  );
};

export default Success;
