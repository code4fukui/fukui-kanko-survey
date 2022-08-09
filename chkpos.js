import { CSV } from "https://js.sabae.cc/CSV.js";

const list = CSV.toJSON(await CSV.fetch("all.csv"));
const area = CSV.toJSON(await CSV.fetch("area.csv"));
for (const d of list) {
  //console.log(d);
  const darea = d["回答エリア2"];
  const n = 300000 + parseInt(darea);
  //const a = area.find(a => a.親番号 == n);
  const a = area.find(a => a.エリア名 == d["回答エリア"]);
  if (!a || !a["緯度"]) {
    console.log(darea, a);
    throw new Error();
  }
  console.log(n, a["エリア名"], a["緯度"], a["経度"]);

  //break;
}
//console.log(area);
