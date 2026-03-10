# Fukui Tourism Survey Open Data (FTAS) on GitHub

Open data from the Fukui Prefecture Tourism Survey system, published by the [Fukui Tourism Federation](https://www.fuku-e.com/) and hosted by [Code4Fukui](https://github.com/code4fukui).

> **日本語版:** [README.md](README.md)

---

## Overview

This repository distributes machine-readable open data collected by **FTAS** (福井県観光データ分析システム — Fukui Prefecture Tourism Data Analysis System). FTAS deploys QR-code-based survey terminals at tourist spots across Fukui Prefecture, allowing visitors to answer a short questionnaire on-site. The raw responses are published here as CSV files, updated on a daily basis via automated GitHub Actions workflows.

The data covers roughly **98 tourist areas** across **17 municipalities** in Fukui Prefecture (both Reihoku/northern Wakasa coastal area and Reinan/Echizen inland area), including landmarks such as Eiheiji Temple, the Echizen Dinosaur Museum, Tojinbo Cliffs, Awara Onsen, and many more.

---

## Open Data Files

### Survey Response Data

| File | Description |
|---|---|
| [`all.csv`](all.csv) | All survey responses, one row per respondent. Updated daily. |
| [`all-cnt.csv`](all-cnt.csv) | Daily response count summary (`day`, `count`). |
| [`byid/000.csv`](byid/000.csv) | Column schema template (header row only, no data). |
| [`byid/{id}.csv`](byid/) | Survey responses filtered to a single area/facility. The 6-digit filename corresponds to the area ID in the area master. |

**Direct access via GitHub Pages:**
```
https://code4fukui.github.io/fukui-kanko-survey/all.csv
https://code4fukui.github.io/fukui-kanko-survey/byid/{id}.csv
```

### Area Master Data

| File | Description |
|---|---|
| [`area.csv`](area.csv) | Current master list of all tourist areas (IDs, names, descriptions, coordinates). |
| [`area2022.csv`](area2022.csv) | Area master snapshot for fiscal year 2022. |
| [`area2023.csv`](area2023.csv) | Area master snapshot for fiscal year 2023. |
| [`area2024.csv`](area2024.csv) | Area master snapshot for fiscal year 2024. |
| [`area20250513.csv`](area20250513.csv) | Area master snapshot as of May 13, 2025. |

**Direct access via GitHub Pages:**
```
https://code4fukui.github.io/fukui-kanko-survey/area.csv
```

---

## Data Schema

### area.csv — Area Master

| Column (Japanese) | Meaning |
|---|---|
| `id` | Sequential area ID |
| `市町名` | Municipality name |
| `親番号` | Parent area number (6-digit, used as the `byid/` filename) |
| `エリア名` | Area name |
| `エリア説明文` | Area description |
| `通し番号` | Internal serial number |
| `緯度` / `経度` | Latitude / Longitude |
| `旧エリア名` | Previous area name (if renamed) |

### Survey Response Files (all.csv / byid/)

Each row represents one completed survey. Key column groups:

**Respondent profile**
- Member ID, registered facility, gender, birth year, age, age group
- Home prefecture and municipality, household income bracket
- Device type (UA), response timestamp, response month

**Visit details**
- Response area name and area ID, municipality, regional 6-classification, DMO
- Total overnight stays and in-prefecture overnight stays
- Accommodation areas (within/outside Fukui Prefecture)
- Travel companions

**Visit purposes** *(binary flag columns)*
Relaxing at accommodation · Hot springs / outdoor baths · Local cuisine · Nature viewing (cherry blossoms, autumn leaves, etc.) · Historical sites and landmarks · Theme parks / museums / zoos · Shopping · Festivals and events · Sports / concerts · Outdoor activities (swimming, fishing, hiking) · Urban / town walking · Hands-on experiences · Skiing / marine sports · Other sports · Driving / touring · Visiting friends or relatives · Business · Other

**Information sources** *(binary flag columns)*
Tourism fairs / product exhibitions · Newspapers / magazines / guidebooks · TV / radio · Pamphlets / posters · DMO / tourism federation websites · Internet / apps · Twitter · Instagram · Facebook · Blogs · Friends and acquaintances · Tourist information offices · Taxi drivers / locals · Accommodation

**Transportation to Fukui** *(binary flag columns)*
Private car · Rental car · Shinkansen · Conventional rail · Airplane · Tour bus · Fukui resident (no inbound travel)

**In-prefecture transportation** *(binary flag columns)*
Taxi · Local bus · Walking · Rental bicycle

**Satisfaction and spending**
- In-prefecture transport satisfaction and free-text reason
- Accommodation cost, transport cost, in-prefecture consumption (brackets)
- Visit frequency to this area
- Main places visited before/after completing the survey (structured + free text)
- Total spending at this area
- Overall satisfaction rating and reason
- Inconveniences experienced and details
- NPS (Net Promoter Score, 0–10)
- Recommended items, facility improvement requests, future visit intention
- Fukui Prefecture overall requests
- Area service/product satisfaction rating and reason

---

## Municipalities and Areas Covered

The dataset spans tourist spots across all municipalities in Fukui Prefecture:

| Region | Municipalities |
|---|---|
| Reihoku (north) | Fukui City, Sakai City, Awara City, Ono City, Katsuyama City, Eiheiji Town, Echizen City, Sabae City, Ikeda Town, Echizen Town, Minamiechizen Town |
| Reinan (south / Wakasa) | Tsuruga City, Obama City, Mihama Town, Wakasa Town, Oi Town, Takahama Town |

---

## Applications Using This Data

- [**Fukui Tourism Survey Open Data Analysis Tool**](https://github.com/code4fukui/fukui-kanko-stat/) — Statistical analysis and visualization built on top of this dataset.

---

## License

Data is published under **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** by the **[Fukui Tourism Federation](https://www.fuku-e.com/)**.

This is open data released through the [Fukui Prefecture Tourism Data Analysis System "FTAS"](https://www.fuku-e.com/feature/detail_266.html). You are free to use, share, and adapt it for any purpose as long as you credit the source.

**Required attribution:** Fukui Tourism Federation / 福井県観光連盟

---

## Automated Data Pipeline

Data is refreshed by GitHub Actions on a daily schedule:

| Workflow | Schedule (JST) | What it does |
|---|---|---|
| `schduled-make.yml` | 04:25 daily | Runs `makeYearly.js` to generate/update fiscal-year archive files, then commits and pushes. |
| `schduled-fetch.yml.off` | *(disabled)* | Previously fetched the day's raw CSV via SFTP from the FTAS server, then ran `normalizeData.js` and `makeMonthly.js` before committing. |

---

## Maintenance Scripts

All scripts are written in [Deno](https://deno.land/) (TypeScript/JavaScript runtime).

| Script | Purpose |
|---|---|
| `makeYearly.js` | Run once per fiscal year change. Archives data into the `fiscalyearly/` directory. |
| `normalizeData.js` | Normalizes raw daily response files fetched from FTAS. |
| `makeMonthly.js` | Aggregates normalized daily data into monthly files under `monthly/`. |
| `mergeArea2.deno.js` | Merges updated area master information into `area.csv`. |

### Updating the Area Master

When the FTAS system adds or renames tourist areas:

1. Prepare the new area information as a CSV file.
2. Add the new file path to the `AREA_FILES` array in `mergeArea2.deno.js`.
3. Run `mergeArea2.deno.js`.
4. Commit the changes and open a pull request.

### Running the Yearly Archive

At the end of each fiscal year (Japanese fiscal year ends March 31), run:

```sh
deno run -A makeYearly.js
```

This creates a snapshot under `fiscalyearly/` for that year.
