# Stan projektu

**Powstał: 2026-11-09 11:32** · aktualizuj w tym samym commicie co zmiana, której dotyczy.

## Teraz

- **Nazwa: Istota** (decyzja autora 2026-11-09 15:52).
- **Wersja 0.3.1.** Prototyp GPT „JARVIS HYBRID 0.1” (commit `187aec9`), zamykanie połączeń z bazą (0.1.1), model w chmurze z pliku właściciela (0.2.0), nazwa Istota (0.3.0), Claude bez `temperature` (0.3.1).
- **Mózg: Claude w chmurze** (decyzja autora 2026-11-09 15:47). `.local/istota.env` założony, model `claude-sonnet-5-5`, klucz wpisał autor. Rozmowa sprawdzona 2026-11-09 15:54: Istota odpowiada po polsku i przedstawia się jako Istota.
- Backend korzysta tylko ze standardowej biblioteki Pythona. Działa z Pythonem 3.14 na komputerze autora.
- Testy: 9 testów (5 z prototypu i 4 nowe), przechodzą na Windows.

## Działa

- Rozmowa przez API zgodne z OpenAI Chat Completions, domyślnie Ollama na 127.0.0.1:11434.
- Pamięć: `zapamiętaj: …` oraz panel Pamięć z dodawaniem i usuwaniem.
- Ewolucja: propozycja umiejętności albo planu kodu i zatwierdzenie przez właściciela.
- Głos przez przeglądarkę: Web Speech API i synteza mowy.

## Nie działa albo niesprawdzone

- Mikrofon w panelu przeglądarki aplikacji jest zablokowany; głos do sprawdzenia w Chrome.
- Interfejs sprawdzony 2026-11-09: ładuje się, pamięć działa, rozmowa bez modelu zwraca czytelny błąd.
- Głos: rozpoznawanie mowy w Chrome idzie przez serwery Google (`PROCES.md` §7).

## Długi

- Usunięcie wspomnienia nie usuwa go z historii rozmów.
- `relevant_memories` dopasowuje po słowach, nie po znaczeniu.
- Wiadomość właściciela trafia do historii także wtedy, gdy model nie odpowie (`chat`: `add_message` przed `ask_llm`). Widać to już w rozmowie: po nieudanych próbach wiadomości stoją w historii podwójnie.
- Nazwy techniczne zostały po prototypie: zmienne `JARVIS_*`, baza `jarvis.sqlite3`.

## Następne kroki (z README prototypu, kolejność do decyzji autora)

1. Rozpoznawanie i synteza mowy offline z aktywacją głosową.
2. Rozpoznawanie właściciela i profile.
3. Pamięć semantyczna: edycja, kategorie, eksport.
4. Osobisty plan nauki i cykliczne refleksje za zgodą.
5. Agent kodujący w kontenerze: testy, podgląd różnic, zatwierdzenie, cofnięcie.
6. Integracje (Hermes, Letta) po sprawdzeniu zgodności i licencji.
7. Dostęp z telefonu: uwierzytelnianie i HTTPS (to jest wyjście poza localhost, więc wymaga „wdrażaj”).
