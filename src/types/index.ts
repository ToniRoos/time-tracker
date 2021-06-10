export interface DailyEventsData {
    date: Date;
    events: TimeSpan[];
}

export interface DailyEventsProps extends DailyEventsData {
    onEventChange: (i: number, event: TimeSpan) => void;
}

export interface TimeSpan {
    start: Date;
    end?: Date;
}

export interface OverallEvents {
    eventList: DailyEventsData[];
}