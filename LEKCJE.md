# Lekcje

**Powstał: 2026-11-09 11:32.** Każda reguła ma tu swój rodowód: data, co się stało, jaka reguła z tego wynikła. Pierwsze wpisy pochodzą z projektu książki (repo book).

- **2026-09 (book)** — godzina z `TZ=Europe/Warsaw` w Git Bash była czasem UTC. Reguła: czas tylko z komendy `TZ="CET-1CEST,M3.5.0,M10.5.0/3" date …`, nigdy z głowy.
- **2026-11-05 (book)** — sesja bez startu pracowała kilka godzin na nieaktualnym stanie. Reguła: start sesji i znacznik czasu w pierwszej odpowiedzi jako dowód.
- **2026-11-06 (book)** — próbka poszła na nieaktualnym szablonie wziętym z bazy. Reguła: jedna wersja `obowiązuje` w `ARTEFAKTY.md`; zmiana = nowy numer w tym samym commicie.
- **2026-11-09 (book)** — klucze podane tylko w jednej komendzie zginęły razem z nią; następna praca czekała, aż autor znów je da. Reguła: klucze w pliku `.local/…` założonym przez autora, poza repo.
- **2026-11-09 (book)** — dwa przyciski prowadzące w to samo miejsce dostały jeden kod, bo skrypt usuwał powtórzone adresy. Nie dało się powiedzieć, którym przyciskiem ktoś wszedł. Reguła: każde miejsce w interfejsie, które mierzymy, ma własny identyfikator.
- **2026-11-09** — testy prototypu na Windows: `with sqlite3.connect()` zatwierdza transakcję, ale nie zamyka połączenia; plik bazy zostaje zablokowany. Reguła: połączenie zawsze zamykane jawnie (`contextlib.closing`), test na Windows.
