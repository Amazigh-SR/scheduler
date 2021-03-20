import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Form from "./Form";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const Appointment = function (props) {
  //Initialize the useVisualMode hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Save & create appointment function
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING); // --> Before making the request
    props
      .bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => console.log(error));
  };

  //delete appointment function
  const deleteApp = function (id) {
    transition(DELETING);
    props.cancelInterview(id).then(() => {
      transition(EMPTY);
    });
  };

  //Confirmation Screen when attempting to delete an appointment
  const confirmationScreen = function () {
    transition(CONFIRM);
  };

  //Cancel the request to delete a given appointment
  const cancelDeleteApt = function () {
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onDelete={deleteApp}
          id={props.id}
          onCancel={cancelDeleteApt}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.getInterviewersForDay}
          onSave={save}
          onCancel={() => back()}
          // bookInterview={props.bookInterview}
        />
      )}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          confirmationScreen={confirmationScreen}
        />
      )}
    </article>
  );
};

export default Appointment;
