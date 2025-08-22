export const generateNeighborhoods = (
  array: number[][],
  width: number,
  height: number,
  distance: number
): number[][] => {
  // Deep clone the array to avoid mutating the original
  const outputArray = structuredClone(array);
  const positiveCells: { rowIndex: number; colIndex: number }[] = [];

  // First, collect all positive cells
  array.forEach((row: any[], rowIndex: number) => {
    row.forEach((cell: number, colIndex: number) => {
      if (cell > 0) {
        positiveCells.push({ rowIndex, colIndex });
      }
    });
  });

  // Then, process only the positive cells
  positiveCells.forEach(({ rowIndex, colIndex }) => {
    // only calculate neighbors within array bounds to avoid unnecessary iterations
    // this optimization is more significant with larger distance values
    const minRow = rowIndex - distance < 0 ? 0 : rowIndex - distance;
    const maxRow = rowIndex + distance >= height - 1 ? height - 1 : rowIndex + distance;
    const minCol = colIndex - distance < 0 ? 0 : colIndex - distance;
    const maxCol = colIndex + distance >= width - 1 ? width - 1 : colIndex + distance;

    // apply the visualization color scheme to neighbors within distance
    // positive value cells are set to 1
    // cells in the neighborhood of positive cells are set to 2
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        // check Manhattan distance
        if (Math.abs(rowIndex - r) + Math.abs(colIndex - c) <= distance) {
          outputArray[r][c] = array[r][c] > 0 ? 1 : 2;
        }
      }
    }
  });

  return outputArray;
};

export const calculateNeighborhoodsSize = (array: number[][]): number => {
  return array.reduce((acc, row) => {
    return acc + row.filter((cell) => cell > 0).length;
  }, 0);
};
