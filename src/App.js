import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoute from "./AnimatedRoute";


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <AnimatedRoute/>
        </div>
      </div>
    </Router>
  );
}

export default App;
