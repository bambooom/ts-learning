/*
 * Created by zhuzi on Fri May 26 2017
 */

import { dealConstructor, calulateCost, calulateQuantity } from './util';

function matchOrder(order: Order, bidPrice5: PriceRow[], askPrice5: PriceRow[]) {
    const { direction } = order;
    const isBuy = direction === 'BUY';
    const toCompare = isBuy ? askPrice5 : bidPrice5;
    const toDeal = isBuy ? bidPrice5 : askPrice5;
    const toComparePrices = toCompare.map(row => row.price);
    const toDealPrices = toDeal.map(row => row.price);
    const isRestingOrder = isBuy ?
        order.orderPrice < toDealPrices[0]
        : order.orderPrice > toDealPrices[0];

    if (isRestingOrder) {
        // 不能成交, 挂单排队
        const idx = toComparePrices.indexOf(order.orderPrice);
        if (idx > -1) {
            toCompare[idx].lots += (order.orderQuantity / 100);
            toCompare[idx].brokers += 1;
        } else {
            const newQueue: PriceRow = {
                price: order.orderPrice,
                lots: (order.orderQuantity / 100),
                brokers: 1
            };
            const isfirstQueue = isBuy ?
                order.orderPrice > toComparePrices[0]
                : order.orderPrice < toComparePrices[0];
            if (isfirstQueue) {
                toCompare.unshift(newQueue);
            } else {
                toCompare.push(newQueue);
            }
        }
    } else {
        // 可以部分成交或全部成交
        // 最大匹配的 price row
        const canDeal = toDeal.filter(row => {
            return isBuy ? (row.price <= order.orderPrice)
                : (row.price >= order.orderPrice);
        });
        let quantityLeft = order.orderQuantity;
        for (let i = 0; i < canDeal.length; i++) {
            const quantityTick = canDeal[i].lots * 100;
            const priceTick = canDeal[i].price;
            if (quantityTick >= quantityLeft) {
                const aDeal = dealConstructor(priceTick, quantityLeft);
                order.dealed.push(aDeal);
                if (quantityLeft === quantityTick) {
                    toDeal.shift();
                } else {
                    toDeal[0].lots = (quantityTick - quantityLeft) / 100;
                }
                quantityLeft = 0;
                break;
            } else {
                const aDeal = dealConstructor(priceTick, quantityTick);
                order.dealed.push(aDeal);
                quantityLeft -= quantityTick;
                toDeal.shift();
            }
        }
        if (quantityLeft === 0) {
            order.status = 'DEAL_DONE';
        } else {
            const newQueue: PriceRow = {
                price: order.orderPrice,
                lots: (quantityLeft / 100),
                brokers: 1
            };
            toCompare.unshift(newQueue);
        }
    }
    return {
        order,
        bidPrice5: isBuy ? toDeal : toCompare,
        askPrice5: isBuy ? toCompare : toDeal
    };
}

function updateAsset(order: Order, asset: Asset) {
    const { dealed } = order;
    const isBuy = order.direction === 'BUY';
    const hasDeal = dealed.length > 0;
    if (hasDeal) {
        const cost = calulateCost(dealed);
        const dealedQ = calulateQuantity(dealed);
        const pCost = asset.security[0].quantity * asset.security[0].avgCostPrice;
        const quantityLeft = order.orderQuantity - dealedQ;
        if (isBuy) {
            asset.cash -= cost;
            asset.security[0].quantity += dealedQ;
            asset.security[0].avgCostPrice = (pCost + cost) / asset.security[0].quantity;
            if (quantityLeft > 0) {
                asset.locked = quantityLeft * order.orderPrice;
                asset.cash -= asset.locked;
            }
        } else {
            asset.cash += cost;
            asset.security[0].quantity -= dealedQ;
            if (asset.security[0].quantity === 0) {
                asset.security[0].avgCostPrice = 0;
            } else {
                asset.security[0].avgCostPrice = (pCost - cost) / asset.security[0].quantity;
            }
            if (quantityLeft > 0) {
                asset.security[0].lockedQuantity = quantityLeft;
            }

        }
    } else {
        if (isBuy) {
            asset.locked = order.orderPrice * order.orderQuantity;
            asset.cash -= asset.locked;
        } else {
            asset.security[0].lockedQuantity = order.orderQuantity;
        }
    }

    return asset;

}

export { matchOrder, updateAsset };