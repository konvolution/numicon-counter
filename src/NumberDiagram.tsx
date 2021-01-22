import * as React from "react";

import { Numicon, NumiconColor } from "./Numicon";

function fadeIn(
  node: React.ReactNode,
  doFade: boolean = true
): React.ReactNode {
  return doFade ? <div className="fadeIn">{node}</div> : node;
}

export interface NumberDiagramProps {
  value: number;
  delta?: number;
}

export const NumberDiagram: React.FunctionComponent<NumberDiagramProps> = ({
  value,
  delta = 0
}) => (
  <div className="NumberDiagram">
    <div className="NumberDiagram-row">
      <div className="NumberDiagram-tens-column NumberDiagram-header">10s</div>
      <div className="NumberDiagram-units-column NumberDiagram-header">1s</div>
    </div>
    <div className="NumberDiagram-row">
      <div className="NumberDiagram-tens-column">
        {value >= 10 && Math.floor(value / 10)}
      </div>
      <div className="NumberDiagram-units-column">{Math.floor(value % 10)}</div>
    </div>
    {Array.from({ length: Math.min(Math.ceil(value / 10), 5) }).map(
      (_, row) => (
        <div className="NumberDiagram-row">
          <div className="NumberDiagram-tens-column">
            <div className="NumberDiagram-tens-pair">
              {value - (row + 5) * 10 >= 10 && fadeIn(<Numicon />)}
              {value - row * 10 >= 10 && fadeIn(<Numicon />)}
            </div>
          </div>
          <div className="NumberDiagram-units-column">
            {row === 0 &&
              value % 10 !== 0 &&
              fadeIn(
                <Numicon color={NumiconColor.Red} count={value % 10} />,
                value % 10 === 9 && delta === -1
              )}
          </div>
        </div>
      )
    )}
  </div>
);
