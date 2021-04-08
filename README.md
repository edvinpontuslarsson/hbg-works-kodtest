[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<p>
  <a href="https://github.com/helsingborg-stad/hbg-works-kodtest/">
    <img src="images/hbg-github-logo-combo.png" alt="Helsingborg Stad" width="300">
  </a>
</p>
<h3>HBG Works kodtest för rekrytering av utvecklare</h3>
<p>
  Välkommen till vårt kodtest för utvecklare, lycka till!
</p>

## Set up instructions

### Docker setup inspiration:
https://github.com/mrcoles/node-react-docker-compose

### Run with Docker
``` docker-compose up ```

### Tear down
``` docker-compose down ```

### Rebuild
``` docker-compose up --build ```

### See what is stored in the MongoDB database

1. ``` docker ps ```
2. ``` docker exec -it <id> bash ```
3. ``` mongo ```
4. ``` use hbg-works-kodtest ```
5. ``` show tables ```
6. ``` db.<name of collection>.find() ```

## Instruktioner
- Klona det här repot till din dator med din git-klient.
- Utför uppgiften i valfritt språk och följ våra guidelines så bra du kan.
- Packa ner hela denna foldern med .git-foldern inkluderad och skicka in den till din kontakt hos oss.

## Hur bedömer vi dig?
Vi kommer lägga vikt på hur väl du följer våra guidelines samt senare ta en diskussion med dig om ur du går till väga med att lösa uppgiften.

## Guidelines
- Commita din kod ofta så att vi kan följa arbetsgången.
- Använd en lämplig mängd färdiga komponenter så som Docker, linters för att kvalitetssäkra lösningen och underlätta onboardingen.
- Välj en kodstandard för ditt valda språk och följ den så bra som möjligt.
- I frontend använd separata mallar och undvik blanda kod och html.
- Kommentera din kod med funktions-kommentarer.
- Försök ha en logisk mapp-struktur på dina filer i projektet.
- Skriv över och commita README.md markdown där du skriver ner följande.
  - Installationsprocess om det finns någon.
  - Kort beskrivning av lösningen och vad den gör.
  - Tools som du har använt för att lösa testet.
  - Kodstandard du följer.

## Uppgift
Skapa ett webbformulär för ansökningar till en skola.  
Formuläret är till för företag som som vill söka till kurser på skolan.  
Varje kurs är tillgänglig på olika datum, alla ansökningar skall sparas ner i en databas och innehålla följande.

- Kurs-ID
- Kursdatum
- Företagsnamn
- Telefonnummer till företaget
- Email tilll företaget.
- 1 eller fler deltagare med följande info
  - Namn
  - Telefonnummer
  - email
  
## Resurser
Design hittar du i repot.  
Kurserna finns som json-format i repot.  
Fonten som används är [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro)


## Slutligen
Om du har någon feedback på testet så skicka den gärna till oss efter du är klar.  
Skulle någonting vara oklart med testet så tveka inte att fråga oss.  

[contributors-shield]: https://img.shields.io/github/contributors/helsingborg-stad/hbg-works-kodtest.svg?style=flat-square
[contributors-url]: https://github.com/helsingborg-stad/hbg-works-kodtest/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/helsingborg-stad/hbg-works-kodtest.svg?style=flat-square
[forks-url]: https://github.com/helsingborg-stad/hbg-works-kodtest/network/members
[stars-shield]: https://img.shields.io/github/stars/helsingborg-stad/hbg-works-kodtest.svg?style=flat-square
[stars-url]: https://github.com/helsingborg-stad/hbg-works-kodtest/stargazers
[issues-shield]: https://img.shields.io/github/issues/helsingborg-stad/hbg-works-kodtest.svg?style=flat-square
[issues-url]: https://github.com/helsingborg-stad/hbg-works-kodtest/issues
[license-shield]: https://img.shields.io/github/license/helsingborg-stad/hbg-works-kodtest.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/helsingborg-stad/hbg-works-kodtest/master/LICENSE