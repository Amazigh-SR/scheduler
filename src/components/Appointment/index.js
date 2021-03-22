import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "components/Appointment/Error";

// List of potential modes/states for one single appointment
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log(error);
      });
  };

  //delete appointment function
  const deleteApp = function (id) {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
        console.log(error);
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

  //Function that Edits an existing appointment
  const edit = function () {
    transition(EDIT);
  };

  const onClose = function () {
    back();
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {/* -------- List of conditions for each mode/ different appointment components --------- */}

      {mode === ERROR_DELETE && (
        <Error
          message="Error, could not cancel the appointment"
          onClose={onClose}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Error, could not save the appointment"
          onClose={onClose}
        />
      )}

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
          interviewers={props.interviewersForDay}
          onSave={save}
          onCancel={() => back()}
          // bookInterview={props.bookInterview}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.getInterviewersForDay}
          onSave={save}
          onCancel={() => back()}
          student={props.interview.student} // Send this to form to set default student name
          interviewer={props.interview.interviewer.id} //Send this to form to set default interviewer (selected)
        />
      )}

      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          confirmationScreen={confirmationScreen}
          onEdit={edit}
        />
      )}
    </article>
  );
};

export default Appointment;
