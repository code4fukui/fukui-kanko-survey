import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const writeall = false;

const list = (await dir2array("./monthly")).filter(f => f.length == "202205.csv".length && f.endsWith(".csv")).sort();
console.log(list);

const ylist = {};
const all = [];
for (const fn of list) {
  const csv = CSV.toJSON(await CSV.fetch("monthly/" + fn));
  console.log(fn);

  // fiscal yearly
  const day = fn.substring(0, 6) + "01";
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
  if (writeall) {
    csv.forEach(c => all.push(c));
  }
}
for (const name in ylist) {
  const data = ylist[name];
  await Deno.writeTextFile("fiscalyearly/" + name, CSV.stringify(data));
  console.log(name);
}

if (writeall) {
  await Deno.writeTextFile("all.csv", CSV.stringify(all));
  console.log("all.csv");
}