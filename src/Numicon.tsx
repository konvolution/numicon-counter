import * as React from "react";

export interface NumiconProps {
  color?: string;
  dotColor?: string;
  count?: number;
}

export enum NumiconColor {
  Blue = "#24e",
  Red = "red",
  White = "white"
}

export const Numicon: React.FunctionComponent<NumiconProps> = ({
  color = NumiconColor.Blue,
  dotColor = NumiconColor.White,
  count = 10
}) => {
  const counterStyle = React.useMemo(() => ({ backgroundColor: color }), [
    color
  ]);
  const counterDotStyle = React.useMemo(() => ({ backgroundColor: dotColor }), [
    dotColor
  ]);

  return (
    <div className="Numicon-block">
      {Array.from({ length: Math.ceil(count / 5) }).map((_, row) => (
        <div key={row} className="Numicon-row">
          {Array.from({ length: Math.min(5, count - 5 * row) }).map(
            (_, col) => (
              <span key={col} className="Numicon-counter" style={counterStyle}>
                <span className="Numicon-counter-dot" style={counterDotStyle} />
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
};
