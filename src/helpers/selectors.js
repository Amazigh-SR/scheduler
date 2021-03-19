const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [2],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },

  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },
};

const getAppointmentsForDay = function (state, day) {
  //Get appointments array for a given day
  const appointmentsForDay = state.days.find((dayObj) => day === dayObj.name)
    ? state.days
        .find((dayObj) => day === dayObj.name)
        .appointments.map((element) => state.appointments[element])
    : [];

  return appointmentsForDay;
};

// console.log(getAppointmentsForDay(state, "Monday"));

exports.getAppointmentsForDay = getAppointmentsForDay;

// -------------- getInterview function ------------------ //

const getInterview = function (state, interviewObj) {
  if (!interviewObj) {
    return null;
  }

  const interviewerId = interviewObj.interviewer;
  const interviewerObj = state.interviewers[interviewerId];
  const student = interviewObj.student;

  return { student, interviewer: interviewerObj };
};

// console.log(getInterview(state, { student: "Archie Cohen", interviewer: 2 }));

exports.getInterview = getInterview;

//-------------- getInterviewersForDay function ----------------//

const getInterviewersForDay = function (state, day) {
  const appointmentsForDay = state.days.find((dayObj) => day === dayObj.name)
    ? state.days
        .find((dayObj) => day === dayObj.name)
        .interviewers.map((element) => state.interviewers[element])
    : [];

  return appointmentsForDay;
};

exports.getInterviewersForDay = getInterviewersForDay;
