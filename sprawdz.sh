#!/usr/bin/env bash
# Kontrola przed każdym commitem (PROCES.md §2, krok 6). Kod wyjścia 1 = coś do poprawy.
cd "$(dirname "$0")"
export PYTHONUTF8=1
bledy=0
zle() { echo "BŁĄD: $*"; bledy=1; }

# 1. Testy
python -m unittest discover -s tests >/tmp/istota-testy.txt 2>&1 || { tail -20 /tmp/istota-testy.txt; zle "testy nie przechodzą"; }

# 2. Dane właściciela i lokalne pliki poza repo
git ls-files | grep -E '^(data/|\.local/)|\.sqlite3?$|\.env$' && zle "w repo są dane albo pliki lokalne (data/, .local/, *.sqlite3, .env)"

# 3. Klucze (wzorce popularnych dostawców; wartości nie są wypisywane)
if git ls-files -z | xargs -0 grep -IlE '(sk-[A-Za-z0-9_-]{20,}|re_[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|xox[bp]-[A-Za-z0-9-]{20,}|Bearer [A-Za-z0-9._-]{30,})' -- 2>/dev/null | grep -v '^sprawdz.sh$'; then
  zle "w plikach wyżej wygląda na klucz — usuń i unieważnij klucz u dostawcy"
fi

# 4. Imiona i nazwy kont (lista zakazanych słów jak w repo book; prawdziwe imiona: tabela w book/mapowania)
ZAKAZANE='Pablito|larva440|kolofon'
git ls-files -z | xargs -0 grep -IinE "$ZAKAZANE" -- 2>/dev/null | grep -v '^sprawdz.sh:' && zle "zakazane nazwy (konto, pseudonimy) w plikach"
MAP="../book/mapowania/MAPOWANIA.md"
if [ -f "$MAP" ]; then
  # lewa kolumna tabeli (prawdziwe imiona) — tylko nazwy z dużej litery, min. 3 znaki
  python - "$MAP" <<'PY' || bledy=1
import re, subprocess, sys
imiona = set()
for w in open(sys.argv[1], encoding='utf-8'):
    if not w.startswith('|') or set(w.strip()) <= set('|- '):
        continue
    k = [x.strip() for x in w.strip().strip('|').split('|')]
    if len(k) < 2:
        continue
    prawa = set(re.findall(r'\w+', k[1]))
    for s_ in re.findall(r'\b[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{2,}\b', re.sub(r'\(.*?\)', '', k[0])):
        if s_ not in prawa:
            imiona.add(s_)
pliki = subprocess.run(['git', 'ls-files'], capture_output=True, text=True).stdout.split()
zle = []
for p in pliki:
    if p == 'sprawdz.sh':
        continue
    try:
        t = open(p, encoding='utf-8').read()
    except Exception:
        continue
    for i in imiona:
        if re.search(r'\b' + i + r'\w*', t):
            zle.append(f'{p}: imię z lewej kolumny mapowań')
if zle:
    print('BŁĄD: ' + '\n'.join(sorted(set(zle))))
    sys.exit(1)
PY
fi

# 5. Wersje: app.py = ARTEFAKTY (istota, obowiązuje) = CHANGELOG
v_app=$(sed -nE "s/^VERSION = '([0-9.]+)'.*/\1/p" app.py)
v_art=$(grep -E '^\| istota \|' ARTEFAKTY.md | grep '| obowiązuje |' | awk -F'|' '{gsub(/ /,"",$4); print $4}')
v_chg=$(grep -m1 -E '^## [0-9]' CHANGELOG.md | sed -E 's/^## ([0-9.]+).*/\1/')
[ "$v_app" = "$v_art" ] && [ "$v_app" = "$v_chg" ] || zle "wersje się nie zgadzają: app.py=$v_app, ARTEFAKTY=$v_art, CHANGELOG=$v_chg"

# 6. Znacznik czasu w dokumentach procesu
for f in CLAUDE.md PROCES.md STAN.md USTALENIA.md SKRZYNKA.md DZIENNIK.md LEKCJE.md ARTEFAKTY.md; do
  [ -f "$f" ] && ! grep -qE '\*\*Powstał: [0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}' "$f" && zle "$f bez znacznika „**Powstał: RRRR-MM-DD GG:MM**”"
done

[ $bledy = 0 ] && echo "sprawdz.sh: OK (testy, dane, klucze, imiona, wersja $v_app, znaczniki)"
exit $bledy
