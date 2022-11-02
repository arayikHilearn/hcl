//import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store';

const store = setupStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//! npx json-server --watch db.json --port 5000
root.render(
    //<StrictMode>
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    //</StrictMode>
);
