# File Format Reference

One **row = one exercise**. One file (or one Excel sheet) = one **set**.

## 1. Columns

Headers are case-insensitive and trimmed. Only `paragraph` and answers are required.

| Column | Aliases | Required | Notes |
|---|---|---|---|
| `id` | | no | Unique id. Default `row<N>`. Duplicates get a suffix. |
| `type` | | no | Default `fill_blank`. Unknown types are reported and skipped. |
| `title` | | no | Shown above the paragraph. |
| `instruction` | `instructions` | no | Rich text. |
| `paragraph` | `text`, `passage`, `question` | **yes** | Rich text with blank markers. |
| `answers` | `answer`, `key`, `keys` | **yes*** | *Not needed when `answer1..N` columns are used. |
| `answer1`, `answer2`, ... | `answer 1`, `answer_1`, `answer-1` | | One blank per column (format C). |
| `distractors` | `distractor` | no | Extra wrong blocks, `|` separated. |
| `hint` | | no | Shown after the first Hint tap. Rich text. |
| `explanation` | | no | Shown after Check. Rich text. |
| `tags` | `tag` | no | Comma or `|` separated. |
| `level` | | no | Free text, e.g. `Grade 5`. |
| `shuffle` | | no | `no`, `n`, `false`, `0`, `off` keeps the bank in the written order. Default: shuffled. |
| `image`, `audio`, `model3d` | | no | **Reserved**: parsed and stored, not shown yet. |

## 2. Answer formats

**A) Ordered** (answer *k* goes to blank *k*):

```
answers: wake up|goes off|turn off
```

**B) Numbered, any order** (every item must have a number):

```
answers: 2=goes off|1=wake up|3=turn off
```

**C) One column per blank**:

```
answer1: wake up    answer2: goes off    answer3: turn off
```

**Alternatives** for one blank use `~`. The first one is printed on the block; all are accepted:

```
answers: get up~wake up|brush
```

**Escapes** inside answers and distractors: `\|` = a real `|`, `\~` = a real `~`.

```
answers: OPEN \| CLOSED|cats \~ dogs
```

**Checking rules:** trimmed, case-insensitive, repeated spaces ignored, curly and straight apostrophes/quotes are equal (`Don’t` = `don't`). Blocks with the same text are interchangeable between blanks that accept it.

## 3. Blank markers

All of these are the same kind of blank:

```
___(1)___    (2)    (21)___________    (24)***    __(5)__    {{7}}
```

Rules:

- `{{n}}` and a number wrapped in underscores (any count) or 3+ asterisks are **always** blanks.
- A **bare** `(n)` is a blank only if `n` is between 1 and the number of answers **and** it is not glued to a letter or digit before it. So `(see page 2)`, `(a)`, `Room (12)` (with 6 answers) and `f(1)` stay normal text.
- `\(n)` is always literal text, shown as `(n)`.
- A run of 3+ underscores with no number (`______`) becomes the next number after the highest one, in reading order.
- The underscores/asterisks around a blank are removed, so they never turn into bold or underline.

## 4. Rich text (paragraph, instruction, hint, explanation)

| Write | Result |
|---|---|
| `**bold**` or `<b>bold</b>` / `<strong>` | **bold** |
| `*italic*` or `<i>italic</i>` / `<em>` | *italic* |
| `++underline++` or `<u>underline</u>` | underline |
| real new line, `\n` or `<br>` | line break |
| empty line | new paragraph |
| `$3 \times 4 = 12$` | inline math (KaTeX) |
| `$$\frac{1}{2}$$` | block math |
| `\*`, `\$`, `\+`, `\_`, `\\` | the literal character |

Any other HTML tag is shown as text (never executed).

**Tables** (scroll sideways inside the table on phones). Blanks work inside cells:

```
| Time | Monday | Tuesday |
|---|---|---|
| 9.00 | English | (1) |
```

## 5. File types

- **.csv / .tsv / .txt**: UTF-8 with or without BOM. Comma, semicolon or tab is detected automatically. Quoted fields may contain commas, new lines and `""` (escaped quote).
- **.xlsx**: every sheet becomes one set (`file · sheet`). The first non-empty row is the header.
- **.zip**: every `.csv/.tsv/.txt/.xlsx` inside (any folder) is imported. `__MACOSX` and hidden files are ignored. Other files (images, audio, 3D) are stored in IndexedDB for future versions.

```
my-lessons.zip
├── unit1.csv
├── unit2.xlsx
└── media/
    ├── cat.png
    └── song.mp3
```

## 6. Validation report

Bad rows are skipped; good rows still load. Row numbers count the header as row 1.

| Message | Meaning |
|---|---|
| the paragraph is empty | no text in `paragraph` |
| no answers | no `answers` and no `answer1..N` |
| N blanks but M answers | counts differ (formats A and C) |
| blank (n) appears more than once | duplicate number |
| blank (n) is missing in the paragraph | an answer has no blank |
| answer number n has no blank | format B number not in the paragraph |
| blank (n) has no answer | a blank without an answer |
| numbered and unnumbered answers are mixed | format B needs `n=` on every item |
| Zawgyi text suspected | warning only: convert the file to Unicode |
| no "paragraph" column found | header row is missing or misspelled |

## 7. Saving CSV UTF-8

- **Excel (Windows/Mac):** File > Save As > **CSV UTF-8 (Comma delimited) (*.csv)**.
- **Google Sheets:** File > Download > **Comma-separated values (.csv)** (always UTF-8).
- **LibreOffice:** File > Save As > Text CSV, tick *Edit filter settings*, Character set **Unicode (UTF-8)**.
- Or skip CSV and upload the `.xlsx` directly.
