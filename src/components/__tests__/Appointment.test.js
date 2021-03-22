import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment/index";

//Note: the it function is an alias to the test function
describe("Appointment", () => {
  //Initial test - ensuring that the component renders
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
