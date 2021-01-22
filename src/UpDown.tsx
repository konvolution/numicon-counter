import * as React from "react";

export interface UpDownProps {
  onDecrement?: () => void;
  onIncrement?: () => void;
  onReset?: () => void;
}

export const UpDown: React.FunctionComponent<UpDownProps> = ({
  onDecrement,
  onIncrement,
  onReset
}) => (
  <div className="UpDown">
    <div
      className={`UpDown-Button${onReset ? "" : " UpDown-Button-Disabled"}`}
      onClick={onReset}
    >
      0
    </div>
    <div
      className={`UpDown-Button${onDecrement ? "" : " UpDown-Button-Disabled"}`}
      onClick={onDecrement}
    >
      -
    </div>
    <div
      className={`UpDown-Button${onIncrement ? "" : " UpDown-Button-Disabled"}`}
      onClick={onIncrement}
    >
      +
    </div>
  </div>
);
