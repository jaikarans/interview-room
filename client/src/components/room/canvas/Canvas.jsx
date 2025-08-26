import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const canvasPen = {
  drawColor: 'red',
  penWidth: 4
}

const Canvas = () => {

  const canvasRef = useRef(null);
  const ctxRef = useRef(null); // store context persistently
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size once
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round"; // smoother lines
    ctxRef.current = ctx;

  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startDrawing = (e) => {
      setIsDrawing(true);
      const ctx = ctxRef.current;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e) => {
      // The 'isDrawing' check is now crucial because the event listener
      // itself doesn't get removed/re-added based on the old state.
      if (!isDrawing) return;
      const ctx = ctxRef.current;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = canvasPen.drawColor;
      ctx.lineWidth = canvasPen.penWidth;
      ctx.stroke();
    };

    const stopDrawing = () => {
      const ctx = ctxRef.current;
      ctx.closePath();
      setIsDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // Cleanup function to remove event listeners
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
    // Re-run this effect only to add/remove listeners if needed,
    // though for this specific logic, it's the check inside 'draw' that matters most.
    // Keeping isDrawing here ensures the closure is fresh.
  }, [isDrawing]);

  return (
    <Box
      ref={canvasRef}
      w='100%'
      h='100%'
      as="canvas"
      bg='surface-container-high'
      onMouseDown={() => (setIsDrawing(true))}
      cursor="pointer"
    />
  );
}

export default Canvas;