import  {useState} from 'react';
import Button from "../../components/Button/Button.tsx";
import UseDragger from "../../hooks/useDragger.ts";
import {TreeNode} from "../../types";
import Tree from "../../components/Tree/Tree.tsx";
import './Main.css';

const Main = () => {
  const { moveToCenter, isGrabbing } = UseDragger({ id: 'box' });
  const [tree, setTree] = useState<TreeNode[]>([
    {
      id: '1',
      text: 'Category',
      isSubmitted: false,
      children: [],
    },
  ]);

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

  const updateNodeText = (id: string, text: string) => {
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

  console.log(tree);

  return (
    <main>
      <Button onClick={moveToCenter} text="center" />
      <div className="container">
        <div id="box" className={`box tree ${isGrabbing && 'box-active'}`}>
          <Tree data={tree} addChildren={addChildren} updateNodeText={updateNodeText} submitName={submitName} />
        </div>
      </div>
    </main>
  );
};

export default Main;
