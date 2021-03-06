import React from "react";

// ---------------- Error Component -------------- //

const Error = function (props) {
  return (
    <main
      className="appointment__card appointment__card--error"
      onClick={() => {
        props.onClose();
      }}
    >
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
};

export default Error;
