import { renderUi } from './ui';
import { register } from './sw';

renderUi(document.getElementById('app'));

window.addEventListener('load', () => {
  // register();
});

