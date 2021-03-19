import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState((prev) => ({ ...prev, days }));
  // }; // ! keeping for reference purposes for me for later
  const interviewersForDay = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day); //! Should I use day here instead of state.day?
  const appointmentsRender = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const newObj = { ...appointment, interview, interviewersForDay };

    return <Appointment key={appointment.id} {...newObj} />; // ? why can I not add a property to {...newObj, interviewersForDay}
  });

  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise]).then(
      (response) => {
        console.log(response);
        setState((prev) => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }));
      }
    );
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsRender}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
