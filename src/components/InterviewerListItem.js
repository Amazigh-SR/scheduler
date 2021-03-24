import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

// ---------------- InterviewerListItem Component -------------- //

//Props for this component:
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

const InterviewerListItem = function (props) {
  const liClassNames = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={liClassNames} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
