import { FormValues } from "../Visualizer/Visualizer";

import styles from "./ExampleCases.module.css";

import {
  array1,
  array2,
  array3,
  array4,
  array5,
  array6,
  array7,
  array8,
  array9,
} from "../../constants";

interface ExampleCasesProps {
  setFormValues: (values: FormValues) => void;
}

const ExampleCases = ({ setFormValues }: ExampleCasesProps) => {
  return (
    <>
      <div className={styles.exampleCasesHeader}>Example cases:</div>
      <button onClick={() => setFormValues({ arrayInput: array1, distanceInput: 3 })}>
        Array 1: (11 x 11) 1 positive value, distance threshold: 3
      </button>
      <button onClick={() => setFormValues({ arrayInput: array2, distanceInput: 3 })}>
        Array 2: (11 x 11) 1 positive value, distance threshold: 3
      </button>
      <button onClick={() => setFormValues({ arrayInput: array3, distanceInput: 2 })}>
        Array 3: (11 x 1) 2 positive values, distance threshold: 2
      </button>
      <button onClick={() => setFormValues({ arrayInput: array4, distanceInput: 2 })}>
        Array 4: (5 x 5) 2 positive values, overlapping neighborhoods, distance threshold:
        2
      </button>
      <button onClick={() => setFormValues({ arrayInput: array5, distanceInput: 50 })}>
        Array 5: (100 x 100) Large data set, 2 positive values, distance threshold: 50
      </button>
      <button
        onClick={() => setFormValues({ arrayInput: array6, distanceInput: 1000000 })}
      >
        Array 6 (1 x 1) no positive values, distance threshold: 1000000
      </button>
      <button
        onClick={() => setFormValues({ arrayInput: array7, distanceInput: 1000000 })}
      >
        Array 7 (1 x 1) 1 positive value, distance threshold: 1000000
      </button>
      <button onClick={() => setFormValues({ arrayInput: array8, distanceInput: 10 })}>
        Array 8 (9 x 20) 4 positive corner values, distance threshold: 10
      </button>
      <button onClick={() => setFormValues({ arrayInput: array9, distanceInput: 1 })}>
        Array 9 (100 x 100) 2705 positive values, distance threshold: 1
      </button>
      <button onClick={() => setFormValues({ arrayInput: array9, distanceInput: 0 })}>
        Array 9 (100 x 100) 2705 positive values, distance threshold: 0
      </button>
    </>
  );
};

export default ExampleCases;
