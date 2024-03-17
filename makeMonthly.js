import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
//import { Day } from "https://js.sabae.cc/DateTime.js";

const list = (await dir2array("./daily")).filter(f => f.length == "20220527.csv".length && f.endsWith(".csv")).sort();
const mlist = {};
const ylist = {};
const all = [];
for (const fn of list) {
  const csv = CSV.toJSON(await CSV.fetch("daily/" + fn));
  // monthly
  const fn2 = fn.substring(0, 6) + ".csv";
  const ml = mlist[fn2];
  console.log(fn, fn2, fn2 == "202305", ml ? ml.length : 0);
  if (ml) {
    csv.forEach(c => ml.push(c));
  } else {
    const ml2 = mlist[fn2] = [];
    csv.forEach(c => ml2.push(c));
  }
  
  /*
  // fiscal yearly
  const day = fn.substring(0, 8);
  const d = new Day(day);
  const fn3 = "" + d.getFiscalYear() + ".csv";
  const yl = ylist[fn3];
  if (yl) {
    csv.forEach(c => yl.push(c));
  } else {
    const yl2 = ylist[fn3] = [];
    csv.forEach(c => yl2.push(c));
  }
  // all
  csv.forEach(c => all.push(c));
  */
}
for (const name in mlist) {
  const data = mlist[name];
  await Deno.writeTextFile("monthly/" + name, CSV.stringify(data));
  console.log(name);
}
/*
for (const name in ylist) {
  const data = ylist[name];
  await Deno.writeTextFile("fiscalyearly/" + name, CSV.stringify(data));
  console.log(name);
}
await Deno.writeTextFile("all.csv", CSV.stringify(all));
*/
