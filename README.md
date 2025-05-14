# SNKRDUNK URL生成ツール

SNKRDUNKの検索URLを簡単に生成するためのツールです。URLパラメータを視覚的に設定して、簡単に検索URLを作成できます。

## 特徴

- 基本的な検索パラメータ設定（キーワード、ブランドIDなど）
- カテゴリ・ブランド指定
- フィルター設定（価格、商品状態、割引など）
- ソート順設定
- 既存URLの解析機能

## 使い方

1. 各タブで必要なパラメータを設定
2. 「URLを生成」ボタンをクリック
3. 生成されたURLをコピーして使用

## パラメータ一覧

### 基本設定
- keywords: 検索キーワード
- brandId: ブランドID
- isSaleOnly: 販売中のみ表示
- isFirstHand: ブランド公式のみ表示

### カテゴリ設定
- rootCategoryId: ルートカテゴリID
- categoryId: カテゴリID
- subCategoryId: サブカテゴリID
- searchCategoryIds: 検索カテゴリID（V3）

### フィルター設定
- isUnderRetail: 定価以下のみ表示
- isDiscount: 割引商品を先頭に表示
- isDiscounted: 割引商品のみ表示
- isDiscountFirst: セール優先表示
- itemConditions: 商品状態
- itemSizes: サイズ
- minPrice: 最低価格
- maxPrice: 最高価格

### ソート設定
- sort: ソート順（V3）
- tab: タブ（V2）

## アクセス方法

このツールには以下のURLからアクセスできます：
https://trontron1234.github.io/snkrdunk_url/
