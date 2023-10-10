import React from 'react';
import {TreeNode} from "../../types";
import './Tree.css';

interface Props {
  data: TreeNode[];
}

const Tree: React.FC<Props> = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} className={`${item.text}${item.id}`}>
          <div>{item.text}</div>
          {item.children && item.children.length ? <Tree data={item.children} /> : ''}
        </li>
      ))}
    </ul>
  );
};

export default Tree;
