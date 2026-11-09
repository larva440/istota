# Zmiany

Najnowsze na górze. Format nagłówka: `## x.y.z · RRRR-MM-DD`; `./sprawdz.sh` porównuje go z `VERSION` w `app.py`.

## 0.2.0 · 2026-11-09

- Model w chmurze (decyzja autora 15:47): ustawienia właściciela z `.local/istota.env` (poza repo), tylko klucze `JARVIS_*`, zmienna środowiska wygrywa. Bez pliku nic się nie zmienia (model lokalny).
- Status pokazuje silnik „Claude (chmura)”, gdy adres prowadzi do Anthropic.
- Testy granicy `test_local_env_boundary` i `test_default_model_is_loopback`.

## 0.1.1 · 2026-11-09

- Połączenie z bazą jest zawsze zamykane (`connection()` jako menedżer kontekstu). Dotąd `with sqlite3.connect()` tylko zatwierdzało transakcję; na Windows plik bazy zostawał zablokowany, a każde żądanie zostawiało otwarte połączenie.
- Numer wersji w jednym miejscu: `VERSION` w `app.py` (status API, nagłówek serwera, komunikat startowy).
- Test `test_connection_is_closed`.
- Repo: zasady i proces pracy (`CLAUDE.md`, `PROCES.md` i reszta), skille, `sprawdz.sh`.

## 0.1 · 2026-11-09

- Prototyp GPT „JARVIS HYBRID 0.1”, włączony bez zmian (commit `187aec9`).
