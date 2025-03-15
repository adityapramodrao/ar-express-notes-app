import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {
  Home,Login,SignUp
} from "./pathConfigs"

const routes = [
    <Router>
        <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
        </Routes>
    </Router>
]
function App() {

  return (
    <>
      <div>{routes}</div>
      
    </>
  )
}

export default App
