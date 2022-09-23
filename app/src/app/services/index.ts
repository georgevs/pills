import { pills } from './pills';
import config from '../config';

export const fetchData = () => {
  const p = pills(config().pills);
  return Promise.all([p.drugs(), p.prescriptions(), p.tracks(), p.history()])
    .then(([drugs, prescriptions, tracks, history]) => ({ drugs, prescriptions, tracks, history }))
};
