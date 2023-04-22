import './App.css'
import ExampleThree from "./components/exampleThree";
import { Leva } from 'leva'

function App() {

  return (
    <div className="App">
      <ExampleThree />
      <Leva collapsed />
    </div>
  )
}

export default App
