import { Pills, Drug, Prescription, Track, HistoryLog } from './pills';
import config from '../config';

export interface Data {
  drugs: Drug[];
  prescriptions: Prescription[];
  tracks: Track[];
  history: HistoryLog[];
}

// fetch db (remote) and idb (local) 
// async update idb (local) if new db
export const fetchData = (): Promise<Data> => {
  const pills = new Pills(config().pills);
  return Promise.all([pills.drugs(), pills.prescriptions(), pills.tracks(), pills.history()])
    .then(([drugs, prescriptions, tracks, history]) => ({ drugs, prescriptions, tracks, history }))
};
