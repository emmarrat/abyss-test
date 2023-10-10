import { useEffect, useRef, useState } from 'react';

const CENTER = 371;

interface DraggerProps {
  id: string;
}

const UseDragger = ({ id }: DraggerProps): { moveToCenter: () => void; isGrabbing: boolean } => {
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });
  const [isGrabbing, setIsGrabbing] = useState(false);

  const moveToCenter = () => {
    const target = document.getElementById(id);
    if (!target) throw new Error(`Element with given id doesn't exist`);

    coords.current.lastX = CENTER;
    target.style.left = `${CENTER}px`;
  };

  useEffect(() => {
    const target = document.getElementById(id);

    if (!target) throw new Error(`Element with given id doesn't exist`);

    const container = target.parentElement;
    if (!container) throw new Error(`Target element must have a parent`);

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      setIsGrabbing(true);
    };
    const onMouseUp = () => {
      isClicked.current = false;

      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      setIsGrabbing(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    };

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };
  }, [id]);

  return { moveToCenter, isGrabbing };
};

export default UseDragger;
