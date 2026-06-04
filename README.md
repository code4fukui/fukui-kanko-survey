# Fukui Tourism Survey Open Data

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Open data from the Fukui Prefecture Tourism Survey system, published by the [Fukui Tourism Federation](https://www.fuku-e.com/) and hosted by [Code4Fukui](https://github.com/code4fukui).

---

## Overview

This repository distributes machine-readable open data collected by **FTAS** (福井県観光データ分析システム — Fukui Prefecture Tourism Data Analysis System). FTAS deploys QR-code-based survey terminals at tourist spots across Fukui Prefecture, allowing visitors to answer a short questionnaire on-site. The raw responses are published here as CSV files, updated daily via automated GitHub Actions workflows.

The data covers approximately **98 tourist areas** across **17 municipalities** in Fukui Prefecture (both Reihoku/northern Wakasa coastal area and Reinan/Echizen inland area), including landmarks such as Eiheiji Temple, the Echizen Dinosaur Museum, Tojinbo Cliffs, Awara Onsen, and many more.

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
| [`area20260407.csv`](area20260407.csv) | Area master snapshot as of April 7, 2026. |
| [`area20260521.csv`](area20260521.csv) | Area master snapshot as of May 21, 2026. |

**Direct access via GitHub Pages:**
```
https://code4fukui.github.io/fukui-kanko-survey/area.csv
```

---

## Data Schema

### `area.csv` — Area Master

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

### Survey Response Files (`all.csv` / `byid/`)

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
- Relaxing at accommodation · Hot springs / outdoor baths · Local cuisine · Nature viewing (cherry blossoms, autumn leaves, etc.) · Historical sites and landmarks · Theme parks / museums / zoos · Shopping · Festivals and events · Sports / concerts · Outdoor activities (swimming, fishing, hiking) · Urban / town walking · Hands-on experiences · Skiing / marine sports · Other sports · Driving / touring · Visiting friends or relatives · Business · Other

**Information sources** *(binary flag columns)*
- Tourism fairs / product exhibitions · Newspapers / magazines / guidebooks · TV / radio · Pamphlets / posters · DMO / tourism federation websites · Internet / apps · Twitter · Instagram · Facebook · Blogs · Friends and acquaintances · Other
