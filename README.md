# コンサル転職比較ナビ

MyVision・AXIS Agent・ASSIGNの比較と、コンサル転職に関する7本の記事を掲載する静的サイトです。

## Cloudflare Workersで公開

- 接続するリポジトリ：TOMMY05141234/consultenshoku
- Production branch：main
- Build command：空欄
- Deploy command：`npx wrangler deploy`
- Root directory：リポジトリ直下

`wrangler.jsonc`の`assets.directory`で`./dist`を指定しています。Workerスクリプトやビルドは不要です。Git連携後、mainへの更新が自動デプロイされます。各記事はディレクトリ内のindex.htmlで配信し、存在しないURLは404になります。

Pagesを新規に使う場合は、PagesプロジェクトでFramework=None、Build command=空欄、Build output directory=distを指定します。現在のwrangler.jsoncはWorkers用です。

## ページ

- `/`：転職エージェント3社比較
- `/articles/`：記事一覧
- `/career-20s/`：20代のキャリアの悩み
- `/consulting-no-experience/`：未経験コンサル転職
- `/case-interview-support/`：ケース面接対策
- `/choose-career-agent/`：相談先の選び方
- `/consulting-salary-career/`：年収と仕事内容
- `/first-agent-consultation/`：初回面談の不安と準備
- `/ai-consulting-career/`：AI時代のコンサル転職

## 更新時の注意

`dist`が公開ファイルです。A8の申込先はHTMLと`dist/affiliate-links.json`の両方に設定しています。変更する際は両方を更新してください。各ページに3社の計測画像を設置しています。成果条件・掲載サイトの登録はA8側で確認してください。

おすすめ記事は、このブラウザ内の閲覧記事・選択テーマで並び替えます。履歴はサーバーに送信せず、読者がリセットできます。数字の出典は本文および`dist/evidence-sources.json`に記載しています。

会社ロゴは公式サイトの画像を使用し、写真は生成したイメージ画像です。
