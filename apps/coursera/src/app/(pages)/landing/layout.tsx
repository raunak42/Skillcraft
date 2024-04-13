'use client'
import { ReactNode } from "react";

interface landingLayoutParams {
  children: ReactNode;
}

const landingLayout = (params: landingLayoutParams) => {
  return (
    <div>
      <h2>This is the landing page layout.</h2>
      {params.children}
    </div>
  );
};

export default landingLayout;
