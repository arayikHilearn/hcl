import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store';
import { AxiosStatic } from 'axios';

const store = setupStore();
const root = ReactDOM.createRoot(
    document.getElementById( 'root' ) as HTMLElement
);

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

declare global {
    interface Window { axios: AxiosStatic }
    const axios: AxiosStatic;
}

//     "@reduxjs/toolkit": "^1.8.1",
//     "@testing-library/jest-dom": "^5.16.4",
//     "@testing-library/react": "^13.1.1",
//     "@testing-library/user-event": "^13.5.0",



//?     "antd": "^4.20.2",
//     "axios": "^0.27.2",
//     "moment": "^2.29.3",
//     "node-sass": "^7.0.1",
//     "react": "^18.1.0",
//     "react-dom": "^18.1.0",
//     "react-redux": "^8.0.1",
//     "react-router-dom": "^6.3.0",
//     "react-scripts": "5.0.1",
//     "typescript": "^4.6.4",
//     "web-vitals": "^2.1.4"





//     "@types/react-redux": "^7.1.24",
//     "@types/react-router-dom": "^5.3.3"
//     "@types/jest": "^27.4.1",
//     "@types/node": "^16.11.33",
//     "@types/react": "^18.0.8",
//     "@types/react-dom": "^18.0.3",
