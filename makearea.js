import { CSV } from "https://js.sabae.cc/CSV.js";

const list = CSV.toJSON(await CSV.fetch("spot.csv"));
const area = CSV.toJSON(await CSV.fetch("area0.csv"));
for (const a of area) {
  const spot = list.find(d => d.親番号 == a.親番号);
  if (!spot["緯度"]) {
    console.log(d, spot);
    throw new Error();
  }
  a.緯度 = spot.緯度;
  a.経度 = spot.経度;
  if (!a.エリア名.endsWith(" エリア")) {
    if (a.エリア名.endsWith("エリア")) {
      a.エリア名 = a.エリア名.substring(0, a.エリア名.length - 3);
    }
    a.エリア名 += " エリア";
    console.log(a.エリア名)
  }
  //break;
}
//console.log(area);
await Deno.writeTextFile("area.csv", CSV.stringify(area));
