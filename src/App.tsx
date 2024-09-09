import Header from "./layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layouts/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
      </Router>
      <Footer />
    </>
  );
}

export default App;
