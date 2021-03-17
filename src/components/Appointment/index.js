import React from "react";
import "components/Appointment/styles.scss";

const Appointment = function (props) {
  return <article className="appointment">{props.time}</article>;
};

export default Appointment;
