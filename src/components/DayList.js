import React from "react";
import DayListItem from "components/DayListItem";

//Used as dummy data for the DayList component
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function DayList(props) {
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        selected={day.name === props.day}
        setDay={props.setDay}
        spots={day.spots}
      />
    );
  });

  return <ul>{dayList}</ul>;
}
