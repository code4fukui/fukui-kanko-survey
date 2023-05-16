import { CSV } from "https://js.sabae.cc/CSV.js";

const area = CSV.toJSON(await CSV.fetch("area2023.csv"));
const area2 = CSV.toJSON(await CSV.fetch("area2022.csv"));
for (const a of area2) {
  const n = area.find(i => i.親番号 == a.親番号);
  if (n) {
    if (n.エリア名 != a.エリア名) {
      //throw new Error("area name not match: " + n.エリア名 + " " + a.エリア名);
      console.log("area name not match: " + a.エリア名 + " -> " + n.エリア名);
      n.旧エリア名 = a.エリア名;
    }
  } else {
    a.通し番号 = "";
    area.push(a);
  }
}

const areaw = area.map(a => ({ id: parseInt(a.親番号) - 300000, ...a }));
areaw.sort((a, b) => parseInt(a.id) - parseInt(b.id));
await Deno.writeTextFile("area.csv", CSV.stringify(areaw));
