import { StrategyType } from "../types/const";
import { StrategyHandler } from "../types/strategy_handler";
import { DiskHandler } from "./disk";
const DATA_PATH = './disk.json';
const mockHandler = new DiskHandler();
export class S3Handler implements StrategyHandler {
    async init(): Promise<void> {
        // add here aws sdk init

    }
    async put(key: string, value: any): Promise<any> {
        // save  data to s3 bucket using aws sdk
        await mockHandler.put(key, value, DATA_PATH);
    }
    async get(key: string): Promise<any> {
        // read data from s3 bucket using aws sdk
        const val = await mockHandler.get(key, DATA_PATH);
        return val;
    }

}