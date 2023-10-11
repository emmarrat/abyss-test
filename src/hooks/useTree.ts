import { useState } from 'react';
import useRandomId from './useRandomId';
import {TreeNode} from "../types"; // Import your existing useRandomId hook

const useTree = () => {
  const [tree, setTree] = useState<TreeNode[]>([
    {
      id: '1',
      text: 'Category',
      isSubmitted: true,
      children: [],
      root: true,
    },
  ]);

  const generateRandomId = useRandomId();

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

  return {
    tree,
    addChildren,
    updateText,
    submitName,
    startToEdit,
    deleteNode,
  };
};

export default useTree;
