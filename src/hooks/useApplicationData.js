import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function () {
  //Information related to the state of our application
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // API calls to fetch required data
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

  //bookInterview Function
  const bookInterview = function (id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState({ ...state, appointments });
      }); //! include .catch
  };

  //cancelInterview Function
  const cancelInterview = function (id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
    }); //! include .catch
  };
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
