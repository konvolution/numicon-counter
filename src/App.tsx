import "./styles.css";
import * as React from "react";
import { NumberDiagram } from "./NumberDiagram";
import { UpDown } from "./UpDown";

export default function App() {
  const [state, setState] = React.useState({ value: 0, delta: 0 });

  const onIncrement = React.useCallback(
    () => setState({ value: state.value + 1, delta: 1 }),
    [state]
  );
  const onDecrement = React.useCallback(
    () => setState({ value: state.value - 1, delta: -1 }),
    [state]
  );
  const onReset = React.useCallback(() => setState({ value: 0, delta: 0 }), []);

  const { value, delta } = state;

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
      <NumberDiagram value={value} delta={delta} />
    </div>
  );
}
