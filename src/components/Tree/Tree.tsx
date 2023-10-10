import React from 'react';
import {TreeNode} from '../../types';
import './Tree.css';

interface Props {
  data: TreeNode[];
  addChildren: (id: string) => void;
  updateNodeText: (id: string, text: string) => void;
  submitName: (id: string) => void;
}

const Tree: React.FC<Props> = ({data, addChildren, updateNodeText, submitName}) => {
  const handleAddChildren = (id: string) => {
    addChildren(id);
  };

  const handleTextChange = (id: string, newText: string) => {
    updateNodeText(id, newText);
  };

  const handleSubmitName = (id: string) => {
    submitName(id);
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} className={`${item.text}${item.id}`}>
          <div>
            {!item.isSubmitted ?
              <form>
              <input
                type="text"
                value={item.text}
                id={item.id}
                onChange={(e) => handleTextChange(item.id, e.target.value)}
              />
              <button type="button" onClick={() => handleSubmitName(item.id)}>
                Submit name
              </button>
            </form> :
              <span>{item.text}</span>
            }
            <button type="button" onClick={() => handleAddChildren(item.id)}>
              Add
            </button>
          </div>
          {item.children && item.children.length > 0 && (
            <Tree data={item.children} addChildren={addChildren} updateNodeText={updateNodeText}
                  submitName={submitName}/>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tree;
