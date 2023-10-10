import React from 'react';
import { TreeNode } from '../../types';
import './Tree.css';

interface Props {
  data: TreeNode[];
  addChildren: (id: string) => void;
}

const Tree: React.FC<Props> = ({ data, addChildren }) => {
  const handleAddChildren = (id: string) => {
    addChildren(id);
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} className={`${item.text}${item.id}`}>
          <div>
            <span>{item.text}</span>
            <button onClick={() => handleAddChildren(item.id)}>Add</button>
          </div>
          {item.children && item.children.length > 0 && (
            <Tree data={item.children} addChildren={addChildren} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tree;
