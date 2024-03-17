import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const path = "./daily/";
const list = (await dir2array(path)).filter(f => f.endsWith(".csv"));
for (const fn of list) {
  const txt = await Deno.readTextFile(path + fn);
  const csv = await CSV.fetch(path + fn);
  const txt2 = CSV.encode(csv);
  if (txt[0] != txt2[0]) {
    //console.log(fn, txt.length, txt2.length);
    await Deno.writeTextFile(path + fn, txt2);
  }
}
