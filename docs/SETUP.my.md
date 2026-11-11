# တပ်ဆင်ခြင်းနှင့် GitHub Pages တင်နည်း

## က။ ကွန်ပျူတာပေါ်တွင် ချက်ချင်း စမ်းရန် (အင်တာနက် မလို)

1. zip ကို ဖြည်ပါ (Extract All)။
2. `index.html` ကို Chrome / Edge / Firefox ဖြင့် double-click နှိပ်ဖွင့်ပါ။
3. နမူနာ အစု ၂ ခု ပေါ်လာမည်။ CSV ဖိုင်များ ထည့်၍ စမ်းနိုင်သည်။

> `file://` ဖြင့် ဖွင့်လျှင် "App အဖြစ် install" နှင့် offline cache မရပါ (Service Worker ကို browser က ခွင့်မပြုပါ)။ ကျန်တာ အားလုံး အလုပ်လုပ်ပါသည်။

## ခ။ Vendor ဖိုင် ၃ ခု ထည့်ရန် (.xlsx, .zip, သင်္ချာ အတွက်)

| ထည့်ရမည့်နေရာ | ဒေါင်းရမည့် လင့်ခ် |
|---|---|
| `vendor/xlsx.full.min.js` | https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js |
| `vendor/jszip.min.js` | https://github.com/Stuk/jszip/releases/tag/v3.10.1 → Source code zip ထဲမှ `dist/jszip.min.js` |
| `vendor/katex/` | https://github.com/KaTeX/KaTeX/releases/tag/v0.16.11 → `katex.tar.gz` ထဲမှ `katex.min.js`, `katex.min.css`, `fonts/` ဖိုဒါ |

ဖိုင်အမည်ကို အတိအကျ ထားပါ။ မထည့်ရသေးလည်း app ပျက်မသွားပါ (CSV ကတော့ အမြဲ အလုပ်လုပ်သည်)။

## ဂ။ GitHub Pages ပေါ် တင်နည်း

1. https://github.com တွင် login ဝင်ပြီး **New repository** နှိပ်ပါ။
   - Repository name: `fill-in-the-blank`
   - **Public** ကို ရွေးပါ → **Create repository**။
2. **uploading an existing file** (သို့) **Add file > Upload files** ကို နှိပ်ပါ။
3. ဖြည်ထားသော ဖိုဒါထဲမှ **ဖိုင်နှင့် ဖိုဒါ အားလုံး** ကို ဆွဲထည့်ပါ (`index.html` သည် repo ၏ အပေါ်ဆုံးအဆင့်တွင် ရှိရမည်)။
   - `.nojekyll` ဖိုင် (အမည် အစက်နှင့်စသည်) ပါရန် သတိထားပါ။ Windows တွင် မမြင်ရလျှင် View > Hidden items ကို ဖွင့်ပါ။
4. **Commit changes** နှိပ်ပါ။
5. **Settings > Pages** သို့သွားပါ။
   - Source: **Deploy from a branch**
   - Branch: **main**၊ Folder: **/ (root)** → **Save**။
6. ၁-၂ မိနစ် စောင့်ပြီး `https://<username>.github.io/fill-in-the-blank/` ကို ဖွင့်ပါ။
7. "Ready to work offline" ပေါ်လာလျှင် အင်တာနက် ပိတ်ထားလည်း သုံးနိုင်ပါပြီ။
8. Repo ၏ **About** (⚙) တွင် `REPO_META.md` ထဲက description နှင့် topics ကို ကူးထည့်ပါ။

## ဃ။ ဖုန်း / Tablet တွင် App အဖြစ် Install လုပ်ရန်

- **Android (Chrome)** - ⋮ menu > **Install app** (သို့) **Add to Home screen**။
- **iPhone / iPad (Safari)** - Share ⬆ > **Add to Home Screen**။
- Install ပြီးလျှင် Home screen မှ Moo icon ဖြင့် ဖွင့်ပါ။ အင်တာနက် မလိုတော့ပါ။

## င။ Offline စစ်ဆေးရန်

1. အင်တာနက်ဖြင့် app ကို တစ်ကြိမ် ဖွင့်ပြီး "Ready to work offline" ကို စောင့်ပါ။
2. **Airplane mode** ဖွင့်ပါ။
3. App ကို ပိတ်ပြီး ပြန်ဖွင့်ပါ (သို့) Reload လုပ်ပါ။ ပုံမှန် ပွင့်လျှင် အောင်မြင်ပါသည်။

## စ။ App ကို Update လုပ်နည်း

1. ဖိုင်ကို ပြင်ပြီး GitHub သို့ ပြန်တင်ပါ။
2. `sw.js` ထဲက `const VERSION = 'fib-v1.0.0';` ကို `fib-v1.0.1` ကဲ့သို့ **နံပါတ်တိုးပါ**။ (မတိုးလျှင် ကျောင်းသားများဆီ update မရောက်ပါ)
3. ကျောင်းသားများ app ဖွင့်သောအခါ "Update available - Reload" ပေါ်မည်။ Reload နှိပ်ရုံပါပဲ။

## ဆ။ ပြဿနာ ဖြေရှင်းနည်း

| ပြဿနာ | ဖြေရှင်းနည်း |
|---|---|
| GitHub Pages တွင် 404 | `index.html` repo ၏ အပေါ်ဆုံးတွင် ရှိ/မရှိ၊ Pages setting မှန်/မမှန် စစ်ပါ |
| မြန်မာစာ မမြင်ရ/ပျက်နေ | ဖိုင်ကို **CSV UTF-8** ဖြင့် သိမ်းပါ။ ဇော်ဂျီ ဖြစ်နေလျှင် ယူနီကုဒ်သို့ ပြောင်းပါ |
| .xlsx / .zip မရ | `vendor/` ထဲ ဖိုင်အမည် အတိအကျ ရှိ/မရှိ စစ်ပါ |
| Update မရောက် | `sw.js` VERSION တိုးပြီးပြီလား စစ်ပါ |
| "Read" ခလုတ် မပေါ် | စက်ထဲတွင် English အသံ (voice) မရှိပါ။ ဖုန်း Settings > Text-to-speech တွင် English ထည့်ပါ |
| တိုးတက်မှု ပျောက်သွား | Browser data ဖျက်လျှင် ပျောက်သည်။ "Summary > Export results" ဖြင့် မကြာခဏ သိမ်းပါ။ iPhone တွင် Home Screen သို့ install လုပ်ထားပါ |
