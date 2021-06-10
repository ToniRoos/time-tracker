import { produce } from 'immer';
import * as React from 'react';

import { calcTimeBetweenDates, dateToString, isTimeRunningForToday, timeToUtcString } from '../logic/utils';
import { DailyEventsProps } from '../types';
import { TimeInput } from './TimeInput';

export const DailyEvents = (props: DailyEventsProps) => {

    const [events, setEvents] = React.useState(props.events);
    const dailyDuration = events.map(event => calcTimeBetweenDates((event.start as Date), (event.end as Date))).reduce((a, b) => a + b, 0);

    React.useEffect(() => {

        const startTimer = isTimeRunningForToday([props]);

        if (startTimer) {
            const interval = setInterval(() => {

                const nextState = produce(props.events, draftState => {
                    const lastEventState = draftState[props.events.length - 1];
                    lastEventState.end = new Date() as any;
                })
                setEvents(nextState);
            }, 15000);

            return () => {
                clearInterval(interval);
            }
        }

    }, [props]);

    const dailyDurationAsDate = new Date(dailyDuration);

    const dailyEventsMapped = props.events.map((event, i) => <div key={event.start.getTime()} className={`badge ${event.end ? 'bg-info' : 'bg-warning'} text-dark me-2`}>
        <div className="d-flex align-items-center"><TimeInput date={event.start} onTimeChanged={(time) => {
            const eventCopy = { ...event };
            eventCopy.start = time;
            props.onEventChange(i, eventCopy);
        }} />
            {" - "}
            <TimeInput date={event.end} onTimeChanged={(time) => {
                const eventCopy = { ...event };
                eventCopy.end = time;
                props.onEventChange(i, eventCopy);
            }} />
        </div>
    </div>);

    return <div className="row bg-light border-bottom">
        <div className="col-2 p-2 text-center border-end">
            {dateToString(props.date)}
        </div>
        <div className="col p-2">
            {(props.date.getDay() === 0 || props.date.getDay() === 6)
                ? <div className={`badge w-100 bg-warning text-dark me-2`}>Weekend</div>
                : dailyEventsMapped}
        </div>
        <div className="col-2 p-2 text-center border-start">
            {timeToUtcString(dailyDurationAsDate)} h
        </div>
    </div >
}
