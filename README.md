# JARVIS HYBRID 0.1

Pierwszy **uruchamialny prototyp** osobistego asystenta, który łączy rozmowę i naukę z kontrolowanym rozwijaniem własnych umiejętności.

## Co działa

- Rozmowa z modelem AI przez API zgodne z OpenAI Chat Completions (domyślnie **lokalna Ollama**).
- Wejście głosowe przez Web Speech API i odczytywanie odpowiedzi przez syntezę mowy przeglądarki (wsparcie zależy od przeglądarki i systemu, a rozpoznawanie mowy może korzystać z usług zewnętrznych).
- Lokalna pamięć i historia rozmów w SQLite (`data/jarvis.sqlite3`). Notatki można dodawać i usuwać.
- Wpisanie `zapamiętaj: ...` jawnie zapisuje wspomnienie.
- Podczas rozmowy do kontekstu trafiają wybrane wspomnienia i zatwierdzone umiejętności.
- Zakładka **Ewolucja**: agent proponuje nową umiejętność (instrukcję tekstową) lub projekt zmiany w kodzie. Właściciel zatwierdza lub odrzuca. Zatwierdzona umiejętność wpływa na kolejne rozmowy.
- Projekty zmian w kodzie **nie wykonują się** ani nie modyfikują plików. To celowe zabezpieczenie na etapie 0.1.

## Uruchomienie (Windows / Linux / macOS)

1. Zainstaluj [Python 3.11+](https://www.python.org/downloads/) i [Ollama](https://ollama.com/download).
2. Pobierz lokalny model, np. `ollama pull llama3.2`. Na komputerze potrzebny jest działający proces Ollama.
3. W katalogu projektu wykonaj:

   ```bash
   python app.py
   ```

4. Otwórz **http://127.0.0.1:8765** w przeglądarce (w systemie Windows działa też `py app.py`).

Nie trzeba `pip install`: backend korzysta tylko ze standardowej biblioteki Pythona.

Możesz również uruchomić plik `start-windows.bat` na Windows.

## Inny model AI

Silnik można przełączyć ustawieniami środowiskowymi (przykład Bash):

```bash
export JARVIS_LLM_URL='https://TWOJ-DOSTAWCA/v1/chat/completions'
export JARVIS_LLM_MODEL='NAZWA-MODELU'
export JARVIS_LLM_API_KEY='TWOJ_KLUCZ'
python app.py
```

W Windows PowerShell ustaw odpowiednie zmienne przez `$env:JARVIS_LLM_URL=...`, itd. **Nigdy nie wpisuj kluczy API do przeglądarki ani do repozytorium.**

## Architektura

```
Przeglądarka (tekst / Web Speech API / synteza mowy)
                |
          HTTP localhost
                |
    Python: JARVIS Hybrid Core
      |         |         |
    Chat     SQLite    Ewolucja
      |       pamięć    propozycje
      |         |         |
  Ollama lub API     Zatwierdzenie przez właściciela
```

**Obecny status**: prototyp samodzielny. Nie instaluje, nie rozszerza ani nie integruje automatycznie Hermes Agent / Letta. Można dodać integrację w następnej wersji. Nie ma stałego nasłuchu na hasło „Jarvis”, automatycznego harmonogramu, swobodnej edycji kodu, kontroli komputera, logowania użytkowników ani aplikacji mobilnej.

## Ochrona danych i granice autonomii

- Serwer nasłuchuje **tylko na 127.0.0.1**. To nie jest aplikacja wystawiona do internetu.
- Wspomnienia, historia i zatwierdzone umiejętności zostają lokalnie na dysku.
- **Uwaga:** gdy wybierzesz chmurowy model AI, wysyłasz do dostawcy także część historii i wybrane wspomnienia. Ponadto niektóre przeglądarki wysyłają nagranie do chmurowej usługi rozpoznawania mowy. Jeśli wymagane jest pełne offline, korzystaj z klawiatury i lokalnego modelu, aż do integracji lokalnego STT/TTS.
- Brak terminala i wykonywania kodu przez AI. Propozycje typu `code` pozostają dokumentem do ręcznego wdrożenia.
- Model może popełniać błędy i wymyślać fakty. Każdą zmianę kodu należy sprawdzić i przetestować przed wdrożeniem.
- Usunięcie wspomnienia **nie usuwa jego treści z historii rozmów** (jeśli została tam zapisana); w wersji 0.1 historię można usunąć ręcznie, zatrzymując program i usuwając bazę danych. Usunięcie `data/jarvis.sqlite3` kasuje wszystkie dane.
- Baza SQLite nie jest szyfrowana. Nie przechowuj w niej haseł ani innych sekretów.

## Następne etapy

1. Rozpoznawanie i synteza mowy offline z aktywacją „Jarvis”.
2. Rozpoznawanie właściciela i wielu profili.
3. Pamięć bardziej semantyczna + edycja, kategoryzowanie i eksport.
4. Osobisty plan nauki, refleksje cykliczne za zgodą użytkownika.
5. Wydzielony bezpieczny kontener agenta kodującego, testy, podgląd różnic, approval, rollback.
6. Integracja Hermes / Letta po sprawdzeniu kompatybilności i licencji.
7. Bezpieczny interfejs z telefonu (uwierzytelnianie + HTTPS).

## Testy

```bash
python -m unittest discover -s tests -v
```
