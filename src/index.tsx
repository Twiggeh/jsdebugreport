import { createRoot } from 'react-dom/client';
import App from './App';
import { loadSW } from './loadSW';

const container = document.getElementById('root');
if (!container) throw 'Missing root div in html';
const root = createRoot(container);

root.render(<App></App>);

loadSW();
