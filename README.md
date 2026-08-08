# Minecraft VIP Shop

GitHub Pagesにそのまま置ける静的サイトです。

## 内容
- `index.html` : VIP 1,000円の購入ページ
- `legal.html` : 特定商取引法に基づく表記テンプレート
- `privacy.html` : プライバシーポリシーテンプレート

## Stripe設定
`index.html` の次の行を探してください。

```js
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/REPLACE_ME";
```

Stripeで1,000円の商品・Payment Linkを作成したあと、
`REPLACE_ME` のURL全体を本物のPayment Linkへ変更してください。

## 注意
この静的サイトだけでは、支払い後のMinecraftランク自動付与まではできません。
自動付与にはWebhookを受け取るバックエンド、またはサーバー側プラグイン等が必要です。
