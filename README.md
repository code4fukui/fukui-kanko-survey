# FTASオープンデータ on GitHub

## オープンデータ

- 福井県観光アンケート [日時更新、月別](monthly) / [日時更新、日別](daily) / アーカイブ [年度別](fiscalyearly)
- "回答エリア"マスター [area.csv](area.csv) ([https://code4fukui.github.io/fukui-kanko-survey/area.csv](https://code4fukui.github.io/fukui-kanko-survey/area.csv))
- エリア別スポット [spot.csv](spot.csv) ([https://code4fukui.github.io/fukui-kanko-survey/spot.csv](https://code4fukui.github.io/fukui-kanko-survey/spot.csv))

## 活用アプリ

- [福井県観光アンケートオープンデータ解析ツール](https://github.com/code4fukui/fukui-kanko-stat/)

## ライセンス

- [CC BY](https://creativecommons.org/licenses/by/4.0/deed.ja) [福井県観光連盟](https://www.fuku-e.com/)
- [福井県観光データ分析システム「FTAS」](https://www.fuku-e.com/feature/detail_266.html)により公開された、福井県観光連盟によるオープンデータです。出典元を記載いただければどなたでも自由にお使いいただけます

## バッチ処理

年度変更で動かす → filicalyearly に年度ごとにバックアップ
```
deno run -A makeYearly.js
```

## エリア情報の更新

1. 更新用のエリア情報をCSVファイルで作成する
2. `mergeArea2.deno.js`の`AREA_FILES`に、更新用のCSVファイルを追加する
3. `mergeArea2.deno.js`を実行する
4. コミットしてPRを作成する
