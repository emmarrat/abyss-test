import './App.css'
import {useEffect, useRef, useState} from "react";


const CENTER = 371;

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number,
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  });
  const [isGrabbing, setIsGrabbing] = useState(false);

  const moveToCenter = () => {
    if(!boxRef.current) return;
    coords.current.lastX = CENTER;
    boxRef.current.style.left = `${CENTER}px`;
  };

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;
    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      setIsGrabbing(true);
    };
    const onMouseUp = () => {
      isClicked.current = false;

      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
      setIsGrabbing(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);


    return () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };
  }, []);

  return (
    <main>
      <button onClick={moveToCenter}>GO TO CENTER</button>
      <div ref={containerRef} className="container">
        <div ref={boxRef} className={`box ${isGrabbing && 'box-active'}`}></div>
      </div>
    </main>
  )
}

export default App
