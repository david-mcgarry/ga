import React, { useState } from "react";
import styles from "./Visualizer.module.css";
import Grid from "../Grid/Grid";
import ExampleCases from "../ExampleCases/ExampleCases";

export interface FormValues {
  arrayInput: number[][] | undefined;
  distanceInput: number;
}

interface TempFormValues {
  arrayInput: number[][] | string | undefined;
  distanceInput: number | undefined;
}

interface VisualizerProps {
  defaultArray?: number[][];
  defaultDistance?: number;
}

const Visualizer = ({ defaultArray, defaultDistance }: VisualizerProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    arrayInput: defaultArray || undefined,
    distanceInput: defaultDistance || 0,
  });
  const [formTempValues, setFormTempValues] = useState<TempFormValues>({
    arrayInput: undefined,
    distanceInput: undefined,
  });
  const [enableCache, setEnableCache] = useState<boolean>(false);

  const onSubmit = (formData: { arrayInput: string; distanceInput: string }) => {
    const newInput = JSON.parse(formData.arrayInput);
    const newDistance = Number(formData.distanceInput) || 0;

    // Validate input to ensure it is a non-empty array
    if (!Array.isArray(newInput) || newInput.length === 0) {
      console.error("Invalid input format. Please provide a non-empty array.");
      return;
    }
    // Validate input to ensure it is a 2D array
    if (!Array.isArray(newInput[0])) {
      console.error("Invalid input format. Please provide a 2D array.");
      return;
    }
    // Validate input to ensure all rows have the same length
    const rowLength = newInput[0].length;
    if (!newInput.every((row) => Array.isArray(row) && row.length === rowLength)) {
      console.error("Invalid input format. Please ensure all rows have the same length.");
      return;
    }
    // Validate input to ensure all elements are numbers
    if (!newInput.every((row) => row.every((cell: any) => typeof cell === "number"))) {
      console.error("Invalid input format. Please ensure all elements are numbers.");
      return;
    }

    setFormValues({ arrayInput: newInput, distanceInput: newDistance });
  };

  return (
    <>
      <div className={styles.visualizerContainer}>
        <div>
          <form
            className={styles.visualizerForm}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const textarea = form.elements.namedItem(
                "arrayInput"
              ) as HTMLTextAreaElement;
              const distanceInputElement = form.elements.namedItem(
                "distanceInput"
              ) as HTMLInputElement | null;
              onSubmit({
                arrayInput: textarea.value,
                distanceInput: distanceInputElement ? distanceInputElement.value : "2",
              });
            }}
          >
            <label htmlFor="arrayInput">Enter a 2D array:</label>
            <textarea
              className={styles.arrayInput}
              name="arrayInput"
              rows={10}
              cols={50}
              placeholder="ex: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]"
              value={JSON.stringify(formTempValues.arrayInput || undefined)}
              onChange={(e) => {
                let value: number[][] | string | undefined;
                try {
                  value = JSON.parse(e.target.value.replace(/\s+/g, ""));
                } catch (error) {
                  console.error("Invalid JSON format:", error);
                }
                setFormTempValues({
                  ...formTempValues,
                  arrayInput: value,
                });
              }}
            ></textarea>
            <label htmlFor="distanceInput">Enter a distance:</label>
            <input
              className={styles.distanceInput}
              type="text"
              value={formTempValues.distanceInput}
              name="distanceInput"
              placeholder="ex: 2"
              onChange={(e) =>
                setFormTempValues({
                  ...formTempValues,
                  distanceInput: !isNaN(Number(e.target.value))
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </form>
          <div className={styles.arrayButtonsContainer}>
            <ExampleCases setFormValues={setFormValues} />
            <div className={styles.cacheToggleHeader}>
              Store results for previously computed arrays and distances:
            </div>
            <div className={styles.cacheToggle}>
              <input
                type="checkbox"
                checked={enableCache}
                onChange={() => setEnableCache(!enableCache)}
              />
              <div>Enable Cache</div>
            </div>
          </div>
        </div>
        <div className={styles.visualizerGrid}>
          {formValues.arrayInput?.length && (
            <Grid
              height={formValues.arrayInput?.length || 0}
              width={formValues.arrayInput?.[0]?.length || 0}
              distance={formValues.distanceInput || defaultDistance || 0}
              inputValues={formValues.arrayInput || defaultArray || []}
              enableCache={enableCache}
            />
          )}
        </div>
      </div>
      <div className={styles.arrayDataHeader}>Array Data:</div>
      <div className={styles.arrayData}>
        {formValues.arrayInput && JSON.stringify(formValues.arrayInput)}
      </div>
    </>
  );
};

export default Visualizer;
