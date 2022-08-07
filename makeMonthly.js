import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const list = (await dir2array("./daily")).filter(f => f.length == "20220527.csv".length && f.endsWith(".csv")).sort();
const mlist = {};
const all = [];
for (const fn of list) {
  const csv = CSV.toJSON(await CSV.fetch("daily/" + fn));
  const fn2 = fn.substring(0, 6) + ".csv";
  const ml = mlist[fn2];
  if (ml) {
    csv.forEach(c => ml.push(c));
  } else {
    mlist[fn2] = csv;
  }
  csv.forEach(c => all.push(c));
}
for (const name in mlist) {
  const data = mlist[name];
  await Deno.writeTextFile("monthly/" + name, CSV.stringify(data));
  console.log(name);
}
await Deno.writeTextFile("all.csv", CSV.stringify(all));
