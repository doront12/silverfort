import { DbHandler } from "./handlers/db";
import { DiskHandler } from "./handlers/disk";
import { S3Handler } from "./handlers/s3";
import { StrategyType } from "./types/const";
import { StrategyHandler } from "./types/strategy_handler";
import AsyncLock from 'async-lock';
import * as dotenv from "dotenv";

dotenv.config();
var lock = new AsyncLock();

const WINDOW_MS: number = process.env.WINDOW_MS ? parseInt(process.env.WINDOW_MS) : 60000;;
const data: Record<string, any> = [];
const hitsThreshold: number = process.env.HITS_THRESHOLD ? parseInt(process.env.HITS_THRESHOLD) : 200;
let requests = new Array<number>()
export class DataStore {
    hitsThreshold: number;
    handler: StrategyHandler;

    windowTimeMs: number;
    constructor() {

        const strategy = process.env.STRATEGY || 'disk';

        this.handler = this.getStrategyHandler(strategy);

    }
    async init() {
        await this.handler.init();
    }
    async put(key: string, value: any): Promise<void> {

        const h = this.handler;
        lock.acquire(key, async function (handler = h) {
            if (requests.length && requests.length >= hitsThreshold) {
                this.data[key] = value;

            }
            else {
                if (data[key] === undefined) {
                    await handler.put(key, value);
                }

            }
        }).then(() => {
            // for debug purpuses
            console.log(`lock on put released for key ${key} `)
        });

    }

    async get(key: string, res: any): Promise<any> {
        const h = this.handler;
        lock.acquire(key, async function (handler = h) {
            const now = Date.now();
            // clean old requests and push current
            requests = requests.filter(requestTime => now - requestTime <= WINDOW_MS);
            requests.push(Date.now());

            const val = data[key] !== undefined ? data[key] : await handler.get(key);
            return val;
        }).then(async (val: any) => {
            res.status(200).json({ key, val });

        });
    }
    private getStrategyHandler(strategy: string): StrategyHandler {
        const handlers: Record<StrategyType, StrategyHandler> = {
            'disk': new DiskHandler(),
            'db': new DbHandler(),
            's3': new S3Handler()
        }
        if (!Object.values(StrategyType).includes(strategy as StrategyType)) {
            console.log('invalid strategy. using disk default strategy');
            return new DiskHandler();
        }
        return handlers[strategy];

    }




}