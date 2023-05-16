import { CSV } from "https://js.sabae.cc/CSV.js";

const list = CSV.toJSON(await CSV.fetch("all.csv"));
const area = CSV.toJSON(await CSV.fetch("area.csv"));
for (const d of list) {
  //console.log(d);
  const name = d["回答エリア"];
  const a = area.find(a => a.エリア名 == name || a.旧エリア名 == name);
  if (!a) {
    console.log(name, a);
    throw new Error();
  }
  //console.log(a.id, a["エリア名"], a["緯度"], a["経度"]);
  //break;
}
//console.log(area);
