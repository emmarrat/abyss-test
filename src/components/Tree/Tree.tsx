import React from 'react';
import {TreeNode} from '../../types';
import './Tree.css';
import {BsCheckLg, BsPlusLg, BsXLg} from "react-icons/bs";
import {RxPencil1} from "react-icons/rx";

interface Props {
  data: TreeNode[];
  addChildren: (id: string) => void;
  updateNodeText: (id: string, text: string) => void;
  submitName: (id: string) => void;
  startToEdit: (id:string) =>void;
}

const Tree: React.FC<Props> = ({data, addChildren, updateNodeText, submitName, startToEdit}) => {
  const handleAddChildren = (id: string) => {
    addChildren(id);
  };

  const handleTextChange = (id: string, newText: string) => {
    updateNodeText(id, newText);
  };

  const handleSubmitName = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    submitName(id);
  };

  const handleStartEditing = (id: string) => {
    startToEdit(id)
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} className={`${item.text}${item.id}`}>
          <div className={`element__block ${!item.isSubmitted && 'element__block_input'}`}>
            {!item.isSubmitted ?
              <form onSubmit={(e) => handleSubmitName(e,item.id)}>
                <input
                  type="text"
                  value={item.text}
                  id={item.id}
                  className="tree__input"
                  placeholder="Enter text"
                  onChange={(e) => handleTextChange(item.id, e.target.value)}
                />

                <button
                  className="tree__button button__submit"
                  disabled={item.text.length === 0}
                >
                  <BsCheckLg style={{color: '#ffff'}}/>
                </button>
                <button
                  type="button"
                  className="tree__button button__decline"
                >
                  <BsXLg style={{color: '#ffff'}}/>
                </button>
              </form> :
              <>
                <span className="element__text">{item.text}</span>
                <button
                  type="button"
                  className="tree__button button__add"
                  onClick={() => handleAddChildren(item.id)}
                >
                  <BsPlusLg/>
                </button>
                <button
                  type="button"
                  className="tree__button button__edit"
                  onClick={() => handleStartEditing(item.id)}
                >
                  <RxPencil1 style={{color: '#ffff'}}/>
                </button>
              </>
            }

          </div>
          {item.children && item.children.length > 0 && (
            <Tree data={item.children} addChildren={addChildren} updateNodeText={updateNodeText}
                  submitName={submitName} startToEdit={startToEdit}/>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tree;
