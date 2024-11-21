
 2. Skal dokumentere hvilke api-endepunkter (ressurser) som skal brukesSkal til hvert api-endepunkt dokumentere hvilke verb som er tilgjengelig. </br> 
3.Hva slags forespørsler skal de håndtere. Skal til hvert api-endepunkt dokumentere responsen og statuskoden for de ulike verbene.</br>
 4. Hva slags data skal returneres når det går riktig / feil.Skal dokumentere hvilke sider (urler) som skal benytte de ulike APIene og </br>
 5. grovt hva som kan gjøres på den enkelte siden. Hvilke sider i "app" skal 
opprettes og grovt hva som kan gjøres på de ulike sidene. </br>

# login & registering</br>

+-------------------+           +--------------------+           +--------------------+</br>
| /register         | POST ---->| /api/register      |           | Opprett ny bruker   |</br>
|                   |           |                    |           | Respons: 201 / 400  |</br>
+-------------------+           +--------------------+         +--------------------+</br>
-------↓ ---------             ---------↓----------                       ↓
  Ved registrering           Naviger til /login          Gå til innlogging side</br>
       ↓                                ↓                               ↓
+-------------------+           +--------------------+           +--------------------+</br>
| /login            |  POST ---->| /api/login         |           | Logg inn bruker     | </br>
|                   |          |                    |           | Respons: 200 / 401  | </br>
+-------------------+          +--------------------+           +--------------------+ </br>
          ↓                              ↓                              ↓</br>
  Bruker logger inn        Naviger til hovedside         Få tilgang til funksjoner</br>
          ↓                             ↓  </br>                             ↓</br>
+-------------------+          +--------------------+</br>
| Logg ut           | POST ---->| /api/logout        |</br>
+-------------------+           +--------------------+</br>

# Verb og Statuskode Beskrivelse </br>
-> api/login	</br>
-> ["POST"] :200 OK, Vellykket innlogging.</br>
401 Unauthorized	Ugyldig e-post eller passord.</br>
->api/logout</br>
-> ["POST"]:200 OK, Vellykket utlogging.</br>
->api/register</br>
-> ["POST"] POST:201 Created, Ny bruker registrert. 400 Bad Request. Feil i forespørselen (f.eks. ugyldig data).
409 Conflict E-post allerede registrert.

# opprett arrangemang fra bruker </br>

+-------------------+           +--------------------+           +--------------------+ </br>
| /create-event     | POST ---->| /api/events        |           | Opprett nytt arrangement |</br>
+-------------------+           +--------------------+           +--------------------+</br>
          ↓</br>
  Naviger til arrangementsliste</br>
          ↓</br>
+-------------------+           +--------------------+</br>
| /view-events      | GET ---->| /api/events        |</br>
+-------------------+           +--------------------+</br>
          ↓                              ↓</br>
+-------------------+           +--------------------+</br>
| /add-participant  | POST ---->| /api/events/{id}/participants |</br>
+-------------------+           +--------------------+</br>
          ↓                              ↓</br>
+-------------------+           +--------------------+</br>
| /view-participants| GET ---->| /api/events/{id}/participants |</br>
+-------------------+           +--------------------+</br>
# Verb og	Statuskode	Beskrivelse </br>
-> api/events, ["POST"]	201 Created	Arrangementet ble opprettet:kommer</br>
json</br>
{</br>
"message": "Event created successfully",</br>
"id": 1</br>
}</br>
400 Bad Request	Feil i forespørselen:</br>
{</br>
"error": "Invalid input data"</br>
}</br>
-> api/events</br>
["GET"], 200 OK	Returnerer en liste over arrangementer i JSON-format.</br>
404 Not Found	Ingen arrangementer funnet:</br>
{</br>
"error": "No events found"</br>
}</br>
-> api/events/{id}/participants</br>
 ["POST"] 201 Created Ny deltaker lagt til i JSON-format.</br>
{</br>
"message": "Participant added successfully",</br>
"participant_id": 1</br>
}</br>
400 Bad Request	Feil i forespørselen:</br>
{</br>
"error": "Invalid input data"</br>
}</br>
-> api/events/{id}/participants</br>
["GET"]	200 OK	Returnerer en liste over deltakere for arrangementet i JSON-format.</br>
404 Not Found	Ingen deltakere funnet:</br>
{</br>
"error": "No participants found"</br>
}</br>


# Opprett arrangement fra admin side </br>
1. Opprett Arrangement:</br>
+------------------------+            +---------------------------+</br>
| Velg mal eller scratch | POST ---->| POST /api/events          |</br>
| Fra scratch:           |           | Status: 201 Created        |</br>
| - Fyll inn data        |           | Respons: { "id": 1 }      |</br>
| Eksisterende mal:      |           | Status: 400 Bad Request    |</br>
| - Tilpass data          |           | Respons: { "error": "Invalid input data" } |</br>
+------------------------+</br>
          ↓</br>
2. Administrasjon av Arrangementer:</br>
+-----------------------+            +---------------------------+</br>
| Liste over arrangement| GET ----->| GET /api/events           |</br>
|                       |           | Status: 200 OK            |</br>
|                       |           | Respons: [{ "id": 1 }]    |</br>
|                       |           | Status: 404 Not Found     |</br>
|                       |           | Respons: { "error": "No events found" } |</br>
+-----------------------+</br>
          ↓</br>
+-----------------------+            +---------------------------+</br>
| Endre arrangement     | PUT ----->| PUT /api/events/{id}      |</br>
|                       |           | Status: 200 OK            |</br>
|                       |           | Respons: { "message": "Event updated successfully" } |</br>
|                       |           | Status: 400 Bad Request    |</br>
|                       |           | Respons: { "error": "Invalid data" } |</br>
+-----------------------+</br>
          ↓</br>
+-----------------------+            +---------------------------+</br>
| Slett arrangement     | DELETE -->| DELETE /api/events/{id}   |</br>
|                       |           | Status: 200 OK            |</br>
|                       |           | Respons: { "message": "Event deleted successfully" } |</br>
|                       |           | Status: 404 Not Found     |</br>
|                       |           | Respons: { "error": "Event not found" } |</br>
+-----------------------+</br>
          ↓
3. Administrasjon av Påmeldinger:</br>
+------------------------+            +---------------------------+</br>
| Liste over deltakere   | GET ----->| GET /api/events/{id}/participants |</br>
|                       |           | Status: 200 OK            |</br>
|                       |           | Respons: [{ "id": 1, "name": "John" }] |</br>
|                       |           | Status: 404 Not Found     |</br>
|                       |           | Respons: { "error": "No participants found" } |</br>
+------------------------+</br>
          ↓</br>
+------------------------+            +---------------------------+</br>
| Legg til deltaker      | POST ---->| POST /api/events/{id}/participants |</br>
|                       |           | Status: 201 Created        |</br>
|                       |           | Respons: { "participant_id": 1 } |</br>
|                       |           | Status: 400 Bad Request    |</br>
|                       |           | Respons: { "error": "Invalid input data" } |</br>
+------------------------+</br>
          ↓</br>
+------------------------+            +---------------------------+</br>
| Godkjenn/avslå deltaker| PUT ----->| PUT /api/events/{id}/participants/{participant_id} |</br>
|                       |           | Status: 200 OK            |</br>
|                       |           | Respons: { "message": "Participant status updated" } |</br>
|                       |           | Status: 404 Not Found     |</br>
|                       |           | Respons: { "error": "Participant not found" } |</br>
+------------------------+</br>
          ↓</br>
+------------------------+            +---------------------------+</br>
| Slett deltaker         | DELETE -->| DELETE /api/events/{id}/participants/{participant_id}|</br>
|                       |           | Status: 200 OK            |</br>
|                       |           | Respons: { "message": "Participant deleted successfully" } |</br>
|                       |           | Status: 404 Not Found     |</br>
|                       |           | Respons: { "error": "Participant not found" } |</br>
+------------------------+</br>
Beskerivelse fra Flyrt Chart:</br>
# Opprett Arrangement </br>
->Brukeren velger en mal eller starter fra scratch.</br>
->Data sendes til POST /api/events.</br>
Statuskoder:</br>
->201 Created: Arrangement opprettet vellykket.</br>
->400 Bad Request: Feil i data.</br>
**** Administrasjon av Arrangementer***</br>
Liste over Arrangementer: </br>
-> ["GET"]api/events.</br>
200 OK: Returnerer en liste.</br>
404 Not Found: Ingen arrangementer funnet.</br>
Endre Arrangement:</br>
-> ["PUT"] api/events/{id}.</br>
200 OK: Arrangement oppdatert.</br>
400 Bad Request: Feil i data.</br>
Slett Arrangement: </br>
-> ["DELETE"] api/events/{id}.</br>
200 OK: Arrangement slettet.</br>
404 Not Found: Arrangementet finnes ikke.</br>
3. Administrasjon av Påmeldinger</br>
Liste over Deltakere: </br>
-> ["GET"] api/events/{id}/participants.</br>
200 OK: Returnerer en liste over deltakere.</br>
404 Not Found: Ingen deltakere funnet.</br>
Legg til Deltaker: </br>
->["POST"]POST /api/events/{id}/participants.</br>
201 Created: Deltaker lagt til.</br>
400 Bad Request: Feil i data.</br>
Godkjenn/Avslå Deltaker:</br>
-> ["PUT"] api/events/{id}/participants/{participant_id}.</br>
200 OK: Status oppdatert.</br>
404 Not Found: Deltaker finnes ikke.</br>
Slett Deltaker:</br>
-> ["DELETE"] api/events/{id}/participants/{participant_id}.</br>
200 OK: Deltaker slettet.</br>
404 Not Found: Deltaker finnes ikke</br>

*** 6. Skal dokumentere hvordan filtreringen skal foregå og løses i frontend og </br>
Backend håndterer filtreringslogikken og returnerer data i JSON-format.</br>
Frontend gir et brukervennlig grensesnitt for å sende filtre og vise resultater.</br>
# 7. Skal dokumentere datamodellen og bakgrunnen for denne modellen </br>
Documentere data modell: </br>
Kolonner: ID, name, type og event_date. Designet den data gir oss mulighet til rask og fleksible filtering.</br>
Filtreringskriterier:</br>
Måned -> Viser arrangementer i en spesifikk måned.</br>
År -> Begrenser resultatene til et spesifikt år.</br>
Type -> Lar brukere finne arrangementer av en bestemt type.</br>

Gir brukerne en rask og fleksibel måte å søke og filtrere relevante arrangementer på.</br>

 # 8. Skal dokumentere hvordan løse det å opprette / gjenbruke en mal ? </br>

 -> Opprettelse av Mal:Administrator fyller ut et skjema med verdier som arrangementstype, maks antall deltakere, pris, og lokasjon.</br>
-> Dataene lagres i en tabell dedikert til maler i databasen.For Eksempel:</br>
Type:Seminar</br>
Maks deltakere: 50</br>
Pris: 500 NOK</br>
Lokasjon: Oslo</br>

Gjenbruk av Mal: </br>
->Når en administrator ønsker å opprette et nytt arrangement, kan en eksisterende mal velges.</br>
->Verdiene fra malen hentes automatisk og fylles ut i skjemaet for opprettelse av arrangement.</br>
Eksempel:</br>
        ->Administrator velger malen "Standard Seminar Template".</br>
        ->Skjemaet fylles automatisk med verdier fra malen, som type = "Seminar", maks deltakere = 50, og pris = 500 NOK.</br>
Administrator kan endre eller supplere verdiene fra malen for å tilpasse det spesifikke arrangementet.Dette gir fleksibilitet for spesielle krav, samtidig som malen forenkler opprettelsesprosessen.</br>
 # 9. dokumentere databasemodellen og nødvendige relasjoner</br>
 +------------------+           +------------------+</br>
| Templates       PK|           | Events          PK|</br>
|------------------|           |------------------|</br>
| id               |           | id               |</br>
| name             |           | name             |</br>
| type             |           | type             |</br>
| max_participants |           | event_date       |</br>
| price            |           | max_participants |</br>
| location         |           | price            |</br>
| created_at       |           | location         |</br>
+------------------+           | template_id (FK) |</br>
                               +------------------+</br>
Relasjon mellom Templates -> Events:</br>
Relasjonstype: Én-til-Mange, En mal kan brukes til å opprette flere arrangementer.</br>
Primærnøkkel (PK): id i Templates.</br>
Fremmednøkkel (FK): template_id i Events.</br>

