Aplicatie web pentru gestionarea rezolvarii bug-urilor

Introducere

In timpul procesului de dezvoltare al aplicatiilor software pot aparea erori (bug-uri), probleme de functionare, comportamente neasteptate sau erori logice. 
In echipele de programare, urmarirea acestor bug-uri poate deveni dificila atunci cand comunicarea este ineficienta.
Pentru a eficientiza acest proces, proiectul nostru propune o aplicatie web moderna pentru gestionarea bug-urilor, care sa permita dezvoltatorilor si testerilor sa colaboreze mai eficient.
Aplicatia ofera o platforma centralizata pentru raportarea, urmarirea, alocarea si rezolvarea bug-urilor. Aceasta va permite membrilor unei echipe sa vada in timp real situatia fiecarui bug si sa reduca riscul ca unele probleme sa ramana nerezolvate.

Obiectivele proiectului

Scopul aplicatiei este reprezentat de simplificarea si automatizarea gestionarii bug-urilor dintr-un proiect software. Printre obiectivele principale se numara:
Centralizarea informatiilor, astfel incat membrii echipei pot raporta si urmari bug-urile proiectului intr-un singur loc.
Automatizarea fluxului de lucru, astfel incat alocarea bug-urilor, actualizarea statusului si vizualizarea progresului sa fie realizate mai facil.
Cresterea transparentei, pentru ca fiecare membru sa aiba acces la proiect.
Comunicare directa intre testeri si programatori prin intermediul aplicatiei.
Accesibilitate ridicata: aplicația web este de tip SPA, putand fi accesata atat de pe desktop, cat si de pe un dispozitiv mobil.

Functionalitati cheie

Avem doua tipuri de utilizatori:
Student MP (membru al proiectului, dezvoltator): creeaza un proiect, gestioneaza informatiile proiectului, vizualizeaza bug-urile raportate, isi poate aloca un bug spre rezolvare, poate schimba statusul bug-ului dupa ce il rezolva.
Student TST (tester): se poate alatura unui proiect ca tester, poate raporta bug-uri, poate vizualiza bug-urile existente, dar nu le poate modifica.

Gestionarea proiectelor (MP):
Un membru al proiectului (MP) are posibilitatea de a crea un proiect nou, completand detalii precum numele proiectului, o scurta descriere si link-ul catre repository-ul Git asociat. De asemenea, acesta poate adauga în echipa alti membri, definind rolurile lor, si poate vizualiza in orice moment toate bug-urile raportate in cadrul proiectului, avand astfel o imagine completa asupra starii acestuia.

Raportarea bug-urilor (TST):
Un bug va contine: severitate (low/medium/high), prioritate (low/medium/high), o descriere detaliata, un link la commit-ul unde a fost gasita problema, data raportarii si statusul rezolvarii acestuia.
Dupa raportare, bug-ul apare automat ca fiind in categoria de TO DO a bug-urilor.

Alocarea si rezolvarea bug-urilor (MP):
Doar un singur MP poate lucra la un bug la un moment dat si isi poate alege un bug neatribuit. Acesta poate marca bug-ul ca: “In progres” sau “Rezolvat”.
Odata rezolvat, MP ataseaza un link commit cu rezolvarea si un mesaj scurt descriptiv.


Monitorizarea progresului: 
Aceasta functionalitate permite vizualizarea tuturor bug-urilor raportate in cadrul proiectului, oferind posibilitatea de a aplica filtre dupa severitate, prioritate sau status.
Astfel, organizatorii echipei pot evalua rapid starea generala a proiectului si pot identifica problemele care necesita atentie.

Tehnologii pe care le vom utiliza
Frontend: HTML + CSS+ JavaScript + React.js 
Backend: Interfata REST + Node.js + Express.js
State management: Context API 
Baza de date: SQLite 
Autentificare: JSON Web Tokens 
Deploy: Azure

Mod de utilizare:

Exemplul 1: Un MP creeaza un proiect
Un student cu rol de MP se conecteaza in aplicatie si acceseaza sectiunea „Proiectele mele”. Aici selecteaza optiunea „Creeaza proiect” si completeaza detaliile necesare, inclusiv numele proiectului, o scurta descriere si link-ul catre repository-ul Git asociat. Dupa aceea, adauga alti studenti ca membri ai echipei, atribuindu-le roluri de MP sau TST. 
In final, proiectul creat apare in lista sa de proiecte active, fiind disponibil pentru gestionare si pentru raportarea bug-urilor.

Exemplul 2: Un TST raporteaza un bug
Un student cu rol de TST acceseaza un proiect si selecteaza optiunea „Raporteaza bug”. Acesta completeaza formularul, indicand severitatea bug-ului (high), prioritatea (medium), o descriere a problemei („Butonul de Submit nu functioneaza pe pagina de checkout”) si link-ul catre commit-ul relevant din repository. 
Dupa trimiterea formularului, bug-ul apare in lista TO DO.

Exemplul 3: Un MP isi aloca un bug
Un student cu rol de MP acceseaza lista de bug-uri pentru proiect si selecteaza bug-ul „Submit button not working”. Acesta apasa pe butonul „Aloca mie”, iar statusul bug-ului se schimba automat in „In progres”, iar campul „Assigned to” se completeaza cu numele sau. MP-ul lucreaza apoi la rezolvarea problemei si adauga link-ul commit-ului in care a efectuat fix-ul.

Exemplul 4: Rezolvarea unui bug
Un student cu rol de MP finalizeaza rezolvarea bug-ului si acceseaza pagina acestuia, apoi apasa butonul „Marcheaza ca rezolvat”. 
Completeaza link-ul catre commit-ul in care a efectuat fix-ul si adauga un mesaj scurt, de exemplu „Am reparat functia de submit.” 
Dupa aceasta actiune, statusul bug-ului se schimba automat in „Rezolvat”.

Exemplul 5: Vizualizarea progresului proiectului
Un student cu rol de MP acceseaza sectiunea „Dashboard proiect” si poate vizualiza in mod automat toate bug-urile din proiect, grupate dupa status: bug-uri deschise, bug-uri in progres si bug-uri rezolvate. 
De exemplu, lista poate include: „Submit button not working” (Rezolvat), „Login page slow”  (In progres), „Missing validations on form” (To do). 
Dashboard-ul permite astfel echipei sa evalueze rapid starea proiectului si sa identifice problemele care necesita atentie imediata.

Baza de date relationala:

Tabele: 
utilizator
id_user NUMBER(4) PK
email VARCHAR2(50) UNIQUE
nume VARCHAR2(100) NN
rol VARCHAR2(40) NN
parola VARCHAR2(255) NN
data_creare DEFAULT SYSDATE

proiect
id_proiect NUMBER(4) PK
nume VARCHAR2(100) NN
url VARCHAR2(255) NN
id_user NUMBER(4) FK
data_creare DATE


lista_membri
id_membru NUMBER(4) PK
id_proiect NUMBER(4) FK
rol_membru VARCHAR2(50) NN


lista_buguri
id_bug NUMBER(8) PK
id_proiect NUMBER(4) FK
raportat_de VARCHAR2(50) 
severitate VARCHAR2(15) NN
descriere_bug VARCHAR2(255)
link_commit VARCHAR2(100) 
status VARCHAR2(15) NN



rezolvare_buguri
id_rezolvare NUMBER(8) PK
id_bug NUMBER(4) FK
id_membru NUMBER(4) 
link_commit_fix VARCHAR2(100) 
mesaj VARCHAR2(255)
data_rezolvare DEFAULT SYDATE


notificari
id_notificare NUMBER(8) PK
id_user NUMBER(4) FK
id_bug NUMBER(4) 
mesaj VARCHAR2(255)
data_notificare DEFAULT SYSDATE

Tehnologii utilizate

Aplicația utilizează un backend dezvoltat în Node.js, care oferă un mediu de execuție JavaScript pe server, împreună cu Express.js, un framework ce permite crearea rapidă și structurată a unui API REST. Pentru interacțiunea cu baza de date este folosit ORM-ul Sequelize, iar ca sistem de gestiune a datelor este utilizată SQLite, o bază de date relațională locală, potrivită pentru proiecte de dimensiuni mici și medii.
Autentificarea utilizatorilor este realizata cu ajutorul JSON Web Tokens, iar parolele sunt protejate prin bcrypt, folosind hashing securizat. Configurarea aplicației și gestionarea datelor sensibile se face prin intermediul fișierelor .env, folosind librăria dotenv. Comunicarea dintre frontend și backend este permisă prin utilizarea mecanismului CORS, care rezolvă problemele de securitate legate de cererile între origini diferite.
Partea de frontend este realizată cu React, care oferă o interfață de utilizator dinamică și interactivă. Comunicarea cu backend-ul se face folosind Axios, o librărie care trimite cereri HTTP și primește răspunsuri în format JSON.
Pentru gestionarea dependențelor este folosit npm, iar în timpul dezvoltării aplicația poate fi rulată automat cu nodemon, care repornește serverul la modificarea codului. Codul sursă este versionat folosind Git, iar proiectul este găzduit pe GitHub.
