import { StrategyType } from "../types/const";
import { StrategyHandler } from "../types/strategy_handler";
import { DiskHandler } from "./disk";

const DATA_PATH = './db.json';
const mockHandler = new DiskHandler();
export class DbHandler implements StrategyHandler {
    async init(options: Record<string, any>): Promise<void> {
        // add db connection initialiazation.



    }
    async put(key: string, value: any): Promise<any> {
        // save  data to db using the initilized connection
        await mockHandler.put(key, value, DATA_PATH);
    }
    async get(key: string): Promise<any> {
        // get  data to db using the initilized connection
        const val = await mockHandler.get(key, DATA_PATH);
        return val;
    }

}