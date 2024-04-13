import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

await Deno.remove("byid", { recursive: true });
await Deno.mkdir("byid", { recursive: true });

const list = (await dir2array("./daily")).filter(f => f.length == "20220527.csv".length && f.endsWith(".csv")).sort();
for (const fn of list) {
  console.log(fn);
  const csv = await CSV.fetchJSON("daily/" + fn);
  for (const d of csv) {
    const id = parseInt(d.会員ID);
    const path = "byid/" + ((id / 100) >> 0) + "00"; // merge by 100IDs
    const fn = path + ".csv";
    const data = await CSV.fetchJSON(fn, []);
    data.push(d);
    //await Deno.mkdir(path, { recursive: true });
    await Deno.writeTextFile(fn, CSV.stringify(data));
  }
}
