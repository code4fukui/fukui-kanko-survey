import { CSV } from "https://js.sabae.cc/CSV.js";

const list = await CSV.fetchJSON("all.csv");

const vals = {};
for (const d of list) {
  //console.log(d);
  const name = d["都道府県"];
  let v = vals[name];
  if (!v) {
    v = vals[name] = { cnt: 0 };
  }
  v.cnt++;
  if (!name) {
    console.log(d);
  }
}
console.log(vals);
