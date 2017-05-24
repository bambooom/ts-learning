/*
 * Created by zhuzi on Wed May 24 2017
 */

// check if a time is a trading time
function isTradingTime(now: Date): boolean {
    const day: number = now.getDay();
    if (day === 0 || day === 6) {
        return false;
    }
    const hour: number = now.getHours();
    if (hour < 9 || hour > 16 || hour === 12) {
        return false;
    }
    return true;
}

// check the last trading time
// if it's trading time, just return the time
// o.w. just 12pm (午市休息) or 4pm (当日交易结束) 
function lastTradingTime(now: Date): Date {
    const day: number = now.getDay();
    const hour: number = now.getHours();
    const result = now;
    const isTrading = isTradingTime(now);
    if (!isTrading) {
        if (day !== 0 && day !== 6 && hour === 12) {
            result.setHours(12);
            result.setMinutes(0);
            result.setSeconds(0);
        } else {
            result.setHours(16);
            result.setMinutes(0);
            result.setSeconds(0);
        }
    }
    return result;
}

export { isTradingTime, lastTradingTime };