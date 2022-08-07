import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const list = (await dir2array("./daily")).filter(f => f.endsWith(".csv"));
for (const fn of list) {
  const csv = await CSV.fetch("daily/" + fn);
  if (csv[0][0] == "会員情報") {
    csv.splice(0, 1);
    await Deno.writeTextFile("daily/" + fn, CSV.encode(csv));
  }
}
