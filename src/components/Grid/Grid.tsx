import { JSX, useEffect, useMemo, useState } from "react";
import GridCell from "./GridCell";
import { generateNeighborhoods, calculateNeighborhoodsSize } from "../../utils/utils";

import styles from "./Grid.module.css";

interface GridProps {
  height: number;
  width: number;
  distance: number;
  inputValues: number[][];
  enableCache: boolean;
}

let timeTaken: number = 0;

const arrayCache: { [key: string]: number[][] } = {};

const Grid = ({
  height,
  width,
  distance,
  inputValues,
  enableCache,
}: GridProps): JSX.Element => {
  // Dynamically set columns
  const gridStyle = {
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
    width: "calc(75vh - 80px)",
    height: `calc(100% / ${height})`,
  };

  // If input is provided, use it; otherwise, initialize an empty grid
  const [neighborhoodsArray, setNeighborhoodsArray] = useState<number[][]>([[]]);

  const cacheKey = `${JSON.stringify(inputValues)}-${distance}`;

  const neighborhoodsSize = calculateNeighborhoodsSize(neighborhoodsArray);

  const gridCells = (
    <>
      {neighborhoodsArray.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <GridCell
            key={`${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
            level={cell}
          />
        ))
      )}
    </>
  );

  useEffect(() => {
    const applyDistanceToInput = (newValues: number[][]): void => {
      // Measure performance
      const start = performance.now();

      // Check if the result is already cached
      if (enableCache && arrayCache[cacheKey]) {
        setNeighborhoodsArray(arrayCache[cacheKey]);
        const end = performance.now();
        timeTaken = end - start;
        return;
      }

      const outputValues = generateNeighborhoods(newValues, width, height, distance);

      //cache the result
      if (enableCache) arrayCache[cacheKey] = outputValues;

      setNeighborhoodsArray(outputValues);

      const end = performance.now();
      timeTaken = end - start;
    };
    if (inputValues.length > 0) {
      applyDistanceToInput(inputValues);
    }
  }, [inputValues, distance, height, width, cacheKey]);

  return (
    <div>
      <div className={styles.gridLegend}>
        <p>
          Grid size: {height} x {width}
        </p>
        <p>Distance threshold: {distance}</p>
      </div>

      <div style={gridStyle} className={styles.grid} data-testid="grid">
        {gridCells}
      </div>
      <div className={styles.gridInfo}>
        <p>Neighborhood calculation time: {(timeTaken / 1000).toFixed(5)} secs</p>
        <p className={styles.neighborhoodSize}>Neighborhood size: {neighborhoodsSize}</p>
      </div>
    </div>
  );
};

export default Grid;
