const assert = require("assert");
const Romkan = require("./dist");
assert(Romkan.romkan("wareomouyueniwareari") === "われおもうゆえにわれあり");
assert(Romkan.romkan("われおもうゆえにわれあり") === "われおもうゆえにわれあり");

// http://www.aozora.gr.jp/cards/000067/card47171.html
// ローマ字論者への質疑 萩原 朔太郎
assert.strictEqual(
  Romkan.romkan(
    "nihongonokenzennahatuikuto sonokokugonojunsuiseiwogaidokusurumonoha jituniseikounakangotokanji tokunimeijiirairanzousareruhonnyakukangotokanjidearu"
  ),
  "にほんごのけんぜんなはついくと そのこくごのじゅんすいせいをがいどくするものは じつにせいこうなかんごとかんじ とくにめいじいらいらんぞうされるほんやくかんごとかんじである"
);
assert.strictEqual(
  Romkan.romkan(
    "kotobaniitibantaisetunajoukenha mimidekiiteimigawakarutoifukotodearu"
  ),
  "ことばにいちばんたいせつなじょうけんは みみできいていみがわかるといふことである"
);
assert.strictEqual(
  Romkan.romkan(
    "mimidekiiteimigawakarazu mojinikaitemisetauede hajimetesikakukaragoigatuuzurutoifuyaunakotobawo nitijougonokaiwanisiyousuruyaunakokumingaarutositara sekaidemottomofubenndesaiakunokokugowosyoyuusuruminzokutoiwanebanaranu"
  ),
  "みみできいていみがわからず もじにかいてみせたうえで はじめてしかくからごいがつうずるといふやうなことばを にちじょうごのかいわにしようするやうなこくみんがあるとしたら せかいでもっともふべんでさいあくのこくごをしょゆうするみんぞくといわねばならぬ"
)
