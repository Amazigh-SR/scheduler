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
        // console.log(response);
        setState((prev) => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }));
      }
    );
  }, []);

  //Function that finds the number of spots available for a given day
  const numSpotsRemaining = function (day, state) {
    let count = 0;
    const dayAppointArr = state.days.find((oneDay) => oneDay.name === day)
      .appointments;

    for (const id of dayAppointArr) {
      if (!state.appointments[id].interview) {
        count++;
      }
    }
    return count;
  };

  //Function that creates a new days array with the updated # of spots available
  const updateSpots = function (day, state, change) {
    const remainingDaySpots = numSpotsRemaining(day, state);
    const newDaysArr = state.days.map((dayObj) => {
      if (dayObj.name === day) {
        return { ...dayObj, spots: remainingDaySpots + change };
      }
      return dayObj;
    });
    return newDaysArr;
  };

  //bookInterview Function
  const bookInterview = function (id, interview) {
    //Covers both cases - Create (-1 spot) vs Edit (+/- 0)
    const days = state.appointments[id].interview
      ? updateSpots(state.day, state, 0)
      : updateSpots(state.day, state, -1);

    // console.log(id, interview);
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
        setState({ ...state, appointments, days });
      });
  };

  //cancelInterview Function
  const cancelInterview = function (id) {
    const days = updateSpots(state.day, state, 1);
    // console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
