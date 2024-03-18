import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const list = (await dir2array("./daily")).filter(f => f.length == "20220527.csv".length && f.endsWith(".csv")).sort();
const mlist = [];
let mname = null;
const write = async () => {
  if (mname) {
    await Deno.writeTextFile("monthly/" + mname, CSV.stringify(mlist));
    console.log(mname);
  }
};
for (const fn of list) {
  const csv = await CSV.fetchJSON("daily/" + fn);
  // monthly
  const fn2 = fn.substring(0, 6) + ".csv";
  if (fn2 != mname) {
    write();
    mlist.length = 0;
  }
  mname = fn2;
  csv.forEach(c => mlist.push(c));
}
write();
