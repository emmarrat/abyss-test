import {useRef} from 'react';

const useRandomId = () => {
  const counterRef = useRef(0);

  return () => {
    const randomId = Math.random().toString(36).substring(7) + counterRef.current;
    counterRef.current += 1;
    return randomId;
  };
};

export default useRandomId;
