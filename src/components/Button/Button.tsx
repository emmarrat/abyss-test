import './Button.css';
import React, {ReactNode} from "react";

interface Props {
  text ?: string;
  onClick: () => void;
  children ?: ReactNode
}

const Button: React.FC<Props> = ({text , onClick, children}) => {
  return (
    <button className="button" onClick={onClick}>
      <p>
        {text || children}
      </p>
    </button>
  );
};

export default Button;