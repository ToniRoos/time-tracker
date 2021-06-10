import * as React from 'react';
import { useState } from "react";
import { useNumberValidation } from "../hooks/useNumberValidation";
import { pad2 } from "../logic/utils";

interface TimeInputProps {
    date?: Date;
    onTimeChanged: (date: Date) => void;
}

export function TimeInput(props: TimeInputProps) {

    if (!props.date) {
        return <React.Fragment />;
    }

    const [hour, setHour] = useState(props.date.getHours());
    const [minutes, setMinutes] = useState(props.date.getMinutes());

    const className = "bg-transparent border-0";
    const style = { width: "20px" };

    const handleTimeChange = () => {

        if (!props.date) {
            return;
        }

        const timeCopy = new Date(props.date?.getTime());
        timeCopy.setHours(hour, minutes);

        if (props.date.getTime() === timeCopy.getTime()) {
            return;
        }

        props.onTimeChanged(timeCopy);
    };
    return <div>
        <input className={`${className} text-end`} style={style}
            onBlur={handleTimeChange}
            onChange={(event) => useNumberValidation(setHour, event.target.value, 0, 24)}
            value={pad2(hour)} />
        :
        <input className={`${className} text-start`} style={style}
            onBlur={handleTimeChange}
            onChange={(event) => useNumberValidation(setMinutes, event.target.value, 0, 60)}
            value={pad2(minutes)} />
    </div>;
}