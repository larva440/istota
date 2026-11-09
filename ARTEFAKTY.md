# Rejestr artefaktów

**Powstał: 2026-11-09 11:34.** Zasady: `PROCES.md` §4. Kontrola: `./sprawdz.sh` (wersja programu w `app.py` = wiersz `istota` ze stanem `obowiązuje` = najnowszy wpis w `CHANGELOG.md`).

Przed użyciem bierzesz wersję `obowiązuje`. Każda zmiana to nowy numer i zmiana wiersza w tym samym commicie. Stany: `obowiązuje` · `rozwijana` · `gotowa, czeka` · `wycofana`.

## Rejestr

| id | artefakt | wersja | stan | źródło prawdy | zmiana · commit |
|---|---|---|---|---|---|
| istota | program (backend `app.py`, interfejs `web/`, testy `tests/`) | 0.3.1 | obowiązuje | `app.py` (`VERSION`) | 2026-11-09 16:00 · Claude bez `temperature` (było HTTP 400) |
| istota | ↳ 0.3.0 | 0.3.0 | wycofana | `app.py` (`VERSION`) | 2026-11-09 15:55 · nazwa Istota w interfejsie i promptach |
| istota | ↳ 0.2.0 | 0.2.0 | wycofana | `app.py` (`VERSION`) | 2026-11-09 15:50 · model w chmurze z `.local/istota.env` |
| istota | ↳ 0.1.1 | 0.1.1 | wycofana | `app.py` (`VERSION`) | 2026-11-09 11:34 · zamykanie połączeń z bazą, numer wersji w jednym miejscu |
| istota | ↳ prototyp GPT „JARVIS HYBRID 0.1” | 0.1 | wycofana | commit `187aec9` | 2026-11-09 · bez zmian z `jarvis-hybryda-v0.1.zip` |
| prompt-systemowy | instrukcja systemowa istoty (`SYSTEM` w `app.py`) | 2 | obowiązuje | `app.py` (`SYSTEM`) | 2026-11-09 15:55 · „Jesteś Istota” zamiast „JARVIS HYBRID” |
| prompt-propozycji | polecenia dla modelu przy propozycji umiejętności i planu kodu (`propose` w `app.py`) | 2 | obowiązuje | `app.py` (`propose`) | 2026-11-09 15:55 · „aplikacji Istota” zamiast „JARVIS” |
| sprawdz | kontrola przed commitem (`sprawdz.sh`) | 1.0 | obowiązuje | `sprawdz.sh` | 2026-11-09 11:34 · testy, klucze, imiona, `data/`, wersje, znaczniki czasu |
