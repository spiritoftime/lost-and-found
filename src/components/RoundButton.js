import React from "react";

const RoundButton = ({
  children,
  bgColorClass = "",
  borderColorClass = "",
  hoverColorClass = "",
  onClick = undefined,
}) => {
  let classes = `flex items-center cursor-pointer  justify-center gap-2 rounded-[30px] border-2 px-2 py-2`;
  if (bgColorClass) classes += ` ${bgColorClass}`;
  if (borderColorClass) classes += ` ${borderColorClass}`;
  if (hoverColorClass) classes += ` ${hoverColorClass}`;
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default RoundButton;
