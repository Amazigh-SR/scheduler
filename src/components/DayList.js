import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        selected={day.name === props.day}
        setDay={(event) => props.setDay(day.name)} //() => props.setDay(day.name)
        spots={day.spots}
      />
    );
  });

  return <ul>{dayList}</ul>;
}
