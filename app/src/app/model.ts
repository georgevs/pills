export const update = (_model, data) => {
  console.log('data', data);
  return model(data);
};

const model = (data) => {
  const partial = ({
    drugs: drugs(data?.drugs),
    prescriptions: prescriptions(data?.prescriptions),
    slots: slots(data?.tracks),
  });
  return { ...partial, tracks: tracks(partial, data?.tracks) }
};

const drugs = (xs) => (
  (xs || []).reduce((acc, { id, description, doses }) => acc.set(id, { id, description, doses }), new Map)
);
const prescriptions = (xs) => (
  (xs || []).reduce((acc, { id, started }) => acc.set(id, { id, started }), new Map)
);
const slots = (xs) => (
  (xs || []).reduce((acc, { slot: { time, label } }) => acc.set(time, acc.get(time) || { time, label }), new Map)
);
const tracks = ({ prescriptions, drugs, slots }, xs) => (
  (xs || []).reduce((acc, { id, pid, did, dose, slot: { time }, times, span, filter }) => acc.set(id, {
    id, dose,times, span, filter,
    prescription: prescriptions.get(pid),
    drug: drugs.get(did),
    slot: slots.get(time)
  }), new Map)
);