  ####Funktionen
- jeder kann Rezept posten
- jeder kann jedes Rezept kommentieren
- ein Blogeintrag kann mit samt Kommentaren gelöscht werden
- ein Kommentar kann gelöscht werden 
- jeder kann Blogeintrag mit den meisten Aufrufen anfragen
- jeder kann den neusten Blogeintrag anfragen

####Anwendungslogik: 
- Produktnamen können in die Suchfunktion geschrieben werden. --> es werden alle Rezepte mit diesem Produktnamen ausgegeben.
- es wird gezählt, wie oft ein Rezept aufgerufen wurde
- die Möglichkeit mit dem Autoren zu Kommunizieren über eine einfache Chatfunktion
- die Möglichkeit Themen zu verfolgen um über neue Einträge informiert zu werden 


##1. Dokumentation des Service: 

Um das Projekt zu starten, verwendet man die index.js, welche beide Server startet. Vorerst müssen alle Module über npm install installiert werden
```
node index.js
```


Der REST-Server ist mittels Rest-Client oder Browser abrufbar über
```
localhost:3000
```

Die Dienstnutzer-Seite ist im Browser abrufbar über
```
localhost:3001
```

###1.1 Angabe der Ressourcen, der dafür vorhergesehenen http Verben und deren Semantik

####REST-Spezifikationen
| Ressource              | Methode | Semantik                                                                             | Content-Type (req) | Content-Type (res) |
|------------------------|---------|--------------------------------------------------------------------------------------|--------------------|--------------------|
| /post                | post    | Posten eines Posts mit ID                                                    |            application/json        |      application/json           |
| /post/:postid              | get     | Anfragen eines Posts nach ID                                 |       application/json             |          application/json          |
| /post/:postid              | put     | Ändern eines Posts                                    |      application/json              |     application/json             |
| /post/:postid              | delete  | Löschen eines Posts mit ihren Kommentaren                                                         |                 |               |
| /top                 | get     | Anfrage des Posts mit den meisten Anfragen                              |      application/json              |            application/json        |
| /mostrecent | get    | Anfrage des jüngsten( bzw des neusten) Posts                          |        application/json            |         application/json           |
| /post/:postid/comment/ | post     | Posten eines Kommentares zum jeweiligen Post. Ermöglicht Löschen und Abrufen nach ID  |        application/json            |         application/json           |
| /post/:id/comment/ | get     | Anfragen aller Kommentare zum Post |       application/json             |      application/json              |
| /post/:pid/comment/:cid | delete  | Löschen eines Kommentares                                      |              |                |
| /topcommented    | get     |      Anfrage des Posts mit den meisten Kommentaren                                                                               |       application/json             |        application/json            |
| /?search=SUCHBEGRIFF     | get     |        SUCH-Funktion(?search=SUCHBEGRIFF)                                                                              |        application/json            |        application/json            |


###1.2 Überlegungen, die angestellt wurden zur Definition der Ressourcen, Alternativen, die betrachtet wurden

Zu Beginn des Projekts wurde überlegt, welche Funktionen der Blog beinhalten sollte und welche Ressourcen dafür gebraucht werden. Die gewünschten Funktionen sind:
- einen Blogeintrag erstellen
- einen Blogeintrag ändern und oder löschen 
- einen Blogeintrag kommentieren
- Kommentar zu dem Blogeintrag löschen können

Es ist zu beachten, dass der Kommentar lediglich gelöscht jedoch nicht bearbeitet werden kann, da die Kommentarfunktion zu Diskussionen führt. Es ist nicht erwünscht, dass durch das nachträgliche Bearbeiten eines Kommentars der Sinn dieser Diskussion verfälscht und oder andere User kompromittiert werden. 


Der REST-Server ist abrufbar über
```
localhost:3000
```
