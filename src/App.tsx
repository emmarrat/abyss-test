import './App.css'
import UseDragger from "./hooks/useDragger.ts";


function App() {
  const { moveToCenter, isGrabbing } = UseDragger({ id: 'pink-box' });

  return (
    <main>
      <button onClick={moveToCenter} >GO TO CENTER</button>
      <div  className="container">
        <div id="pink-box" className={`box ${isGrabbing && 'box-active'}`}></div>
      </div>
    </main>
  )
}

export default App
