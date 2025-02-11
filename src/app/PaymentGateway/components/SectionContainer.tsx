import { ReactNode } from "react";

function SectionContainer({ children }: { children: ReactNode }) {
  return <section className="h-screen md:flex p-6 md:p-0 md:mt-0 md:items-center md:justify-center">{children}</section>;
}

export default SectionContainer;
