import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const list = (await dir2array("./")).filter(f => f.endsWith(".csv"));
for (const fn of list) {
  const csv = await CSV.fetch(fn);
  if (csv[0][0] == "") {
  }
}

