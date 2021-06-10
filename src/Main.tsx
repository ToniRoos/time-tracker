import * as React from 'react';
import { getLastEvent, isTimeRunningForToday, resolveFilePath, sameDay } from './logic/utils';
import { DailyEvents } from './components/DailyEvents';
import { existsSync, readFile } from "fs";
import { OverallEvents } from './types';
import { fillMissingDays, restoreDates, saveEventStore, sortByDate } from './logic/eventStore';

const Main = () => {

    const eventStorePath = resolveFilePath("eventsStore.json");
    const [events, setEvents] = React.useState<OverallEvents>({ eventList: [] });

    React.useEffect(() => {

        if (!existsSync(eventStorePath)) {
            saveEventStore();
        }
        readFile(eventStorePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            const eventsStoreParsed: OverallEvents = JSON.parse(data);
            restoreDates(eventsStoreParsed);
            sortByDate(eventsStoreParsed);
            fillMissingDays(eventsStoreParsed);
            sortByDate(eventsStoreParsed);

            setEvents(eventsStoreParsed);
        })

    }, []);

    const eventsMapped = events.eventList.map(dailyEventItem => <DailyEvents key={dailyEventItem.date.toString()} {...dailyEventItem} onEventChange={(i, event) => {
        dailyEventItem.events[i] = event;
        const newEventList = { eventList: events.eventList };
        saveEventStore(newEventList);
        setEvents(newEventList);
    }} />);

    const timerRunning = isTimeRunningForToday(events.eventList);

    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-info" href="#">Time Tracker</a>
                {timerRunning
                    ? <button type="button" className="btn btn-info" onClick={() => setStopEvent(events, setEvents)} >Stop</button>
                    : <button type="button" className="btn btn-info" onClick={() => setStartEvent(events, setEvents)}>Start</button>}
            </div>
        </nav>
        {eventsMapped}
    </div>
}

export default Main;

function setStartEvent(events: OverallEvents, setEvents: React.Dispatch<React.SetStateAction<OverallEvents>>) {
    const eventsForDay = events.eventList.filter(eventsForDay => sameDay(eventsForDay.date, new Date()));

    const curDate = new Date();
    curDate.setSeconds(0);
    curDate.setMilliseconds(0);

    if (eventsForDay.length > 0) {

        eventsForDay[0].events.push({
            start: curDate
        });
    } else {
        events.eventList.unshift({
            date: curDate,
            events: [{
                start: curDate
            }]
        });
    }

    const newEventList = { eventList: events.eventList };
    saveEventStore(newEventList);
    setEvents(newEventList);
}

function setStopEvent(events: OverallEvents, setEvents: React.Dispatch<React.SetStateAction<OverallEvents>>) {

    const lastEvent = getLastEvent(events.eventList);
    lastEvent.end = new Date();
    lastEvent.end.setSeconds(0);
    lastEvent.end.setMilliseconds(0);

    const newEventList = { eventList: events.eventList };
    saveEventStore(newEventList);
    setEvents(newEventList);
}
