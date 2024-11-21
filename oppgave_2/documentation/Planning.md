
# Svarte oppgave 2, 3, 4, 5 var avsnitt. #</br>
*** login & registering***</br>

+-------------------+           +--------------------+           +--------------------+</br>
| /register         | POST ---->| /api/register      |           | Opprett ny bruker   |</br>
|                   |           |                    |           | Respons: 201 / 400  |</br>
+-------------------+           +--------------------+         +--------------------+</br>
          ↓                              ↓                               ↓
  Ved registrering           Naviger til /login          Gå til innlogging side</br>
          ↓                              ↓                               ↓
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

*** Verb og	Statuskode	Beskrivelse ***
-> api/login	POST:200 OK, Vellykket innlogging.
401 Unauthorized	Ugyldig e-post eller passord.
->api/logout	POST:200 OK, Vellykket utlogging.
->api/register	POST:201 Created, Ny bruker registrert. 400 Bad Request	Feil i forespørselen (f.eks. ugyldig data).
409 Conflict	E-post allerede registrert.

*** opprett arrangemang fra bruker *** </br>

+-------------------+           +--------------------+           +--------------------+
| /create-event     | POST ---->| /api/events        |           | Opprett nytt arrangement |
+-------------------+           +--------------------+           +--------------------+
          ↓
  Naviger til arrangementsliste
          ↓
+-------------------+           +--------------------+
| /view-events      | GET ---->| /api/events        |
+-------------------+           +--------------------+
          ↓                              ↓
+-------------------+           +--------------------+
| /add-participant  | POST ---->| /api/events/{id}/participants |
+-------------------+           +--------------------+
          ↓                              ↓
+-------------------+           +--------------------+
| /view-participants| GET ---->| /api/events/{id}/participants |
+-------------------+           +--------------------+
*** Verb og	Statuskode	Beskrivelse ***
-> api/events, ["POST"]	201 Created	Arrangementet ble opprettet:kommer
json
{
"message": "Event created successfully",
"id": 1
}
400 Bad Request	Feil i forespørselen:
{
"error": "Invalid input data"
}
-> api/events
["GET"], 200 OK	Returnerer en liste over arrangementer i JSON-format.
404 Not Found	Ingen arrangementer funnet:
{
"error": "No events found"
}
-> api/events/{id}/participants
 ["POST"] 201 Created Ny deltaker lagt til i JSON-format.
{
"message": "Participant added successfully",
"participant_id": 1
}
400 Bad Request	Feil i forespørselen:
{
"error": "Invalid input data"
}
-> api/events/{id}/participants
["GET"]	200 OK	Returnerer en liste over deltakere for arrangementet i JSON-format.
404 Not Found	Ingen deltakere funnet:
{
"error": "No participants found"
}


*** Opprett arrangement fra admin side*** </br>
1. Opprett Arrangement:
+------------------------+            +---------------------------+
| Velg mal eller scratch | POST ---->| POST /api/events          |
| Fra scratch:           |           | Status: 201 Created        |
| - Fyll inn data        |           | Respons: { "id": 1 }      |
| Eksisterende mal:      |           | Status: 400 Bad Request    |
| - Tilpass data          |           | Respons: { "error": "Invalid input data" } |
+------------------------+
          ↓
2. Administrasjon av Arrangementer:
+-----------------------+            +---------------------------+
| Liste over arrangement| GET ----->| GET /api/events           |
|                       |           | Status: 200 OK            |
|                       |           | Respons: [{ "id": 1 }]    |
|                       |           | Status: 404 Not Found     |
|                       |           | Respons: { "error": "No events found" } |
+-----------------------+
          ↓
+-----------------------+            +---------------------------+
| Endre arrangement     | PUT ----->| PUT /api/events/{id}      |
|                       |           | Status: 200 OK            |
|                       |           | Respons: { "message": "Event updated successfully" } |
|                       |           | Status: 400 Bad Request    |
|                       |           | Respons: { "error": "Invalid data" } |
+-----------------------+
          ↓
+-----------------------+            +---------------------------+
| Slett arrangement     | DELETE -->| DELETE /api/events/{id}   |
|                       |           | Status: 200 OK            |
|                       |           | Respons: { "message": "Event deleted successfully" } |
|                       |           | Status: 404 Not Found     |
|                       |           | Respons: { "error": "Event not found" } |
+-----------------------+
          ↓
3. Administrasjon av Påmeldinger:
+------------------------+            +---------------------------+
| Liste over deltakere   | GET ----->| GET /api/events/{id}/participants |
|                       |           | Status: 200 OK            |
|                       |           | Respons: [{ "id": 1, "name": "John" }] |
|                       |           | Status: 404 Not Found     |
|                       |           | Respons: { "error": "No participants found" } |
+------------------------+
          ↓
+------------------------+            +---------------------------+
| Legg til deltaker      | POST ---->| POST /api/events/{id}/participants |
|                       |           | Status: 201 Created        |
|                       |           | Respons: { "participant_id": 1 } |
|                       |           | Status: 400 Bad Request    |
|                       |           | Respons: { "error": "Invalid input data" } |
+------------------------+
          ↓
+------------------------+            +---------------------------+
| Godkjenn/avslå deltaker| PUT ----->| PUT /api/events/{id}/participants/{participant_id} |
|                       |           | Status: 200 OK            |
|                       |           | Respons: { "message": "Participant status updated" } |
|                       |           | Status: 404 Not Found     |
|                       |           | Respons: { "error": "Participant not found" } |
+------------------------+
          ↓
+------------------------+            +---------------------------+
| Slett deltaker         | DELETE -->| DELETE /api/events/{id}/participants/{participant_id}|
|                       |           | Status: 200 OK            |
|                       |           | Respons: { "message": "Participant deleted successfully" } |
|                       |           | Status: 404 Not Found     |
|                       |           | Respons: { "error": "Participant not found" } |
+------------------------+
Beskerivelse fra Flyrt Chart:
***Opprett Arrangement***
->Brukeren velger en mal eller starter fra scratch.
->Data sendes til POST /api/events.
Statuskoder:
->201 Created: Arrangement opprettet vellykket.
->400 Bad Request: Feil i data.
**** Administrasjon av Arrangementer***
Liste over Arrangementer: 
-> ["GET"]api/events.
200 OK: Returnerer en liste.
404 Not Found: Ingen arrangementer funnet.
Endre Arrangement:
-> ["PUT"] api/events/{id}.
200 OK: Arrangement oppdatert.
400 Bad Request: Feil i data.
Slett Arrangement: 
-> ["DELETE"] api/events/{id}.
200 OK: Arrangement slettet.
404 Not Found: Arrangementet finnes ikke.
3. Administrasjon av Påmeldinger
Liste over Deltakere: 
-> ["GET"] api/events/{id}/participants.
200 OK: Returnerer en liste over deltakere.
404 Not Found: Ingen deltakere funnet.
Legg til Deltaker: 
->["POST"]POST /api/events/{id}/participants.
201 Created: Deltaker lagt til.
400 Bad Request: Feil i data.
Godkjenn/Avslå Deltaker:
-> ["PUT"] api/events/{id}/participants/{participant_id}.
200 OK: Status oppdatert.
404 Not Found: Deltaker finnes ikke.
Slett Deltaker:
-> ["DELETE"] api/events/{id}/participants/{participant_id}.
200 OK: Deltaker slettet.
404 Not Found: Deltaker finnes ikke

*** 6. Skal dokumentere hvordan filtreringen skal foregå og løses i frontend og 
backend ***
Backend håndterer filtreringslogikken og returnerer data i JSON-format.
Frontend gir et brukervennlig grensesnitt for å sende filtre og vise resultater.
*** 7. Skal dokumentere datamodellen og bakgrunnen for denne modellen*** 
Documentere data modell: 
Kolonner: ID, name, type og event_date. Designet den data gir oss mulighet til rask og fleksible filtering.
Filtreringskriterier:

Måned: Viser arrangementer i en spesifikk måned.
År: Begrenser resultatene til et spesifikt år.
Type: Lar brukere finne arrangementer av en bestemt type.
Fordel:

Gir brukerne en rask og fleksibel måte å søke og filtrere relevante arrangementer på.

 ***8. Skal dokumentere hvordan løse det å opprette / gjenbruke en mal ? *** 

 -> Opprettelse av Mal:Administrator fyller ut et skjema med verdier som arrangementstype, maks antall deltakere, pris, og lokasjon.
-> Dataene lagres i en tabell dedikert til maler i databasen.For Eksempel:
Type:Seminar
Maks deltakere: 50
Pris: 500 NOK
Lokasjon: Oslo

Gjenbruk av Mal: 
->Når en administrator ønsker å opprette et nytt arrangement, kan en eksisterende mal velges.
->Verdiene fra malen hentes automatisk og fylles ut i skjemaet for opprettelse av arrangement.
Eksempel:
        ->Administrator velger malen "Standard Seminar Template".
        ->Skjemaet fylles automatisk med verdier fra malen, som type = "Seminar", maks deltakere = 50, og pris = 500 NOK.
Administrator kan endre eller supplere verdiene fra malen for å tilpasse det spesifikke arrangementet.Dette gir fleksibilitet for spesielle krav, samtidig som malen forenkler opprettelsesprosessen.
 ***9. dokumentere databasemodellen og nødvendige relasjoner***
 +------------------+           +------------------+
| Templates       PK|           | Events          PK|
|------------------|           |------------------|
| id               |           | id               |
| name             |           | name             |
| type             |           | type             |
| max_participants |           | event_date       |
| price            |           | max_participants |
| location         |           | price            |
| created_at       |           | location         |
+------------------+           | template_id (FK) |
                               +------------------+
Relasjon mellom Templates -> Events:
Relasjonstype: Én-til-Mange, En mal kan brukes til å opprette flere arrangementer.
Primærnøkkel (PK): id i Templates.
Fremmednøkkel (FK): template_id i Events.

