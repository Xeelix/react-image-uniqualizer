import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={clsx("mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
};
