import Button from "../../components/Button/Button.tsx";
import {useState} from "react";
import UseDragger from "../../hooks/useDragger.ts";
import {TreeNode} from "../../types";
import Tree from "../../components/Tree/Tree.tsx";
import './Main.css'


const Main = () => {
  const { moveToCenter, isGrabbing } = UseDragger({ id: 'box' });
  const [tree, setTree] = useState<TreeNode[]>([
    {
      id: '1',
      text: 'Category',
      diamond: false,
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
                text: 'New Element',
                diamond: false,
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


  console.log(tree)

  return (
    <main>
      <Button onClick={moveToCenter} text="center" />
      <div className="container">
        <div id="box" className={`box tree ${isGrabbing && 'box-active'}`}>
          <Tree data={tree} addChildren={addChildren} />
        </div>
      </div>
    </main>
  );
};

export default Main;

