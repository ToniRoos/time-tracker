import { isTimeRunningForToday } from "../src/logic/utils";

describe('should check if time is running for today', () => {

    it('for empty array', () => {
        const isTimerRunning = isTimeRunningForToday([]);
        expect(isTimerRunning).toBeFalsy();
    });

    it('for today with last events older then today', () => {
        const isTimerRunning = isTimeRunningForToday([{
            date: new Date(Date.parse('20 May 2021 00:00:00 GMT')),
            events: []
        }]);
        expect(isTimerRunning).toBeFalsy();
    });

    it('for today when no events for today', () => {
        const isTimerRunning = isTimeRunningForToday([{
            date: new Date(),
            events: []
        }]);
        expect(isTimerRunning).toBeFalsy();
    });

    it('for today with no running time span for today', () => {
        const isTimerRunning = isTimeRunningForToday([{
            date: new Date(),
            events: [{
                start: new Date(),
                end: new Date()
            }]
        }]);
        expect(isTimerRunning).toBeFalsy();
    });

    it('for today with completed timespan', () => {
        const isTimerRunning = isTimeRunningForToday([{
            date: new Date(),
            events: [{
                start: new Date(),
                end: new Date()
            }]
        }]);
        expect(isTimerRunning).toBeFalsy();
    });

    it('for today with no completed timespan', () => {
        const isTimerRunning = isTimeRunningForToday([{
            date: new Date(),
            events: [{
                start: new Date()
            }]
        }]);
        expect(isTimerRunning).toBeTruthy();
    });
});