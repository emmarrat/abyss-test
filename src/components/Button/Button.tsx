import './Button.css';
import React from "react";

interface Props {
  text: string;
  onClick: () => void
}

const Button: React.FC<Props> = ({text, onClick}) => {
  return (
    <button className="button" onClick={onClick}>
      <p>
        {text}
      </p>
    </button>
  );
};

export default Button;