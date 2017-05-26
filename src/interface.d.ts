/*
 * Created by zhuzi on Wed May 24 2017
 */

// 股票市场信心
interface StockBaseInfo {
    code: string; // 股票代码
    name: string; // 股票名称
    current: number; // 现价 (指最近成交价)
}
// 持仓股票信息
interface HoldingSecurity {
    code: string; // 股票代码
    name: string; // 股票名称
    quantity: number; // 持有股数
    avgCostPrice: number; // 成本价
    lockedQuantity: number; // 卖出等待成交被锁定;
}
// 资产
interface Asset {
    cash: number; // 现金
    security: HoldingSecurity[]; // 持仓股票
    locked: number; // 被锁定的 cash, 买入下单未完成时占用的钱
}
// 买盘或卖盘某一报价
// -> 此处意为有几家券商/经纪一共多少手在此价位报价排队等待成交, 其中有先后次序, 先到先得
interface PriceRow {
    price: number; // 某一报价
    lots: number; // 手数 board lot, 港股最小交易单位, 不同股票每手股数不同, demo 仅以腾讯为例, 腾讯是100股一手
    brokers: number; // 券商/经纪数
}
// 交易记录
interface Transaction {
    time?: Date; // 成交时间
    dealPrice: number; // 成交价格
    dealQuantity: number; // 成交数量
}
type orderId = string;
// 订单
interface Order {
    orderId: string; // 订单 id
    time: Date; // 订单时间
    code: string; // 股票代码
    name: string; // 股票名称
    orderPrice: number; // 订单价格
    orderQuantity: number; // 订单数量
    direction: 'BUY' | 'SELL'; // 方向: 买入或者卖出
    status: 'CANCELED' | 'WAITING' | 'DEAL_DONE' | 'EXPIRED';
    dealed: Transaction[];
    // dealedQuantity: number; // 已成交股数, 可能部分成交, 一定小于等于 orderQuantity
    // dealedAvgPrice: number; // 以均价多少成交, 默认以最好价格成交
    onCancel?: (id: orderId) => void;
}
// interface TradingOpt {
//     time: Date;
//     code: string;
//     name?: string;
//     price: number;
//     quantity: number;
//     direction: 'BUY' | 'SELL';
// }
// 交易
interface OnTrading {
    (order: Order): void
}
// 成交
// interface Deal {
//     quantity
// }