import { StrategyHandler } from "../types/strategy_handler";
import { appendToDisk, getDataFromDisk } from "../utils";
const DATA_PATH = './disk.json';

export class DiskHandler implements StrategyHandler {
    async init(options: Record<string, any>): Promise<void> {
    
    }
    async put(key: string, value: any,dataPath?: string | undefined): Promise<any> {
        await appendToDisk(dataPath || DATA_PATH, key, value);
    }
    async get(key: string,dataPath?: string | undefined): Promise<any> {
        const data = await getDataFromDisk( dataPath || DATA_PATH);
        const val = data[key];
        return val;
    }


}