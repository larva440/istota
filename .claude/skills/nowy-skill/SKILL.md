---
name: nowy-skill
description: Utworzenie albo zmiana skilla w repo istota (.claude/skills/) — gdy procedura lub błąd wraca drugi raz albo autor mówi „zrób do tego skilla”, „rób sobie skille”. Format, właściciel, wpis w PROCES §8, CLAUDE.md i AGENTS.md, dziennik. Każda rola.
---

# Nowy skill (każda rola)

Właściciel skilla: ASY.

Kiedy: autor mówi „zrób skilla do…” albo ta sama procedura wraca drugi raz. Wzór z repo book (2026-11-09): „rób sobie skille i zapisj w repo żeby nie powtarzac tych samych kroków i skryptów”.

1. **Czas odczytany**, `git pull`. Słowa autora dosłownie do `DZIENNIK.md`.
2. **Sprawdź, czy już nie ma** (`head -4 .claude/skills/*/SKILL.md`). Jest podobny? Zmień go, zachowując to, co działa; nie twórz drugiego.
3. **Nazwa:** kebab-case po polsku, czynność (`koniec-tury`, `zmiana-granicy`). Bez nazwy konta.
4. **Plik `.claude/skills/<nazwa>/SKILL.md`:**
   - frontmatter: `name` = katalog; `description` = co robi i kiedy używać, słowami autora;
   - linia `Właściciel skilla: X.`;
   - „Kiedy:” z wzorem (data, godzina, słowa autora);
   - kroki numerowane i wykonalne (komenda, ścieżka, plik). Pierwszy krok: czas i `git pull`. Ostatnie: `./sprawdz.sh`, commit, raport;
   - powtarzalne komendy jako skrypt w repo (np. `narzedzia/`), nie do przepisywania z głowy; skill wskazuje skrypt;
   - lekcje wpisane w kroki, z datą.
5. **Wpisy:** linia w `PROCES.md` §8; lista w `CLAUDE.md` („Skille”) i w `AGENTS.md`; wynik w `DZIENNIK.md`.
6. **Test na sucho:** przeczytaj skill jak nowa sesja bez tej rozmowy. Wie, co zrobić? Brakuje ścieżki albo kryterium, to dopisz.
7. `./sprawdz.sh`, commit `[ASY] skill <nazwa>: …`, push. Autorowi jedno zdanie: nazwa i kiedy go użyć.
