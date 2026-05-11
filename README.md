# Fukui Tourism Survey Open Data

Open data from the Fukui Prefecture Tourism Survey system, published by the [Fukui Tourism Federation](https://www.fuku-e.com/) and hosted by [Code4Fukui](https://github.com/code4fukui).

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

---

## Overview

This repository provides machine-readable open data from the **FTAS** (福井県観光データ分析システム — Fukui Prefecture Tourism Data Analysis System). The system collects responses via QR-code-based survey terminals at tourist spots across Fukui Prefecture.

The raw survey data is fetched daily from an SFTP server, processed by Deno scripts, and committed to this repository via automated GitHub Actions workflows.

The data covers approximately **98 tourist areas** across **17 municipalities** in Fukui Prefecture, including major landmarks such as Eiheiji Temple, the Echizen Dinosaur Museum, Tojinbo Cliffs, and Awara Onsen.

## Data Files

The data is available as CSV files, which can be accessed directly or downloaded.

### Survey Response Data

| File | Description |
|---|---|
| [`all.csv`](all.csv) | All survey responses, with one row per respondent. Updated daily. |
| [`all-cnt.csv`](all-cnt.csv) | A daily summary of response counts (`day`, `count`). |
| [`byid/`](byid/) | Survey responses filtered by a single tourist area/facility. The 6-digit filename `{id}.csv` corresponds to the area ID. |
| [`byid/000.csv`](byid/000.csv) | A template file containing only the header row for the survey data schema. |

**Direct Download URLs (via GitHub Pages):**
```
https://code4fukui.github.io/fukui-kanko-survey/all.csv
https://code4fukui.github.io/fukui-kanko-survey/all-cnt.csv
https://code4fukui.github.io/fukui-kanko-survey/byid/{id}.csv
```

### Area Master Data

| File | Description |
|---|---|
| [`area.csv`](area.csv) | The current master list of all tourist areas, including IDs, names, descriptions, and coordinates. |
| [`area2022.csv`](area2022.csv) | Area master snapshot for fiscal year 2022. |
| [`area2023.csv`](area2023.csv) | Area master snapshot for fiscal year 2023. |
| [`area2024.csv`](area2024.csv) | Area master snapshot for fiscal year 2024. |

**Direct Download URL (via GitHub Pages):**
```
https://code4fukui.github.io/fukui-kanko-survey/area.csv
```

## Data Schema

### `area.csv` — Area Master

| Column (Japanese) | Meaning |
|---|---|
| `id` | Sequential area ID |
| `市町名` | Municipality name |
| `親番号` | Parent area number (6-digit ID used for `byid/` filenames) |
| `エリア名` | Area name |
| `エリア説明文` | Area description |
| `通し番号` | Internal serial number |
| `緯度` / `経度` | Latitude / Longitude |
| `旧エリア名` | Previous area name (if renamed) |

### Survey Response Files (`all.csv`, `byid/*.csv`)

Each row represents one completed survey. Key columns include:

*   **Respondent Profile:** Gender, birth year, age group, home prefecture, household income.
*   **Visit Details:** Response timestamp, response area, municipality, number of overnight stays, travel companions.
*   **Visit Purpose:** A series of binary flag columns for motivations like "Hot springs," "Local cuisine," "Historical sites," "Shopping," etc.
*   **Information Source:** A series of binary flag columns for how visitors learned about the area, such as "Guidebooks," "Internet/apps," "Instagram," "Friends," etc.
*   **Satisfaction & Feedback:** Includes satisfaction scores, Net Promoter Score (NPS), and free-text comments on inconveniences.

## Usage

You can download the CSV files for local analysis using tools like `curl` or by visiting the direct download URLs in your browser.

```bash
# Download the complete survey dataset
curl -L -o all.csv https://code4fukui.github.io/fukui-kanko-survey/all.csv

# Download the current area master list
curl -L -o area.csv https://code4fukui.github.io/fukui-kanko-survey/area.csv
```

The data can be loaded into any spreadsheet software or data analysis tool (e.g., pandas, R, Excel) for further exploration.
