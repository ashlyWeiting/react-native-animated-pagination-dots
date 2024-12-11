type IDotStyle = {
    size: number;
    opacity: number;
};
export type getDotStylePayload = {
    idx: number;
    curPage: number;
    maxPage: number;
};
export declare const getDotStyle: ({ idx, curPage, maxPage, }: getDotStylePayload) => IDotStyle;
export {};
