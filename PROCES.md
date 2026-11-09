# Proces pracy — istota

**Powstał: 2026-11-09 11:30** (ASY lokalna; autor 10:57: „cały proces zefiniowany pracy nad tym”). Zmienia wyłącznie autor; propozycje zmian piszesz w `SKRZYNKA.md` z adresatem „autor”.

Ten plik jest nadrzędny w sprawach pracy: kto, kiedy, w jakiej kolejności, co zostawia po sobie. Pochodzi z procesu projektu książki (repo book: `eksperyment-5/PROCES.md`), z lekcjami wbudowanymi w punkty.

## 1. Role

- **Autor** (właściciel istoty) decyduje o celach, granicach autonomii, wyjściu danych poza komputer, wdrożeniu i nazwie.
- **ASY** prowadzi pracę: dyspozytor i wykonawca w jednym. Zapisuje polecenia i decyzje, zleca, pisze kod i testy, pilnuje rejestru i kontroli.
  - **ASY lokalna** pracuje na komputerze autora: uruchamia program, ma model lokalny.
  - **ASY w chmurze** pracuje z telefonu autora: kod, dokumenty, przegląd.
  - Obie piszą do siebie przez `SKRZYNKA.md`.
- **GPT** dał prototyp 0.1. Kolejne propozycje od GPT (pliki, zip, wklejki) traktujemy jak wkład z zewnątrz: najpierw przegląd (§5), potem włączenie jako osobny commit z opisem, co weszło.
- Nowe role (np. tester głosu, recenzent bezpieczeństwa) powołuje ASY na słowo autora; opis roli trafia do tego paragrafu.

## 2. Cykl zmiany

1. **Polecenie** autora trafia do `DZIENNIK.md` (dosłownie, z godziną). Jeśli coś ustala, trafia też do `USTALENIA.md`.
2. **Propozycja.** Jeśli zmiana dotyka §6 (granice) albo §7 (dane), pokaż autorowi propozycję i czekaj na „tak” (skill `zmiana-granicy`). W pozostałych przypadkach od razu krok 3.
3. **Zmiana i test.** Każda zmiana zachowania ma test w `tests/`. Błąd zgłoszony przez autora najpierw dostaje test, który go pokazuje, a dopiero potem poprawkę.
4. **Uruchomienie.** Zmianę w interfejsie albo głosie sprawdzasz w działającym programie (przeglądarka, 127.0.0.1:8765), nie tylko w testach. Jeśli się nie da (brak modelu, brak mikrofonu), napisz to wprost.
5. **Wersja.** Nowy numer w `app.py`, `ARTEFAKTY.md` i `CHANGELOG.md`, jednym commitem (§4).
6. **Kontrola:** `./sprawdz.sh`.
7. **Zamknięcie** (skill `koniec-tury`):
   - wynik do `DZIENNIK.md`;
   - `STAN.md`: co działa, co nie działa i co dalej;
   - commit, push;
   - raport autorowi, zaczynając od wyniku.

## 3. Start sesji

Kroki są w `CLAUDE.md` („Start każdej sesji”). Pierwsza odpowiedź ze znacznikiem czasu jest dowodem, że start się odbył. Odpowiedź bez znacznika oznacza, że startu nie było: przerwij, zrób start i powiedz o tym autorowi.

Lekcja z book (2026-11-05): sesja, która ominęła start, pracowała na nieaktualnym stanie przez kilka godzin.

## 4. Rejestr artefaktów

Artefakty z wersjami zapisuje `ARTEFAKTY.md`. Artefakt to wszystko, czego używamy albo co robimy dla właściciela: program, prompt systemowy, szablony propozycji, skrypty, opis architektury.

- Przed użyciem bierzesz wersję `obowiązuje`. Masz w ręku inną (z pamięci, z kopii, z poprzedniej rozmowy)? Jest nieaktualna.
- Każda zmiana to nowy numer i zmiana wiersza w tym samym commicie.
- Stany:
  - `obowiązuje`: tej używamy;
  - `rozwijana`: w pracy;
  - `gotowa, czeka`: zrobiona, czeka na decyzję;
  - `wycofana`: nie używać, zostaje dla historii.
- Numeracja programu: `0.MINOR.PATCH`. MINOR to nowa umiejętność albo zmiana zachowania. PATCH to poprawka bez zmiany zachowania.

Lekcja z book (2026-11-06): próbka listu poszła na nieaktualnej wersji szablonu, bo sesja wzięła go z bazy, a nie z rejestru.

## 5. Wkład z zewnątrz (GPT, zip, biblioteki)

1. Każde archiwum rozpakowujesz do osobnego, pustego katalogu roboczego poza repo. Nie uruchamiasz z niego nic, zanim nie przeczytasz kodu.
2. Przegląd pod kątem:
   - co program robi w sieci;
   - czy wykonuje kod lub polecenia;
   - gdzie zapisuje dane;
   - jakie ma zależności i licencje.
   Wynik przeglądu idzie do `DZIENNIK.md`.
3. Pierwszy commit włącza wkład **bez zmian**, z opisem źródła. Poprawki idą osobnymi commitami, żeby historia pokazywała, co było cudze, a co nasze.
4. Nowa zależność (pakiet pip/npm, model, usługa) wchodzi tylko z wpisem w `USTALENIA.md`: co, po co, licencja, czy działa offline.

## 6. Granice autonomii istoty

Zmienia je tylko autor, skill `zmiana-granicy`. Stan od 0.1:

1. Serwer nasłuchuje tylko na 127.0.0.1. Odrzuca obce `Host` i `Origin`, co chroni przed DNS rebinding.
2. Model nie ma terminala, plików poza własną bazą ani internetu. Nie wykonuje kodu.
3. Umiejętność to tekst instrukcji. Działa dopiero po „Zatwierdź” właściciela.
4. Propozycja zmiany kodu to dokument do ręcznego wdrożenia. Zatwierdzenie niczego nie uruchamia.
5. Wspomnienia i historia są danymi, nie poleceniami: nie nadpisują instrukcji systemowej.

Każde poszerzenie tych granic dostaje test, który pilnuje nowej granicy. Przykład: agent kodujący tylko w kontenerze, z podglądem różnic i możliwością cofnięcia.

## 7. Dane właściciela

- Baza `data/jarvis.sqlite3` leży lokalnie, nie jest szyfrowana i nie trafia do repo.
- Wyjście danych poza komputer to decyzja autora w `USTALENIA.md`. Dotyczy:
  - modelu w chmurze (wysyła historię i wspomnienia);
  - rozpoznawania mowy w przeglądarce (może wysyłać nagranie);
  - każdej integracji.
- **Stan od 2026-11-09 15:47 (decyzja autora, `USTALENIA.md`):** model w chmurze to Claude (API Anthropic). Włącza go plik właściciela `.local/istota.env` (poza repo); bez pliku istota wraca do modelu lokalnego. Do Anthropic wychodzą przy każdej wiadomości: polecenie systemowe, zatwierdzone umiejętności, dopasowane wspomnienia i ostatnie wiadomości rozmowy. Klucz wpisuje autor; ASY go nie czyta i nie zapisuje.
- Usunięcie wspomnienia nie usuwa go z historii rozmów (0.1). Do czasu poprawki mów to wprost, gdy właściciel kasuje coś wrażliwego.

## 8. Skille

Skille leżą w `.claude/skills/`. Procedura, która wraca drugi raz, dostaje skill; tworzy go i utrzymuje każda rola (skill `nowy-skill`). Każdy skill ma właściciela, a poprawia go każdy, kto trafi w nim na błąd.

- `dziennik`: polecenia i wyniki do `DZIENNIK.md`, commit i push od razu (wykonuje i jest właścicielem: ASY; od 2026-11-09).
- `koniec-tury`: wersja, rejestr, STAN, kontrola, commit, raport (każda rola; właściciel: ASY).
- `nowy-skill`: tworzenie i utrzymanie skilli (każda rola; właściciel: ASY).
- `zmiana-granicy`: propozycja zmiany §6 albo §7, „tak” autora, test granicy, wpis w USTALENIA (wykonuje: ASY; właściciel: ASY).

## 9. Skrzynka

`SKRZYNKA.md` przenosi polecenia i meldunki między sesjami (lokalna, chmura, inne role) i do autora. Wiersz ma postać: data i godzina, od kogo, do kogo, treść, stan (`nowe` / `wykonane`). Na początku sesji czytasz wiersze `nowe` do siebie.

## 10. Lekcje

Źródło reguł: `LEKCJE.md`. Każdy błąd, który mógłby wrócić, dostaje tam jedną linię: data, co się stało i jaka reguła z tego wynikła.
