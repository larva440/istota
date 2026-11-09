---
name: dziennik
description: Bieżący zapis pracy nad istotą (repo istota) — każde polecenie autora dosłownie z odczytaną godziną do DZIENNIK.md przed pracą, każdy wynik pod nim, commit i push od razu; decyzje do USTALENIA.md, sprawy dla innych sesji do SKRZYNKA.md. Używaj przy każdej wiadomości autora i po każdym wyniku.
---

# Dziennik (ASY)

Właściciel skilla: ASY.

Kiedy: każda wiadomość autora i każdy wynik. Pochodzi z repo book (autor 2026-10-24 18:48: „chce byś każdorazowo logował do repozytorium informacje dla zeposłu … zebym mógł pracować z dowolnego miejsca”). W tym repo obowiązuje od 2026-11-09.

1. **Czas odczytany:** `TZ="CET-1CEST,M3.5.0,M10.5.0/3" date "+%Y-%m-%d %H:%M:%S"`. Potem `git pull` i wiersze `nowe` do siebie w `SKRZYNKA.md`.
2. **Polecenie trafia do dziennika przed pracą.** W `DZIENNIK.md` pod nagłówkiem dnia (`## RRRR-MM-DD`; dopisz go, jeśli nie ma) dodaj: `**GG:MM — autor, dosłownie:** „…”`. Kilka poleceń w jednej wiadomości to jeden wpis.
   - Dosłownie, bez dopisków z kontekstu.
   - Literówki zostają; to artefakty dyktowania.
   - Zamiast nazwy konta albo prawdziwego imienia wstaw `…` albo imię z prawej kolumny tabeli w repo book.
3. **Decyzja** („tak”, „zmień”, „od teraz”): dodatkowo wiersz w `USTALENIA.md` → „Obowiązujące”, z godziną i słowami autora. Pytanie zamknięte: przekreśl je w „Pytaniach otwartych” i dopisz odpowiedź.
4. **Commit i push od razu:** `git add DZIENNIK.md USTALENIA.md`, commit `[ASY] dziennik: <temat>`, push. Autor może czytać stan z telefonu.
5. **Wynik:** dopisek pod wpisem `→ GG:MM wynik: …` (commit, plik, wersja, liczby, pytanie do autora pełnym brzmieniem). Commit i push razem z plikami wyniku.
6. **Inna sesja ma coś zrobić albo wiedzieć** (ASY w chmurze, inna rola): wiersz w `SKRZYNKA.md` ze stanem `nowe`.

Lekcja (book, 2026-10-24): wynik leżał tylko w sesji, autor z telefonu nie widział stanu. Dlatego wpis powstaje przed pracą, nie po niej.
