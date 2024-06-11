import App from './App/App';
import { createRoot } from 'react-dom/client'

const container = document.getElementById("root")
if (!container) throw new Error("container not found");
const root = createRoot(container); root.render(<App />);
 