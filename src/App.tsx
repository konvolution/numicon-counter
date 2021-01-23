import "./styles.css";
import * as React from "react";
import { NumberDiagram } from "./NumberDiagram";
import { UpDown } from "./UpDown";

export default function App() {
  const [value, setValue] = React.useState(0);

  const onIncrement = React.useCallback(() => setValue(value + 1), [value]);
  const onDecrement = React.useCallback(() => setValue(value - 1), [value]);
  const onReset = React.useCallback(() => setValue(0), []);

  return (
    <div className="App">
      <h1>Number visualizer</h1>
      <h2>Press the + and - buttons to count up and down.</h2>

      <div className="App-UpDownContainer">
        <UpDown
          onIncrement={value < 99 ? onIncrement : undefined}
          onDecrement={value > 0 ? onDecrement : undefined}
          onReset={value !== 0 ? onReset : undefined}
        />
      </div>
      <NumberDiagram value={value} />
    </div>
  );
}
