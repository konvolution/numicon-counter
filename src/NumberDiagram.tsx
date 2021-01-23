import * as React from "react";

import { Numicon, NumiconColor } from "./Numicon";

export interface NumberDiagramProps {
  value: number;
}

export const NumberDiagram: React.FunctionComponent<NumberDiagramProps> = ({
  value
}) => {
  const [currentValue, setCurrentValue] = React.useState(0);

  const refUnitsBlock = React.useRef<HTMLDivElement>(null);
  const refNextTensBlock = React.useRef<HTMLDivElement>(null);

  // We render twice whenever the value changes
  React.useEffect(() => setCurrentValue(value), [value]);

  let tensBlockToShift = -1;
  let translateNextTensBlockToUnitsBlock =
    refUnitsBlock.current && refNextTensBlock.current
      ? {
          left:
            refUnitsBlock.current.offsetLeft -
            refNextTensBlock.current.offsetLeft,
          top:
            refUnitsBlock.current.offsetTop - refNextTensBlock.current.offsetTop
        }
      : {
          left: 0,
          top: 0
        };

  // If we're incrementing to an exact multiple of 10 (e.g. 19 -> 20)
  if (value % 10 === 0 && value === currentValue + 1) {
    // Shift the 10s block matching 'value' to the units block
    tensBlockToShift = value;
  }

  // If we're decrementing to a number ending in 9 (e.g. 20 -> 19),
  // shift 1s block to the 10s block that we just removed
  const shiftOnesBlock = value % 10 === 9 && value === currentValue - 1;
  console.log(`ShiftOnesBlock = ${shiftOnesBlock}.`);

  return (
    <div className="NumberDiagram">
      <div className="NumberDiagram-row">
        <div className="NumberDiagram-tens-column NumberDiagram-header">
          Tens
        </div>
        <div className="NumberDiagram-units-column NumberDiagram-header">
          Ones
        </div>
      </div>
      <div className="NumberDiagram-row">
        <div className="NumberDiagram-tens-column">
          {value >= 10 && Math.floor(value / 10)}
        </div>
        <div className="NumberDiagram-units-column">
          {Math.floor(value % 10)}
        </div>
      </div>
      {Array.from({ length: Math.min(Math.ceil(value / 10), 5) }).map(
        (_, row) => {
          const leftTensBlockValue = (row + 6) * 10;
          const rightTensBlockValue = (row + 1) * 10;
          const shiftLeftTensBlock = leftTensBlockValue === tensBlockToShift;
          const shiftRightTensBlock = rightTensBlockValue === tensBlockToShift;

          const leftRef =
            leftTensBlockValue >= value ? refNextTensBlock : undefined;
          const rightRef =
            rightTensBlockValue >= value ? refNextTensBlock : undefined;

          return (
            <div key={row} className="NumberDiagram-row">
              <div className="NumberDiagram-tens-column">
                <div className="NumberDiagram-tens-pair">
                  {value + 1 >= leftTensBlockValue && (
                    <div
                      ref={leftRef}
                      className={
                        leftTensBlockValue === currentValue
                          ? "NumberDiagram-animation"
                          : ""
                      }
                      style={{
                        position: "relative",
                        left: shiftLeftTensBlock
                          ? translateNextTensBlockToUnitsBlock.left
                          : 0,
                        top: shiftLeftTensBlock
                          ? translateNextTensBlockToUnitsBlock.top
                          : 0,
                        opacity: value >= leftTensBlockValue ? 1 : 0
                      }}
                    >
                      <Numicon />
                    </div>
                  )}
                  {value + 1 >= rightTensBlockValue && (
                    <div
                      ref={rightRef}
                      className={
                        rightTensBlockValue === currentValue
                          ? "NumberDiagram-animation"
                          : ""
                      }
                      style={{
                        position: "relative",
                        left: shiftRightTensBlock
                          ? translateNextTensBlockToUnitsBlock.left
                          : 0,
                        top: shiftRightTensBlock
                          ? translateNextTensBlockToUnitsBlock.top
                          : 0,
                        opacity: value >= rightTensBlockValue ? 1 : 0
                      }}
                    >
                      <Numicon />
                    </div>
                  )}
                </div>
              </div>
              <div className="NumberDiagram-units-column">
                {row === 0 && (
                  <div
                    ref={refUnitsBlock}
                    className={
                      currentValue % 10 === 9 ? "NumberDiagram-animation" : ""
                    }
                    style={{
                      position: "relative",
                      zIndex: 1,
                      left: shiftOnesBlock
                        ? -translateNextTensBlockToUnitsBlock.left
                        : 0,
                      top: shiftOnesBlock
                        ? -translateNextTensBlockToUnitsBlock.top
                        : 0,
                      opacity: value % 10 === 0 ? 0 : 1
                    }}
                  >
                    <Numicon color={NumiconColor.Red} count={value % 10 || 9} />
                  </div>
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
