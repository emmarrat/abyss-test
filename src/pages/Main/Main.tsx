import {useEffect} from 'react';
import Button from "../../components/Button/Button.tsx";
import UseDragger from "../../hooks/useDragger.ts";
import Tree from "../../components/Tree/Tree.tsx";
import {BiMinusCircle, BiPlusCircle, BiSolidMap} from "react-icons/bi";
import {ZOOM_DATA} from "../../constants.ts";
import useZoom from "../../hooks/useZoom.ts";
import useTree from "../../hooks/useTree.ts";
import './Main.css';

const Main = () => {
  const { moveToCenter, isGrabbing } = UseDragger({ id: 'box' });
  const { zoom, onZoomChange, zoomIn, zoomOut, treeStyle } = useZoom();
  const { tree, addChildren, updateText, submitName, startToEdit, deleteNode } = useTree();


  useEffect(() => {
    const selectedOption = ZOOM_DATA.find(option => parseFloat(option.value) === zoom);
    if (selectedOption) {
      const select = document.getElementById('zoomSelect') as HTMLSelectElement;
      if (select) {
        select.value = selectedOption.value;
      }
    }
  }, [zoom]);


  useEffect(() => {
    moveToCenter();
  },[]) // I do not enter dependency to move the block to center only once on mounting


  return (
    <main>
      <div className="buttons-container">
        <Button onClick={moveToCenter}><BiSolidMap style={{fontSize: '20px'}}/></Button>
        <Button onClick={zoomIn}><BiPlusCircle style={{fontSize: '20px'}}/></Button>
        <select id="zoomSelect" value={zoom.toString()} onChange={onZoomChange}>
          {ZOOM_DATA.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
        <Button onClick={zoomOut}><BiMinusCircle style={{fontSize: '20px'}}/></Button>
      </div>
      <div className="container">
        <div id="box" className={`box tree ${isGrabbing && 'box-active'}`} style={treeStyle}>
          <Tree
            data={tree}
            addChildren={addChildren}
            updateNodeText={updateText}
            submitName={submitName}
            startToEdit={startToEdit}
            deleteNode={deleteNode}
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
