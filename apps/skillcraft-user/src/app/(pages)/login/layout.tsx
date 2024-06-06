import { ReactNode } from "react";

interface landingLayoutParams {
  children: ReactNode;
}

const landingLayout = (params: landingLayoutParams) => {
  return (
    <div>
      {params.children}
    </div>
  );
};

export default landingLayout;
