# Stan projektu

**Powstał: 2026-11-09 11:32** · aktualizuj w tym samym commicie co zmiana, której dotyczy.

## Teraz

- **Wersja 0.2.0.** Prototyp GPT „JARVIS HYBRID 0.1” (commit `187aec9`), zamykanie połączeń z bazą (0.1.1), model w chmurze z pliku właściciela (0.2.0).
- **Mózg: Claude w chmurze** (decyzja autora 2026-11-09 15:47). `.local/istota.env` założony, model `claude-sonnet-5-5`; czeka na klucz API od autora.
- Backend korzysta tylko ze standardowej biblioteki Pythona. Działa z Pythonem 3.14 na komputerze autora.
- Testy: 8 testów (5 z prototypu i 3 nowe), przechodzą na Windows.

## Działa

- Rozmowa przez API zgodne z OpenAI Chat Completions, domyślnie Ollama na 127.0.0.1:11434.
- Pamięć: `zapamiętaj: …` oraz panel Pamięć z dodawaniem i usuwaniem.
- Ewolucja: propozycja umiejętności albo planu kodu i zatwierdzenie przez właściciela.
- Głos przez przeglądarkę: Web Speech API i synteza mowy.

## Nie działa albo niesprawdzone

- **Rozmowa czeka na klucz API.** Bez klucza zwraca „Brak połączenia z modelem AI”. Autor wkleja klucz do `.local/istota.env` i uruchamia istotę od nowa.
- Interfejs sprawdzony 2026-11-09: ładuje się, pamięć działa, rozmowa bez modelu zwraca czytelny błąd.
- Głos: rozpoznawanie mowy w Chrome idzie przez serwery Google (`PROCES.md` §7).

## Długi

- Usunięcie wspomnienia nie usuwa go z historii rozmów.
- `relevant_memories` dopasowuje po słowach, nie po znaczeniu.
- Wiadomość właściciela trafia do historii także wtedy, gdy model nie odpowie (`chat`: `add_message` przed `ask_llm`).
- Nazwa: repo nazywa się „istota”, a program w interfejsie mówi o sobie „JARVIS HYBRID” (`USTALENIA.md`, pytanie 1).

## Następne kroki (z README prototypu, kolejność do decyzji autora)

1. Rozpoznawanie i synteza mowy offline z aktywacją głosową.
2. Rozpoznawanie właściciela i profile.
3. Pamięć semantyczna: edycja, kategorie, eksport.
4. Osobisty plan nauki i cykliczne refleksje za zgodą.
5. Agent kodujący w kontenerze: testy, podgląd różnic, zatwierdzenie, cofnięcie.
6. Integracje (Hermes, Letta) po sprawdzeniu zgodności i licencji.
7. Dostęp z telefonu: uwierzytelnianie i HTTPS (to jest wyjście poza localhost, więc wymaga „wdrażaj”).
