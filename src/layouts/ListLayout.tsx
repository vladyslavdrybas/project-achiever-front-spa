import React from "react";

import {Outlet, useRouteLoaderData} from "react-router-dom";
import ThreeColumnGrid from "@/layouts/ThreeColumnGrid";

const AnnLayout: React.FunctionComponent = () => {
    const {
      leftBlocks,
      middleBlocks,
      rightBlocks,
      semiBlocks,
    } = useRouteLoaderData('list-root') as {
      leftBlocks: any[],
      middleBlocks: any[],
      rightBlocks: any[],
      semiBlocks: any[],
    };

    return (
      <ThreeColumnGrid
        leftBlocks={leftBlocks}
        middleBlocks={middleBlocks}
        rightBlocks={rightBlocks}
        semiBlocks={semiBlocks}
        outlet={<Outlet />}
      />
    );
}

export default AnnLayout;
