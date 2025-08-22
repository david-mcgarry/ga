import Visualizer from "./components/Visualizer/Visualizer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <h1>
          Distance Threshold Visualizer{" "}
          <span className="prototypeText">
            Prototype for General Atomics Coding Challenge
          </span>{" "}
        </h1>
        <p>
          Given a 2D array of numbers, cells with positive values influence their
          neighbors within the specified manhattan distance. Submitted by David McGarry
          08/22/2025{" "}
          <a href="https://github.com/davidmcgarry/distance-threshold-visualizer">
            GitHub Repository (React App with TypeScript)
          </a>
          <a href="https://github.com/davidmcgarry/distance-threshold-visualizer/blob/main/src/utils/utils.ts">
            utilities file (Neighborhood calculation functions)
          </a>
        </p>
      </header>
      <main>
        <Visualizer
          defaultArray={[
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ]}
          defaultDistance={0}
        />
      </main>
    </div>
  );
}

export default App;
