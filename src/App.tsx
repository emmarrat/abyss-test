import UseDragger from "./hooks/useDragger.ts";
import {TREE_DATA} from "./mock-data.ts";
import Tree from "./components/Tree/Tree.tsx";
import './App.css'
import './components/Tree/Tree.css';

function App() {
  const { moveToCenter, isGrabbing } = UseDragger({ id: 'box' });

  return (
    <main>
      <button onClick={moveToCenter} >GO TO CENTER</button>
      <div  className="container">
        <div id="box" className={`box tree ${isGrabbing && 'box-active'}`}>
          <Tree data={TREE_DATA} />
        </div>
      </div>
    </main>
  )
}

export default App
