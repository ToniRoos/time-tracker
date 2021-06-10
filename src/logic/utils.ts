import { DailyEventsData } from "../types";

let globalUserDataPath = "";
export function setGlobalUserDataPath(path: string) {

    console.log(`Set path '${path}'`);
    globalUserDataPath = path;
}

export function resolveFilePath(file: string) {

    const resolvedPath = `${globalUserDataPath}/${file}`;
    return resolvedPath;
}

export const isTimeRunningForToday = (eventList: DailyEventsData[]) => {

    if (isEmpty(eventList)) {
        return false;
    }

    const lastDay = getLastDay(eventList);
    if (lastDay.events.length === 0) {
        return false;
    }

    const lastEventOfDay = getLastEventOfDay(lastDay);
    if (sameDay(lastDay.date, new Date())) {

        return !lastEventOfDay.end;
    }

    return false;
}

export const getLastEventOfDay = (daylyEvents: DailyEventsData) => {
    return daylyEvents.events[daylyEvents.events.length - 1];
}

export const getLastDay = (eventList: DailyEventsData[]) => {
    return eventList[0];
}

export const getLastEvent = (eventList: DailyEventsData[]) => {
    const dailyEvents = getLastDay(eventList);
    return dailyEvents.events[dailyEvents.events.length - 1];
}

export const dateToString = (d: Date) => {

    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${pad2(day)}.${pad2(month)}.${year}`;
}

export const timeToString = (d: Date) => {

    if (d === undefined) {
        return "";
    }

    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export const timeGetHour = (d: Date) => {

    if (d === undefined) {
        return "";
    }

    return `${pad2(d.getHours())}`;
}

export const timeGetMinutes = (d: Date) => {

    if (d === undefined) {
        return "";
    }

    return `${pad2(d.getMinutes())}`;
}

export const timeToUtcString = (d: Date) => {
    return `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`;
}

export const pad2 = (n: number) => {
    return n < 10 ? `0${n}` : n;
}

export const isEmpty = (arr: any[]) => {
    return arr && arr.length === 0;
}

export const sameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export const calcTimeBetweenDates = (d1: Date, d2: Date) => {

    if (!d1 || !d2) {
        return 0;
    }

    const timeDiff = d2.getTime() - d1.getTime();
    return timeDiff;
}

export function increaseDateByDay(tmpDate: Date) {
    tmpDate.setTime(tmpDate.getTime() + (1000 * 60 * 60 * 24));
}