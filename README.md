# WBA2-SoSe15-T8
WBA 2 SoSe15 Team 8 (Meryem Dural, Aylin Mengi, Aziz Kilic)

##Exposé
   
###Accuratus
   
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
- es wird gezählt, wie oft ein Rezept kommentiert wurde

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


#### Use Cases

##### 1.
Maria Schäfer ist eine leidenschaftliche Bloggerin. Sie zeigt anderen Mädchen, wie sie sich schminken sollen und welches Outfit zu dieser Schminke passen würde. Da es zur Zeit angesagt ist, okölogisch und ökonomisch zu Handeln, werden ihr immer häufiger Fragen gestellt, ob man Kosmetikartikel auch selber herstellen könne, da die meisten nicht vegan sind und oder mit Hilfe von Tierversuchen hergestellt würden. Um ihre Fans nicht zu enttäuschen, entschließt Maria Schäfer sich, ihren eigenen Lippenstift herzustellen. Da sie jedoch nicht dafür ausgebildet wurde, so etwas zu kreieren, sucht sie im Internet nach Hilfen und stößt auf eine Website namens Accuratus. Mit Hilfe einer Suchfunktion erhält sie in wenigen Klicks mehrere Rezepte für einen selbstgemachten Lippenstift. Anhand der Kommentare zu den Rezepten und den Klickanzahlen, sieht Maria schnell, welches Rezept empfehlenswert wäre. Dies probiert sie aus und präsentiert ihr Ergebnis in einer neuen Folge ihres Bloggs ihren Fans.
  
  
##### 2.
Tanja Buschmann ist vor einigen Monaten Mutter geworden und ist in ständiger Sorge um ihr Kind. Aus einem unerklärlichen Grund verträgt ihr Neugeborenes keinerlei Produkte aus der Drogerie. Daraufhin beschloss Tanja die Artikel für ihr Baby aus der Apotheke zu kaufen. Diese jedoch sind so teuer, dass die Mutter es auf die Dauer nicht schafft, den Kosten gerecht zu werden. Eine Freundin die selber Mutter von zwei Kindern ist, empfiehlt Tanja ihre Produkte eigenständig herzustellen. Diese bezieht ihre Rezepte regelmäßig von der Website Accuratus. Da Tanja jedoch keinerlei Internet-Erfahrung hat, scheut sie sich davor, dieser Empfehlung nachzukommen. Schnell kommt ihre Freundin Tanja entgegen und erklärt kurzerhand wie sie nur mit einer Sucheingabe an gewünschte Produkte gelangen kann. Tanja ist dennoch skeptisch, da sie ihrem Baby nicht irgendwelche Produkte zumuten möchte. Auch hierfür kennt ihre Freundin eine Lösung. Die vielen Kommentare verschiedenster Menschen sind unter den Rezepten. Tanja entschließt sich unter einem Rezept zu schreiben, ob dieses Produkt für Neugeborene empfehlenswert wäre. Als sie daraufhin schnell eine Antwort bekommt, probiert sie das Rezept aus. Heute mischt sich Tanja regelmäßig Produkte für sich und ihr Baby. Glücklicherweise ist jeglicher Ausschlag dank Accuratus zurückgegangen.
  
    
##### 3.
Jan Hermens lebt seit einigen Jahren vollkommen vegan. In einem Skandal in den Nachrichten wurde bekannt gegeben, dass eine Marke, der Jan vertraut hat, dass sie alles vegan herstellen, Tierversuche macht. Dies war ein großer Schock für ihn, da er die Produkte der Marke für viel Geld erworben hat, um zuversichtlich vegan leben zu können. Nach diesem Schock ist Jan der Meinung er könne bezüglich Kosmetik- bzw. Hygieneartikel niemandem mehr vertrauen. Er beschließt sich diese Produkte eigenhändig herzustellen, denn nur so kann er mit Sicherheit sagen, ob etwas wirklich zu 100% vegan ist. 
Nach einer kurzen Recherche im Internet stößt Jan auf zwei Websites. Ihm gefällt die Seite "Accuratus", da er sehen kann, wie oft ein Rezept aufgerufen wurde. Dies hilft ihm weiter, da er nichts probieren möchte, was nicht schon andere einmal probiert haben. Schnell merkt Jan, dass es gar nicht so kompliziert ist, sich seine Produkte selbst herzustellen. Er versucht gelegentlich einige Rezepte zu erweitern und postet diese selber. Heute ist Jan einer der häufigsten Rezepte-Blogger der Seite Accuratus.

##1. Dokumentation des Service: 

Um das Projekt zu starten, verwendet man die index.js, welche beide Server startet:
```
npm install (einmalig)
node index.js
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


###1.3 Beschreibung der Anwendungslogik und der Datenhaltung mit Überlegungen dazu
Datenhaltung: Ein Eintrag wird in einem einzelnen Json-Format in der Redis-Datenbank gespeichert, wohingegen es hätte so geschrieben werden können, dass dieser Eintrag sukzessiv eingespeichert werden kann. Somit könnten Titel, Autoren, Zutaten und Inhalt separat gespeichert und anschließend zusammengesetzt werden. Diese Möglichkeit wurde aus den Überlegungen ausgeschlossen, da die Vorgehensweise wirkungslos komplex gewesen wäre. 
Das Json-Format ermöglicht es einzelne Objekte des Json-Eintrags über verschiedene Module (zB. Express-partial-response) abzurufen.

Es wurden Überlegungen angestellt, wie über die Redis-Datenbank Kommentare zu erstellen und sie nach ihrer Identifikationsnummer (ID) zu löschen sind. Die Problematik der Kommentare, hinsichtlich einer erstellten Liste, liegt darin, dass ein einzelner Beitrag dieser Liste schwer abzurufen ist. Aufgrund dessen ist eine Hashtabelle verwendet worden.  
Kommentare werden über die Funktionen Sadd und Hset erstellt. Sadd ist eine Tabelle, die angibt, welche Kommentare sich mit welcher ID unter den Blogeinträgen befinden. Mithilfe von Hset wird der Kommentar erstellt und erhält einen HashKeyValue. Über diesen HashKeyValue können einzelne Kommentare gelöscht werden. Mit einer einfachen Redis-Liste, hätte dies nicht funktioniert, da nicht auf einen bestimmten Kommentar ohne ID zugegriffen werden kann.
Jeder erstellte Blogeintrag bekommt eine ID, welche von der Redis-Datenbank mit der Funktion INCR übergeben wird. 

Während der Erstellung der Ressourcen wurden Überlegungen angestellt, inwiefern die Ressource "mostrecent" rudimentär sei, da sie zwar eine eine eigene Funktion bildet, jedoch ähnliche Ergebnisse liefert und die Datenbank in gleicher weise nutzt wie das einfache abrufen eines Blogposts. So hätten Beispielsweise statt einer eigenen Ressource einen query-Parameter auf die Blog-Ressourcen anwenden können, um keine eigene Ressource für diese Funktionen bilden zu müssen oder aber es wäre möglich gewesen dies in den Dienstleister einzubauen. Ersteres wurde verworfen da der Code und somit auch die Ressource durch mehrere Query-Parameter zu komplex wurde. In den Dienstleister wurde diese Ressource nicht eingebaut, da der Dienstleister lösgelöst von der Datenbank und nur mit dem REST-Client kommunizieren sollte.

Anwendungslogik des Service:
Die Anwendungslogik des Services wurde über das Modul Express angefertigt, welches dem Nutzer ermöglicht, einen Blogeintrag oder einen Kommentar zu erstellen und zu löschen. Der Blogeintrag kann von dem Nutzer geändert werden, sofern er diesen selber verfasst hat. Im Gegensatz zum Blogeintrag, ist dies bei einem Kommentar nicht möglich.

Außerdem bietet der Service eine Such-Funktion über den Query-Parameter „search“. Es kann nach Blogeinträgen gesucht werden anhand des Titel, des Inhalts oder der Zutaten, indem man den Suchbegriff eingibt und die Datenbank nach diesem Begriff abgesucht wird. Dies geschieht über das Modul Reds (https://www.npmjs.com/package/reds). 
Der Nachteil bei dem Reds-Modul besteht darin, dass die Namen der Json-Objekte mit durchgesucht werden. Wenn ein Nutzer zB. den Begriff „Author“ eingäbe, bekäme er alle Blogeinträge zurück, da jeder Blogeintrag den Namen des Json-Objekts „Author“ beinhaltet.
Ein möglicher Lösungsvorschlag für diese Problematik wäre, die Blogeinträge aufzuteilen, sodass die Json-Objekte einzeln gespeichert werden würden.

Der RESTClient ist abrufbar über
```
localhost:3000
```

####1.4 Beschreibung der Funktionalität, die aus Zeitmangel nicht umgesetzt werden konnte
Dadurch, dass die Grundidee mit ihren Funktionen nur einen Blog mit Kommentaren umfasst, ist die gebrauchte Funktionalität klarstrukturiert gewesen.
Die Rubrik „topcommented“ wurde geschrieben, konnte jedoch aus Zeitmangel nicht in den Dienstleister eingebunden werden. Sie hätte angezeigt, welcher Blogbeitrag am meisten kommentiert wurde.


##2. Dokumentation des Dienstnutzers
###2.1 Beschreibung der Anwendungslogik und der Datenhaltung mit Überlegungen dazu
Die Anwendungslogik des Dienstnutzers besteht darin, dass Blogeinträge erstellt und bearbeitet und diese kommentiert werden können. Des Weiteren können einzelne Kommentare, sowie der gesamte Blogeintrag gelöscht werden. Zusätzlich besteht die Möglichkeit Nutzer, welche Neuigkeiten oder Rezepte abonniert haben, mit Push-Nachrichten über neue Blogeinträge zu informieren. Das verwendete Modul Faye (https://www.npmjs.com/package/faye) bietet dem Nutzer die Möglichkeit, den Autor eines Blogeintrags über einen öffentlichen Chat zu kontaktieren. Die Überlegungen hierbei sind gewesen, einen interaktiven Blog zu erstellen.
Des Weiteren wurde für die Datenhaltung das Modul Faye-Redis als Engine verwendet, welches mit dem Redis-Server kommuniziert.
Darüber hinaus wird das Modul Faye-Redis verwendet, um Status und Routing-Nachrichten zu speichern, die das Faye Modul mitsendet. 


###2.2 Umsetzung der Präsentationslogik und Überlegungen dazu
Die Präsentationslogik basiert auf  dem Modul EJS. Das EJS Modul ist ein Template Engine basierend auf JavaScript. Es generiert einen HTML-String aus Templates und Daten, sodass der Code kalkulierbarer und dienlicher ist (https://www.npmjs.com/package/ejs).
Zusätzlich zu dem EJS-Modul wird das Modul EJS-Mate verwendet, wodurch ein Layout definiert werden kann, welches wiederholt verwendet wird.
Das freizugängliche Bootstrap CSS wir verwendet, um ein einfaches responsive Design zu ermöglichen.

Um den Dienstnutzer im Browser abzurufen:
```
localhost:3001
```


###2.3 Beschreibung der asynchron implementierten Teile der Nutzungsschnittstelle und Begründungen dazu
Asynchrone Implemetationen des Projekts sind zum einen das Express, das Redis und das Faye Modul. Dies ermöglicht den Nutzern gleichzeitig Blogeinträge zu erstellen, zu lesen, zu kommentieren und zu publishen/subscriben.


###2.4 Beschreibung der Funktionalität, die aus Zeitmangel nicht umgesetzt werden konnte
Zu Beginn existierte die Idee, über Tags oder über Zutaten Rezepte zusammenstellen zu können.
Die Suchfunktion, welche es ermöglicht hätte nach Zutaten zu suchen und ein Rezept zu diesen angegeben zu bekommen, wurde aus zeittechnischen Gründen nicht geschrieben. Diese Art der Suche ist zu komplex gewesen.
Des Weiteren war auch eine Schnittstelle geplant, die die Möglichkeit bieten sollte, Blogeinträge als Favoriten zu markieren. Um diese  Funktion sinnvoll einzubauen, wäre eine Anmeldungs- oder Session-Funktion erforderlich gewesen, welche aus zeittechnischen Gründen nicht umgesetzt werden konnte. Aus diesem Grund ist das Projekt aus der Admin-Perspektive, ohne jegliche Aufteilung oder Restriktionen für jeden Nutzer.


##3 Dokumentation des Prozesses
###3.1 Beschreibung der Vorgehensweise und der Irrwege
####Vorgehensweise
Zunächst wurden Überlegungen getätigt, in wie weit ein Blog realisierbar wäre und welche Ressourcen für diesen gebraucht werden könnten. Vorerst wurde nur an dem RESTClient gearbeitet,ohne Überlegungen an den Dienstnutzer/Dienstleister anzustellen und ohne eine Ressourcentabelle vorzufertigen, die es ermöglicht hätte strukturierter vorzugehen. So kam es zu eiem Fehler im Richardson-Maturity-Model Level 2, in unseren RESTClient, und zwar, dass bei einem GET-Aufruf ein Counter die Zugriffe mitgezählt hat. Dies kam zustande, da in Erfahrung gebracht werden wollte, welcher Blogeintrag am meisten abgerufen worden ist. Der Fehler wurde erst mit der Bearbeitung des Dienstleisters behoben. Während der Bearbeitung des Dienstnutzers, hat der Fokus in erster Linie der Präsentationslogik gegolten. An der Anwendungslogik wurde erst gearbeitet, nachdem die standardmäßigen Blogfunktionen gegeben waren. Die Ressourcen und der Dienstleister wurden fließend während der Bearbeitung der Präsentationslogik verändert. Schließlich führte dies zur Integrierung des Moduls Faye.

####Fazit
Grundsätzlich konnten alle vorüberlegten Funktionen erzielt werden, jedoch wurde erst mit dem Arbeiten am Projekt bewusst, wo die Implementierungs-Grenzen liegen. Ein strukturierteres Arbeiten, inbesondere der Vorüberlegungen zB. anhand von Ressourcen-Tabellen hätte Arbeitsschritte und Fehler erspart.

##Arbeitsmatrix
| Kategorie | Aziz Kilic | Aylin Mengi | Meryem Dural |
|-----------|------------|-------------|--------------|
| Code   | 50%  | 25% | 25% |
| Dokumentation | 50% | 25% | 25% |

   
