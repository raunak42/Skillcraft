import { ReactNode } from "react";

const landingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h2>This is the ssr landing page layout.</h2>
      {children}
    </div>
  );
};

export default landingLayout;
