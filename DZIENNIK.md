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

→ 11:34 uruchomienie w przeglądarce (127.0.0.1:8765, baza próbna poza repo): interfejs się ładuje; „Zapamiętaj: …” zapisuje do pamięci; rozmowa zwraca „Brak połączenia z modelem AI. Uruchom Ollama…” (Ollamy nie ma na komputerze, zgodnie z oczekiwaniem). Dług: wiadomość właściciela trafia do historii także wtedy, gdy model nie odpowie.

→ 11:34 commity `ef79332` (0.1.1) i `1b6c786` (proces), push.

**15:44 — autor, dosłownie:** „odpal istotę”

→ 15:44 wynik: istota 0.1.1 działa na http://127.0.0.1:8765 (proces w tle, panel przeglądarki otwarty, baza `data/jarvis.sqlite3`). Interfejs się ładuje. Rozmowa z modelem nie zadziała, dopóki nie ma Ollamy albo innego modelu (pytanie otwarte „model lokalny czy chmura”).

**15:46 — autor, dosłownie:** „Nie mogę odpowiedzieć: Brak połączenia z modelem AI. Uruchom Ollama i pobierz model albo skonfiguruj chmurowe API”

→ 15:48 wynik: decyzja „Chmura: Claude API” (USTALENIA). Istota 0.2.0: czyta ustawienia właściciela z `.local/istota.env` (poza repo). Plik założony z adresem Anthropic i modelem `claude-sonnet-5-5`, pole klucza puste dla autora. 8 testów OK, w tym test granicy.

**15:52 — autor, dosłownie:** „Istota”
