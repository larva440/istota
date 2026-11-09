# Instrukcje projektu — istota

**Powstał: 2026-11-09 11:28** (ASY lokalna, na polecenie autora 10:57: „skonfiguruj, dodaj zasady itd. to wszystko co mamy w innych projektach - cały proces zefiniowany pracy nad tym … postaw szystko u nas i rozwijamy”).

To repozytorium zawiera **istotę**: osobistego asystenta, który rozmawia, uczy się i proponuje własne ulepszenia, a decyzję zostawia właścicielowi. Punktem wyjścia jest prototyp od GPT, „JARVIS HYBRID 0.1”: pierwszy commit, bez zmian. Proces pracy przeniesiono z projektu książki (repo book) i dostosowano do programu.

Proces jest w `PROCES.md`; ten plik streszcza go dla każdej sesji. Przy sprzeczności wygrywa `PROCES.md`.

## Start każdej sesji — zanim odpowiesz

Dotyczy każdej sesji, która dotyka tego repo albo spraw istoty, także czatu, który zaczyna się od zwykłego pytania:

1. `git pull`, potem `STAN.md`, `SKRZYNKA.md` (wiersze bez odhaczenia), `USTALENIA.md`.
2. Rola domyślna: **ASY** (`PROCES.md` §1). Inną rolę przyjmujesz tylko na słowo autora.
3. **Każda odpowiedź zaczyna się linią `RRRR-MM-DD GG:MM:SS · temat`.** Czas odczytujesz, nigdy nie szacujesz:
   `TZ="CET-1CEST,M3.5.0,M10.5.0/3" date "+%Y-%m-%d %H:%M:%S"`. Komenda ze strefą `Europe/Warsaw` zwraca w Git Bash na Windows czas UTC; nie używaj jej.
4. **Zanim użyjesz czegokolwiek, co istnieje** (wersja programu, prompt systemowy, szablon, skrypt): sprawdź w `ARTEFAKTY.md`, która wersja `obowiązuje`. Każda zmiana to nowy numer i zmiana wiersza w tym samym commicie.
5. Zanim zbudujesz coś nowego, sprawdź w repo i w skrzynce, czy to już nie istnieje.

## Zasady twarde

- **Polecenie autora od razu do `DZIENNIK.md`.** Dosłownie, z odczytaną godziną, zanim zaczniesz pracę. Potem dopisz wynik, zrób commit i push. Autor pracuje z telefonu i z kilku sesji naraz; stan ma być w repo, nie w rozmowie (skill `dziennik`).
- **Każda wypowiedź autora, która coś ustala, to decyzja.** Trafia do `USTALENIA.md` z godziną i słowami autora, w tej samej turze.
- **Nie zmyślamy.** Brak faktu (o autorze, jego celach, systemie, licencji biblioteki) = pytanie do autora albo sprawdzenie u źródła. Nigdy nie wypełniaj luki z głowy. To samo dotyczy samej istoty: nie twierdzi, że coś zrobiła, jeśli nie ma do tego narzędzia.
- **Granice autonomii istoty** (z prototypu, `PROCES.md` §6) zmienia **tylko autor**, słowem „tak” na konkretną propozycję:
  - serwer nasłuchuje tylko na 127.0.0.1;
  - model nie wykonuje kodu ani poleceń;
  - umiejętność działa dopiero po zatwierdzeniu przez właściciela;
  - propozycja zmiany kodu to dokument, nie zmiana.
- **Dane właściciela nie wychodzą z komputera bez decyzji.** Dotyczy to modelu w chmurze, rozpoznawania mowy w chmurze i każdej integracji. Najpierw zapis w `USTALENIA.md`, potem kod.
- **Klucze nigdy w repo** (także prywatnym) i nigdy w czacie. Program czyta je ze zmiennych środowiska; lokalny plik, jeśli jest potrzebny, leży w `.local/` (poza repo). Nie wypisuj ich, nie szukaj ich po dysku.
- **Baza istoty (`data/`) nie trafia do repo.** Są w niej rozmowy i wspomnienia właściciela.
- **Anonimowość.** W repo nie ma prawdziwych imion domowników ani osób trzecich, nazwisk, nazw kont, adresów i numerów. Ta sama tabela imion co w książce: repo book, `mapowania/MAPOWANIA.md`, tylko prawa kolumna. Pilnuje tego `./sprawdz.sh`.
- **Nie wdrażaj bez „wdrażaj”.** Diagnoza, propozycja, kod i testy w repo: samodzielnie. Na słowo autora: wystawienie poza localhost, dostęp z telefonu, wysyłka czegokolwiek do ludzi, instalacja usług w systemie.
- **Nic nie kasujesz bez zrozumienia, co to jest.** Usunięcia, które zatrzyma kontrola bezpieczeństwa, zostawiasz autorowi.
- **Żadnych artefaktów claude.ai.** Wszystko w repo.

## Wersje

- Numer programu jest w `app.py` (`VERSION`), w wierszu `istota` w `ARTEFAKTY.md` i w `CHANGELOG.md`. Wszystkie trzy zmieniasz w jednym commicie. `./sprawdz.sh` sprawdza, czy się zgadzają.
- Prompt systemowy (`SYSTEM` w `app.py`) to osobny artefakt `prompt-systemowy` z własnym numerem. Zmiana jednego zdania to nowa wersja.
- Commit: `x.y.z: opis` dla zmiany programu; `[ASY] …` dla dziennika, procesu i dokumentów.

## Kontrola

Przed każdym commitem: `./sprawdz.sh`. Uruchamia testy, sprawdza klucze, imiona i `data/` w repo, zgodność wersji i znaczniki czasu.

## Głos i język

- Dokumentacja, komentarze, komunikaty dla właściciela: **po polsku**.
- Kontrakty po angielsku: nazwy pól API, tabel i kolumn, eksportowane funkcje, klucze JSON. Zmienne lokalne i pomocnicze mogą być po polsku.
- Istota mówi do właściciela po polsku, naturalnie i konkretnie. Bez obietnic narzędzi, których nie ma.
- Autor pisze z dyktowania; literówki w jego poleceniach to artefakty dyktowania. Do dziennika idą dosłownie.

## Skille

Procedura, która wraca drugi raz, dostaje skill w `.claude/skills/` (skill `nowy-skill`). Teraz są:
- `dziennik`: polecenia i wyniki do `DZIENNIK.md`;
- `koniec-tury`: wersja, rejestr, STAN, kontrola, commit, raport;
- `nowy-skill`: jak tworzyć i utrzymywać skille;
- `zmiana-granicy`: każda zmiana granic autonomii albo wyjścia danych poza komputer.
