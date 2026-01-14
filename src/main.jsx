import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider as ReduxProvider  } from 'react-redux'
import { store } from "./store.js";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <App />
    <Toaster position="top-right"/>
  </ReduxProvider>,
)
