import { Pills } from './pills';
import config from '../config';

// fetch db (remote) and idb (local) 
// async update idb (local) if new db
export const fetchData = () => {
  const pills = new Pills(config().pills);
  return Promise.all([pills.drugs(), pills.prescriptions(), pills.tracks(), pills.history()])
    .then(([drugs, prescriptions, tracks, history]) => ({ drugs, prescriptions, tracks, history }))
};
