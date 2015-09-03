# WBA2-SoSe15-T8
WBA 2 SoSe15 Team 8 (Meryem Dural, Aylin Mengi, Aziz Kilic)

##Aufgaben zum ersten Workshop
Datei "A1.js"

##Exposé
   
###Accuratus
   
####Funktionen
- jeder kann Rezept posten
- jeder kann jedes Rezept kommentieren
- ein Blogeintrag kann mit samt Keommentaren gelöscht werden
- ein Kommentar kann gelöscht werden 
- jeder kann Blogeintrag mit den meisten Aufrufen anfragen
- jeder kann den neusten Blogeintrag anfragen
- jeder kann Blogeintrag mit den meisten Kommentaren anfragen
   
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

      
####Ressourcen-Tabelle 


| Ressource              | Methode | Semantik                                                                             | Content-Type (req) | Content-Type (res) |
|------------------------|---------|--------------------------------------------------------------------------------------|--------------------|--------------------|
| /post                | post    | Posten eines Posts mit ID                                                    |            application/json        |        text/plain            |
| /post/:postid              | get     | Anfragen eines Posts nach ID                                 |       application/json             |          application/json          |
| /post/:postid              | put     | Ändern eines Posts                                    |      application/json              |      text/plain              |
| /post/:postid              | delete  | Löschen eines Posts mit ihren Kommentaren                                                         |          application/json          |     application/json               |
| /top                 | get     | Anfrage des Posts mit den meisten Anfragen                              |      application/json              |            application/json        |
| /mostrecent | get    | Anfrage des jüngsten( bzw des neusten) Posts                          |        application/json            |         application/json           |
| /post/:postid/comment/ | post     | Posten eines Kommentares zum jeweiligen Post. Ermöglicht Löschen und Abrufen nach ID  |        text/plain            |         application/json           |
| /post/:id/comment/ | get     | Anfragen aller Kommentare zum Post |       application/json             |      application/json              |
| /post/:pid/comment/:cid | delete  | Löschen eines Kommentares                                      |       application/json             |         application/json           |
| /topcommented    | get     |      Anfrage des Posts mit den meisten Kommentaren                                                                               |       application/json             |        application/json            |
| /     | get     |        SUCH-Funktion                                                                              |        text/plain            |        application/json            |


      
#### Use Cases

##### 1.
Maria Schäfer ist eine leidenschaftliche Bloggerin. Sie zeigt anderen Mädchen, wie sie sich schminken sollen und welches Outfit zu dieser Schminke passen würde. Da es zur Zeit angesagt ist, okölogisch und ökonomisch zu Handeln, werden ihr immer häufiger Fragen gestellt, ob man Kosmetikartikel auch selber herstellen könne, da die meisten nicht vegan sind und oder mit Hilfe von Tierversuchen hergestellt würden. Um ihre Fans nicht zu enttäuschen, entschließt Maria Schäfer sich, ihren eigenen Lippenstift herzustellen. Da sie jedoch nicht dafür ausgebildet wurde, so etwas zu kreieren, sucht sie im Internet nach Hilfen und stößt auf eine Website namens Accuratus. Mit Hilfe einer Suchfunktion erhält sie in wenigen Klicks mehrere Rezepte für einen selbstgemachten Lippenstift. Anhand der Kommentare zu den Rezepten und den Klickanzahlen, sieht Maria schnell, welches Rezept empfehlenswert wäre. Dies probiert sie aus und präsentiert ihr Ergebnis in einer neuen Folge ihres Bloggs ihren Fans.
  
  
##### 2.
Tanja Buschmann ist vor einigen Monaten Mutter geworden und ist in ständiger Sorge um ihr Kind. Aus einem unerklärlichen Grund verträgt ihr Neugeborenes keinerlei Produkte aus der Drogerie. Daraufhin beschloss Tanja die Artikel für ihr Baby aus der Apotheke zu kaufen. Diese jedoch sind so teuer, dass die Mutter es auf die Dauer nicht schafft, den Kosten gerecht zu werden. Eine Freundin die selber Mutter von zwei Kindern ist, empfiehlt Tanja ihre Produkte eigenständig herzustellen. Diese bezieht ihre Rezepte regelmäßig von der Website Accuratus. Da Tanja jedoch keinerlei Internet-Erfahrung hat, scheut sie sich davor, dieser Empfehlung nachzukommen. Schnell kommt ihre Freundin Tanja entgegen und erklärt kurzerhand wie sie nur mit einer Sucheingabe an gewünschte Produkte gelangen kann. Tanja ist dennoch skeptisch, da sie ihrem Baby nicht irgendwelche Produkte zumuten möchte. Auch hierfür kennt ihre Freundin eine Lösung. Die vielen Kommentare verschiedenster Menschen sind unter den Rezepten. Tanja entschließt sich unter einem Rezept zu schreiben, ob dieses Produkt für Neugeborene empfehlenswert wäre. Als sie daraufhin schnell eine Antwort bekommt, probiert sie das Rezept aus. Heute mischt sich Tanja regelmäßig Produkte für sich und ihr Baby. Glücklicherweise ist jeglicher Ausschlag dank Accuratus zurückgegangen.
  
    
##### 3.
Jan Hermens lebt seit einigen Jahren vollkommen vegan. In einem Skandal in den Nachrichten wurde bekannt gegeben, dass eine Marke, der Jan vertraut hat, dass sie alles vegan herstellen, Tierversuche macht. Dies war ein großer Schock für ihn, da er die Produkte der Marke für viel Geld erworben hat, um zuversichtlich vegan leben zu können. Nach diesem Schock ist Jan der Meinung er könne bezüglich Kosmetik- bzw Hygieneartikel niemandem mehr vertrauen. Er beschließt sich diese Produkte eigenhändig herzustellen, denn nur so kann er mit Sicherheit sagen, ob etwas wirklich zu 100% vegan ist. 
Nach einer kurzen Recherche im Internet stößt Jan auf zwei Websites. Ihm gefällt die Seite "Accuratus", da er sehen kann, wie oft ein Rezept aufgerufen wurde. Dies hilft ihm weiter, da er nichts probieren möchte, was nicht schon andere einmal probiert haben. Schnell merkt Jan, dass es gar nicht so kompliziert ist, sich seine Produkte selbst herzustellen. Er versucht gelegentlich einige Rezepte zu erweitern und postet diese selber. Heute ist Jan einer der häufigsten Rezepte-Blogger der Seite Accuratus.



