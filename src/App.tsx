import {BrowserRouter, Route, Routes} from "react-router-dom"
import About from "./components/About"
import Create from "./components/Create"
import Header from './components/Header'
import Home from './components/Home'
import NotFound from "./components/NotFound"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<Create />}/>
        <Route path='/about' element={<About />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
