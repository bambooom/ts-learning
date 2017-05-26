/*
 * Created by zhuzi on Wed May 24 2017
 */

import { v4 as uuid } from 'uuid';

// check if a time is a trading time
function isTradingTime(now: Date): boolean {
    const day: number = now.getDay();
    if (day === 0 || day === 6) {
        return false;
    }
    const hour: number = now.getHours();
    if (hour < 9 || hour >= 16 || hour === 12) {
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

function calulateCost(deals: Transaction[]): number {
    return deals.reduce((acc, cv) => acc + cv.dealPrice * cv.dealQuantity, 0);
}

function calulateQuantity(deals: Transaction[]): number {
    return deals.reduce((acc, cv) => acc + cv.dealQuantity, 0);
}

function calulateAvgPrice(deals: Transaction[]): number {
    const totalCost = calulateCost(deals);
    const totalQuantity = calulateQuantity(deals);
    return totalCost / totalQuantity;
}

function orderConstructor(
    p: number,
    q: number,
    code: string,
    direction: 'BUY' | 'SELL'): Order {
    return {
        orderId: uuid(),
        time: new Date(),
        code,
        name: '腾讯控股',
        orderPrice: p,
        orderQuantity: q,
        direction: direction,
        status: 'WAITING',
        dealed: [],
    };
}

function dealConstructor(p: number, q: number): Transaction {
    return {
        time: new Date(),
        dealPrice: p,
        dealQuantity: q
    };
}

export {
    isTradingTime, lastTradingTime, calulateCost,
    calulateAvgPrice, calulateQuantity,
    orderConstructor, dealConstructor
};