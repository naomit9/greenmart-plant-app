import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./routes/Home/Home"
import About from "./routes/About/About"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Plant from "./routes/Plant/Plant"
import SinglePlant from "./routes/Plant/SinglePlant"
import CreatePlant from "./routes/Plant/CreatePlant"
import EditPlant from "./routes/Plant/EditPlant"

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="plants" element={<Plant />} />
          <Route path="/plants/:slug" element={<SinglePlant />} />
          <Route path="/createplant" element={<CreatePlant />} />
          <Route path="/editplant/:slug" element={<EditPlant />} />          
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
