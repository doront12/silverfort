import express from 'express'
import { DataStore } from './src/data_store/data_store';
import { StrategyType } from './src/data_store/types/const';
const app = express()
const port = 3000
const dataStore = new DataStore();
await dataStore.init();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/upsert', async (req: any, res: any) => {
  if (req
    .body.key && typeof req
      .body.key === 'string' || req.body.value) {

    try {
      await dataStore.put(req.body.key, req.body.value);
      res.status(200).send({ status: 'success' });
    }
    catch (ex) {
      res.status(500).json({ error: ex })
    }
  }
  else {
    res.status(400).json({ error: ' missing key or value' });
  }
})
app.get('/get', async (req: any, res: express.Response) => {
  if (req
    .body.key) {

    try {
      await dataStore.get(req.body.key, res);

    }
    catch (ex) {
      return await res.status(500).json({ error: ex })
    }
  }
  else {
    res.status(400).json({ error: ' missing key or value' });
  }
})

app.listen(port, () => {
  console.log(`Accepting requests on  ${port}`)
})