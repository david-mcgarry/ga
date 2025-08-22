import styles from "./Grid.module.css";

interface GridCellProps {
  rowIndex: number;
  colIndex: number;
  level: number;
  //onClick: () => void;
}

const GridCell = ({ rowIndex, colIndex, level /*, onClick */ }: GridCellProps) => (
  <div
    className={`${styles.gridCell} ${styles[`level${level}`]}`}
    key={`${rowIndex}-${colIndex}`}
    //onClick={onClick}
  ></div>
);

export default GridCell;
