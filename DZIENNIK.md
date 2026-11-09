# Dziennik

**Powstał: 2026-11-09 11:32.** Każde polecenie autora dosłownie, z odczytaną godziną, zanim zacznie się praca; pod nim wynik. Commit i push od razu (skill `dziennik`).

## 2026-11-09

**10:57 — autor, dosłownie:** „nowe repo: https://github.com/…/istota / skonfiguruj, dodaj zasady itd. to wszystko co mamy w innych projektach - cały proces zefiniowany pracy nad tym, a w zip masz prototyp od GPT, jeszczw go nie widziałem, postaw szystko u nas i rozwijamy” (zip: `jarvis-hybryda-v0.1.zip`).

→ 11:28 przegląd prototypu (`PROCES.md` §5), 8 plików:
- tylko standardowa biblioteka Pythona, bez zależności;
- serwer na 127.0.0.1, odrzuca obce `Host`/`Origin`;
- sieć: tylko wywołanie modelu (`JARVIS_LLM_URL`, domyślnie Ollama lokalnie);
- nie wykonuje kodu ani poleceń;
- dane w `data/jarvis.sqlite3`, poza repo;
- interfejs bez zewnętrznych skryptów (CSP `self`).

Commit `187aec9`: prototyp bez zmian.

→ 11:28 testy na Windows: 5 z 5 sprawdzeń przechodzi, ale każdy test kończy się błędem przy sprzątaniu. Przyczyna: `with sqlite3.connect(...)` nie zamyka połączenia, więc plik bazy zostaje zablokowany. To też wyciek w działającym programie. Poprawka: 0.1.1.

→ 11:32 zasady i proces z book: `CLAUDE.md`, `AGENTS.md`, `PROCES.md`, `STAN.md`, `USTALENIA.md` (4 pytania otwarte), `SKRZYNKA.md`, `ARTEFAKTY.md`, `CHANGELOG.md`, `LEKCJE.md`, `sprawdz.sh`, skille `dziennik`, `koniec-tury`, `nowy-skill`, `zmiana-granicy`.
