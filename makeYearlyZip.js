import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
//import { zip } from "https://taisukef.github.io/zlib.js/es/zip.js";
import "https://cdn.jsdelivr.net/npm/jszip@3.2.1/dist/jszip.js";

const list = (await dir2array("./monthly")).filter(f => f.length == "202205.csv".length && f.endsWith(".csv")).sort();
console.log(list);

const ylist = {};
const all = JSZip();
for (const fn of list) {
  const bin = await Deno.readFile("monthly/" + fn);
  console.log(fn);

  // fiscal yearly
  const day = fn.substring(0, 6) + "01";
  const d = new Day(day);
  const fn3 = "" + d.getFiscalYear() + ".zip";
  let yl = ylist[fn3];
  if (!yl) {
    yl = ylist[fn3] = new JSZip();
  }
  yl.file(fn, bin);
  
  // all
  all.file(fn, bin);
}
for (const name in ylist) {
  const data = ylist[name];
  const bin2 = await data.generateAsync({ type: "uint8array" });
  await Deno.writeTextFile("fiscalyearly/" + name, bin2);
  console.log(name);
}
const all2 = await all.generateAsync({ type: "uint8array" });
await Deno.writeTextFile("all.zip", all2);
console.log("all.zip");
