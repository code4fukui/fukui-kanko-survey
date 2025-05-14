import { CSV } from "https://js.sabae.cc/CSV.js";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/colors.ts";

/** @type {Array<string>} */
const AREA_FILES = [
  "area2023.csv",
  "area2024.csv",
  "area20250513.csv",
];

/** @type {Array<Record<string, string>>} */
let processAreas = CSV.toJSON(await CSV.fetch("area2022.csv"))

for (const filepath of AREA_FILES) {
  console.log("processing", filepath);
  processAreas = processAreas.map(area => ({...area, 通し番号: "" }));

  /** @type {Array<Record<string, string>>} */
  const updatedAreas = CSV.toJSON(await CSV.fetch(filepath));

  for (const updatedArea of updatedAreas) {
    const existingAreaIndex = processAreas.findIndex(
      (area) => area.親番号 === updatedArea.親番号
    );

    if (existingAreaIndex !== -1) {
      const existingArea = processAreas[existingAreaIndex];
      if (existingArea.エリア名 !== updatedArea.エリア名) {
        console.log(
          colors.bgYellow("MOD:") +
            existingArea.エリア名 +
            " -> " +
            updatedArea.エリア名
        );
        updatedArea.旧エリア名 = existingArea.エリア名;
      } else if (existingArea.旧エリア名) {
        updatedArea.旧エリア名 = existingArea.旧エリア名;
      }
      processAreas[existingAreaIndex] = {
        ...updatedArea,
      };
    } else {
      console.log(colors.bgGreen("ADD:") + updatedArea.エリア名);
      processAreas.push(updatedArea);
    }
  }
}

const result = processAreas.map((area) => ({
  id: parseInt(area.親番号) - 300000,
  ...area,
}));
result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
console.log(colors.bgBlue("sum:"), result.length);
await Deno.writeTextFile("area.csv", CSV.stringify(result));
