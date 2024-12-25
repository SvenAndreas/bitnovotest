import { ReactNode } from "react";

function SectionContainer({ children }: { children: ReactNode }) {
  return <section className="h-screen flex items-center justify-center">{children}</section>;
}

export default SectionContainer;
