import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const list = (await dir2array("./daily")).filter(f => f.length == "20220527.csv".length && f.endsWith(".csv")).sort();
const mlist = [];
let mname = null;
const cnts = [];
const write = async () => {
  if (mname) {
    await Deno.writeTextFile("monthly/" + mname, CSV.stringify(mlist));
    console.log("save", mname, mlist.length);
    mlist.length = 0;
  }
};
for (const fn of list) {
  const csv = await CSV.fetchJSON("daily/" + fn);
  const day = fn.substring(0, 8);
  const ym = fn.substring(0, 6);

  cnts.push({ day, count: csv.length });

  // monthly
  const fn2 = ym + ".csv";
  if (fn2 != mname) {
    await write();
    mname = fn2;
  }
  csv.forEach(c => mlist.push(c));
}
await write();

await Deno.writeTextFile("./all-cnt.csv", CSV.stringify(cnts));
