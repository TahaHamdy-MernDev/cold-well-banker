import '../styles/index.css'
import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css'; 
import { BrowserRouter as Router } from "react-router-dom";
import ProjectRoutes from './Routes';
export default function App() {
  return (
<Router>

  <ProjectRoutes/>
</Router>
  )
}
