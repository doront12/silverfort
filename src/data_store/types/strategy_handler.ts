import { StrategyType } from "./const";


export interface StrategyHandler {
    init(): Promise<void>;
    put(key: string, value: any): Promise<any>;
    get(key: string): Promise<any>

}