import { useState, useEffect } from 'react';
import { ZOOM_DATA } from "../constants.ts";

const useZoom = () => {
  const [zoom, setZoom] = useState(1);

  const onZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZoom = event.target.value;
    const zoomInteger = parseFloat(selectedZoom);
    setZoom(zoomInteger);
  };

  const updateZoom = (delta: number) => {
    const total = zoom + delta;
    const rounded = total.toFixed(1);
    setZoom(parseFloat(rounded));
  };

  const zoomIn = () => {
    if (zoom < 1.5) {
      updateZoom(0.1);
    }
  };

  const zoomOut = () => {
    if (zoom >= 0.3) {
      updateZoom(-0.1);
    }
  };

  const treeStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: 'top left',
  };

  useEffect(() => {
    const selectedOption = ZOOM_DATA.find(option => parseFloat(option.value) === zoom);
    if (selectedOption) {
      const select = document.getElementById('zoomSelect') as HTMLSelectElement;
      if (select) {
        select.value = selectedOption.value;
      }
    }
  }, [zoom]);

  return {
    zoom,
    onZoomChange,
    zoomIn,
    zoomOut,
    treeStyle,
  };
};

export default useZoom;
