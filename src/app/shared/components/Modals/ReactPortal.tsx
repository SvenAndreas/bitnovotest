import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};
function ReactPortal({
  children,
  wrapperId,
}: {
  children: React.ReactNode;
  wrapperId: string;
}) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
      setWrapperElement(element);
    }
    return () => {
      if (element && document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, [wrapperId]);
  if(!wrapperElement) return null
  return createPortal(children, wrapperElement);
}

export default ReactPortal;