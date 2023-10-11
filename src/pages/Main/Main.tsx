import React, {useEffect, useState} from 'react';
import Button from "../../components/Button/Button.tsx";
import UseDragger from "../../hooks/useDragger.ts";
import {TreeNode} from "../../types";
import Tree from "../../components/Tree/Tree.tsx";
import './Main.css';
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi";
import {ZOOM_DATA} from "../../constants.ts";

const Main = () => {

  const { moveToCenter, isGrabbing } = UseDragger({ id: 'box' });
  const [tree, setTree] = useState<TreeNode[]>([
    {
      id: '1',
      text: 'Category',
      isSubmitted: true,
      children: [],
      root: true
    },
  ]);

  const [zoom, setZoom] = useState(1);

  const onZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZoom = event.target.value;
    const zoomInteger = parseFloat(selectedZoom);
    setZoom(zoomInteger);

  };
  const updateZoom = (delta: number) => {
    const total = zoom + delta;
    const rounded = total.toFixed(1);
    setZoom(parseFloat(rounded));
  };

  const zoomIn = () => {
    if (zoom < 1.5) {
      updateZoom(0.1);
    }
  };

  const zoomOut = () => {
    if (zoom >= 0.3) {
      updateZoom(-0.1);
    }
  };


  const treeStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: 'top left',
  };


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

  const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
  };

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
        <Button onClick={moveToCenter} text="center" />
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
