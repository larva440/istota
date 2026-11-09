---
name: zmiana-granicy
description: Każda zmiana granic autonomii istoty albo wyjścia danych właściciela poza komputer (repo istota, PROCES §6 i §7) — wykonywanie kodu, dostęp do plików, internetu, terminala, nasłuch poza 127.0.0.1, model albo mowa w chmurze, integracje, dostęp z telefonu. Propozycja z ryzykiem, „tak” autora, test pilnujący nowej granicy, wpis w USTALENIA. Używaj, zanim napiszesz taki kod.
---

# Zmiana granicy (ASY)

Właściciel skilla: ASY.

Kiedy: zmiana poszerza to, co istota może zrobić bez człowieka, albo wysyła dane właściciela poza komputer. Przykłady:
- narzędzie z dostępem do plików lub internetu;
- agent kodujący;
- model w chmurze;
- rozpoznawanie mowy w chmurze;
- nasłuch na 0.0.0.0 albo dostęp z telefonu;
- automatyczne zatwierdzanie umiejętności.

1. **Czas odczytany**, `git pull`. Przeczytaj `PROCES.md` §6 i §7 oraz `USTALENIA.md`. Może ta granica jest już przesunięta decyzją.
2. **Propozycja dla autora, przed kodem:**
   - co się zmienia, jednym zdaniem;
   - co istota będzie mogła zrobić bez człowieka;
   - jakie dane i dokąd wyjdą;
   - najgorszy realny przypadek;
   - jak go blokujemy (zatwierdzenie, kontener, lista dozwolonych, cofnięcie);
   - jak to wyłączyć.
   Pytanie zamknięte: „tak / nie / zmień”.
3. **Bez „tak” autora nie ma kodu**, także „na próbę” i także w gałęzi. Odpowiedź autora dosłownie do `USTALENIA.md` → „Obowiązujące”.
4. **Test granicy w `tests/`.** Sprawdza, że to, co ma być zablokowane, dalej jest zablokowane. Wzór: `test_code_approval_never_executes_code`. Nowa możliwość bez testu granicy nie wchodzi.
5. **Dokumenty:** `PROCES.md` §6 albo §7 (nowy stan granicy, na słowo autora), `README.md` (sekcja o ochronie danych), `STAN.md`.
6. **Domyślnie wyłączone.** Nowa możliwość włącza się ustawieniem właściciela (zmienna środowiska albo przełącznik w interfejsie), nie sama po aktualizacji.
7. Koniec jak w `koniec-tury`: wersja MINOR, `./sprawdz.sh`, commit, raport.
