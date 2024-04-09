import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
          <Route path="/" element={<Plant />} />
          <Route path="/plants" element={<Plant />} />
          <Route path="/plants/:slug" element={<SinglePlant />} />
          <Route path="/createplant" element={<CreatePlant />} />
          <Route path="/editplant/:slug" element={<EditPlant />} />          
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
