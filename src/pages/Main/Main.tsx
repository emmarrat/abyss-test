import {useEffect, useState} from 'react';
import Button from "../../components/Button/Button.tsx";
import UseDragger from "../../hooks/useDragger.ts";
import {TreeNode} from "../../types";
import Tree from "../../components/Tree/Tree.tsx";
import './Main.css';
import {BiMinusCircle, BiPlusCircle, BiSolidMap} from "react-icons/bi";
import {ZOOM_DATA} from "../../constants.ts";
import useZoom from "../../hooks/useZoom.ts";
import useRandomId from "../../hooks/useRandomId.ts";

const Main = () => {
  const generateRandomId = useRandomId();
  const { moveToCenter, isGrabbing } = UseDragger({ id: 'box' });
  const { zoom, onZoomChange, zoomIn, zoomOut, treeStyle } = useZoom();

  const [tree, setTree] = useState<TreeNode[]>([
    {
      id: '1',
      text: 'Category',
      isSubmitted: true,
      children: [],
      root: true
    },
  ]);

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

  const addChildren = (id: string) => {
    const addChildrenRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            children: [
              ...(node.children ?? []),
              {
                id: generateRandomId(),
                text: '',
                isSubmitted: false,
                children: [],
              },
            ],
          };
        } else if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: addChildrenRecursively(node.children),
          };
        } else {
          return node;
        }
      });
    };

    setTree(addChildrenRecursively(tree));
  };

  const updateText = (id: string, text: string) => {
    const updateTextRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            text,
          };
        } else if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: updateTextRecursively(node.children),
          };
        } else {
          return node;
        }
      });
    };

    setTree(updateTextRecursively(tree));
  };

  const submitName = (id: string) => {
    const submitNameRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            isSubmitted: true,
          };
        } else if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: submitNameRecursively(node.children),
          };
        } else {
          return node;
        }
      });
    };

    setTree(submitNameRecursively(tree));
  };

  const startToEdit = (id: string) => {
    const startToEditRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            isSubmitted: false,
          };
        } else if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: startToEditRecursively(node.children),
          };
        } else {
          return node;
        }
      });
    };

    setTree(startToEditRecursively(tree));
  };

  const deleteNode = (id: string) => {
    const deleteNodeRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.reduce((acc, node) => {
        if (node.id === id) {
          return acc;
        } else {
          const updatedNode = {
            ...node,
            children: node.children ? deleteNodeRecursively(node.children) : undefined,
          };
          return [...acc, updatedNode];
        }
      }, [] as TreeNode[]);
    };

    setTree(deleteNodeRecursively(tree));
  };

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
