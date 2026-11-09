---
name: koniec-tury
description: Zamknięcie tury pracy nad istotą (repo istota) — testy, wersja w trzech miejscach, rejestr ARTEFAKTY.md, STAN.md, dziennik, sprawdz.sh, commit i push, raport autorowi od wyniku. Używaj na końcu każdej tury, przed commitem zmiany programu albo procesu.
---

# Koniec tury (każda rola)

Właściciel skilla: ASY.

1. **Czas odczytany** (`TZ="CET-1CEST,M3.5.0,M10.5.0/3" date "+%Y-%m-%d %H:%M:%S"`), `git pull`.
2. **Testy:** `python -m unittest discover -s tests -v`. Każda zmiana zachowania ma test. Błąd zgłoszony przez autora ma test, który go pokazywał przed poprawką.
3. **Uruchomienie.** Zmianę widoczną dla właściciela (interfejs, głos, odpowiedzi) sprawdź w działającym programie: `python app.py`, potem http://127.0.0.1:8765. Czego nie dało się sprawdzić (brak modelu, mikrofonu), napisz w raporcie wprost.
4. **Wersja**, jeśli zmienił się program (`PROCES.md` §4):
   - `VERSION` w `app.py`;
   - wiersz `istota` w `ARTEFAKTY.md` (poprzednia wersja `wycofana`);
   - nagłówek `## x.y.z · RRRR-MM-DD` w `CHANGELOG.md` z listą zmian.
   Zmiana promptu (`SYSTEM`, polecenia w `propose`) to nowy numer w wierszu `prompt-systemowy` albo `prompt-propozycji`.
5. **STAN.md:** co działa, co nie, długi, następny krok. Stan zmieniasz w tym samym commicie co rzecz, której dotyczy.
6. **Dziennik:** wynik pod poleceniem (skill `dziennik`). Nowa lekcja (błąd, który mógłby wrócić): jedna linia w `LEKCJE.md`.
7. **Kontrola:** `./sprawdz.sh` musi dać OK. Nie obchodź go. Jeśli strażnik się myli, popraw strażnika osobnym commitem i opisz to.
8. **Commit:** tylko własne ścieżki.
   - Zmiana programu: `x.y.z: opis`.
   - Reszta: `[ASY] opis`.
   Push.
9. **Raport autorowi:**
   - pierwsza linia: znacznik czasu;
   - potem wynik jednym zdaniem;
   - co sprawdzone, czego nie sprawdzono i dlaczego;
   - pytania do decyzji, każde osobno.
