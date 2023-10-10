import UseDragger from "../../hooks/useDragger.ts";
import Button from "../../components/Button/Button.tsx";
import Tree from "../../components/Tree/Tree.tsx";
import {TREE_DATA} from "../../mock-data.ts";
import './Main.css'

const Main = () => {
  const { moveToCenter, isGrabbing } = UseDragger({ id: 'box' });
  return (
    <main>
      <Button onClick={moveToCenter} text="center" />
      <div  className="container">
        <div id="box" className={`box tree ${isGrabbing && 'box-active'}`}>
          <Tree data={TREE_DATA} />
        </div>
      </div>
    </main>
  );
};

export default Main;