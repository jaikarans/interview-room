import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";

const BoxResizeable = ({ children }) => {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);

  // -------------------- DRAG --------------------
  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...position };

    const onMouseMove = (ev) => {
      setPosition({
        x: startPos.x + (ev.clientX - startX),
        y: startPos.y + (ev.clientY - startY),
      });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // -------------------- RESIZE --------------------
  const startResize = (e, corner) => {
    e.stopPropagation(); // prevent drag
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPos = { ...position };

    const onMouseMove = (ev) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPos.x;
      let newY = startPos.y;

      if (corner.includes("right")) {
        newWidth = Math.max(100, startWidth + (ev.clientX - startX));
      }
      if (corner.includes("left")) {
        newWidth = Math.max(100, startWidth - (ev.clientX - startX));
        newX = startPos.x + (ev.clientX - startX);
      }
      if (corner.includes("bottom")) {
        newHeight = Math.max(100, startHeight + (ev.clientY - startY));
      }
      if (corner.includes("top")) {
        newHeight = Math.max(100, startHeight - (ev.clientY - startY));
        newY = startPos.y + (ev.clientY - startY);
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];

  return (
    <Box
      ref={boxRef}
      position="absolute"
      top={`${position.y}px`}
      left={`${position.x}px`}
      w={`${size.width}px`}
      h={`${size.height}px`}
      zIndex='max'
      // bg="red.400"
      // borderRadius='3xl'
      // border="2px solid"
      // borderColor="gray.400"

      overflow="hidden"
      cursor={isDragging ? "grabbing" : "grab"}
      onMouseDown={startDrag}
    >
      <Box w="100%" h="100%">
        {children}
      </Box>

      {corners.map((corner) => {
        const pos = corner.split("-");
        return (
          <Box
            key={corner}
            position="absolute"
            top={pos.includes("top") ? "0" : "auto"}
            bottom={pos.includes("bottom") ? "0" : "auto"}
            left={pos.includes("left") ? "0" : "auto"}
            right={pos.includes("right") ? "0" : "auto"}
            w="10px"
            h="10px"
            bg="transparent"
            cursor="nesw-resize"
            onMouseDown={(e) => startResize(e, corner)}
          />
        );
      })}
    </Box>
  );
};

export default BoxResizeable;
