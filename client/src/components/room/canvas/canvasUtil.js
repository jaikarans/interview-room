import { canvasPen } from "./Canvas"

export const setPenColor = (colorInHex) => {
  canvasPen.drawColor = colorInHex;
}

export const setPenWidth = (penWidthNumber) => {
  canvasPen.penWidth = penWidthNumber;
}