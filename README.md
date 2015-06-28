# WBA2-SoSe15-T8
WBA 2 SoSe15 Team 8 (Meryem Dural, Aylin Mengi, Aziz Kilic)

##Aufgaben zum ersten Workshop
Datei "A1.js"

##Exposé

###Accuratus
####Funktionen
Website, auf der Rezepte für zb selbstgemachte Hygieneprodukte
Alle können Rezepte hochladen oder Fragen posten. wenn rezept korrekt setzt admin häkchen
man kann kommentieren
man kann liken

löschen und bearbeiten kann der der gepostet hat und admin


####Anwendungslogik: 
Zutaten für Rezepte können ausgewählt werden.
Endprodukte suchen Rezepte erhalten

####Szenarien

#####Szenario1 Ideenqueen

Sara R. (24) stellt seit 2 Jahren ihren eigenen Hygieneartikel her. Sie schmeißt  regelmäßig Rezeptpartys, um ihre Ideen und Rezepte ihren Freundinnen mitzuteilen. Seit sie auf der Website „Accuratus“ postet, sind sie und ihre Rezepte weltweit bekannt. Es erfüllt sie mit Stolz etwas zum Umweltschutz beitragen zu können. 


#####Szenario2 Neuanfänger 

Thomas M. (22) möchte seinen Lebensstil verändern. Er hat es satt seinem Körper durch die ganzen Chemikalien Schaden zuzufügen. Allein der Grund, dass in seinem Deo
entweder Aluminium oder Alkohol enthalten sein muss, macht ihn wahnsinnig. Durch einen Freund erfährt er von der Website „Accuratus“ und fragt nach einem Rezept für selbstgemachtes Deo. Innerhalb von einer Stunde wird seine Frage mehrfach kommentiert, wodurch er 3 Rezepte für ein Deo erhält, die er direkt ausprobiert. 


#####Szenario3 Zutatenvorrat

Maria S. (32) macht es Spaß ihre Produkte selbst herzustellen. Sie benutzt für die Rezepte die Website „Accuratus“, wo sie eingibt welche Zutaten sie zu Hause hat und angegeben bekommt, was sie aus diesen herstellen könnte. Wenn ihr eine Zutat fehlt besorgt sie sich diese unverzüglich. 


#####Szenario4 Admins

Mia M. (22) ist eine der drei Admins von „Accuratus“. Ihre Aufgabe besteht darin, die geposteten Rezepte auszuprobieren und zu bewerten. Wenn die vorgegeben Produkte ihren Zweck erfüllen, versieht Mia diese mit einem grünen Häkchen, sodass die Besucher der Website stets wissen, welchen Rezepten sie vertrauen können.


####Ressourcen-Tabelle 


| Ressource              | Methode | Semantik                                                                             | Content-Type (req) | Content-Type (res) |
|------------------------|---------|--------------------------------------------------------------------------------------|--------------------|--------------------|
| /post                | post    | Posten eines Posts mit ID                                                    |            tapplication/json        |        text/plain            |
| /post/:postid              | get     | Anfragen eines Posts nach ID                                 |       application/json             |          application/json          |
| /post/:postid              | put     | Ändern eines Posts                                    |      application/json              |      text/plain              |
| /post/:postid              | delete  | Löschen eines Posts mit ihren Kommentaren                                                         |          application/json          |     application/json               |
| /top                 | get     | Anfrage des Posts mit den meisten Anfragen                              |      application/json              |            application/json        |
| /mostrecent | get    | Anfrage des jüngsten( bzw des neusten) Posts                          |        application/json            |         application/json           |
| /post/:postid/comment/ | post     | Posten eines Kommentares zum jeweiligen Post. Ermöglicht Löschen und Abrufen nach ID  |        text/plain            |         application/json           |
| /post/:id/comment/ | get     | Anfragen aller Kommentare zum Post |       application/json             |      application/json              |
| /post/:pid/comment/:cid | delete  | Löschen eines Kommentares                                      |       application/json             |         application/json           |
| /topcommented    | get     |      Anfrage des Posts mit den meisten Anfragen                                                                                |       application/json             |        application/json            |
| /     | get     |        SUCH-Funktion                                                                              |        text/plain            |        application/json            |


