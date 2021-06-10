import { writeFileSync } from "fs";
import { OverallEvents } from "../types";
import { increaseDateByDay, resolveFilePath, sameDay } from "./utils";

export function saveEventStore(eventList: OverallEvents = { eventList: [] }) {

    const eventStorePath = resolveFilePath("eventsStore.json");
    writeFileSync(eventStorePath, JSON.stringify(eventList, null, 4));
}

export function restoreDates(eventsStoreParsed: OverallEvents) {
    eventsStoreParsed.eventList.forEach(element => {
        element.date = new Date(element.date);
        if (element.events) {
            element.events.forEach(event => {
                event.start = new Date(event.start);
                resetDate(event.start, element.date);
                if (event.end) {
                    event.end = new Date(event.end);
                    resetDate(event.end, element.date);
                }
            });
        }
    });
}

function resetDate(dateToReset: Date, dateOriginal: Date) {
    dateToReset.setFullYear(dateOriginal.getFullYear());
    dateToReset.setMonth(dateOriginal.getMonth());
    dateToReset.setDate(dateOriginal.getDate());
    dateToReset.setSeconds(0);
    dateToReset.setMilliseconds(0);
}

export function sortByDate(eventsStoreParsed: OverallEvents) {
    eventsStoreParsed.eventList.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function fillMissingDays(eventsStoreParsed: OverallEvents) {
    if (eventsStoreParsed.eventList.length > 0) {
        const firstDate = eventsStoreParsed.eventList[eventsStoreParsed.eventList.length - 1].date;
        const currentDate = new Date();

        let tmpDate = new Date(firstDate);
        while (!sameDay(tmpDate, currentDate)) {
            const eventsForDayAlreadyExists = eventsStoreParsed.eventList.find(dailyEvent => sameDay(dailyEvent.date, tmpDate));

            if (!eventsForDayAlreadyExists) {
                eventsStoreParsed.eventList.push({ events: [], date: new Date(tmpDate) });
            }

            increaseDateByDay(tmpDate);
        }
    }
}