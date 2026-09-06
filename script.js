/* ====================================================================
   FŐ JAVASCRIPT LOGIKA
   ====================================================================
   Ez a fájl felel azért, hogy az oldal "életre keljen":
   - megnyitja/bezárja az oldalsó menüt
   - kirajzolja a cikk-kártyákat a főoldalon
   - betölti és megjeleníti a kiválasztott cikket

   A kód apró, elnevezett funkciókra ("function") van bontva,
   hogy könnyű legyen megérteni, melyik rész mit csinál.
*/


/* --------------------------------------------------------------------
   1. RÉSZ: HTML ELEMEK ELÉRÉSE
   --------------------------------------------------------------------
   A "document.getElementById" megkeresi az adott "id"-jű elemet
   az index.html fájlban, hogy utána JavaScriptből tudjunk vele dolgozni.
*/
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("sidebar");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const overlay = document.getElementById("overlay");
const logoLink = document.getElementById("logoLink");

const articleListView = document.getElementById("articleListView");
const articleView = document.getElementById("articleView");
const articleGrid = document.getElementById("articleGrid");
const articleContent = document.getElementById("articleContent");
const backBtn = document.getElementById("backBtn");


/* --------------------------------------------------------------------
   2. RÉSZ: OLDALSÓ MENÜ (SIDEBAR) NYITÁSA / ZÁRÁSA
   -------------------------------------------------------------------- */

// Megnyitja a sidebart: hozzáadja a megfelelő CSS osztályokat
function sidebarMegnyitasa() {
    sidebar.classList.add("sidebar-open");
    overlay.classList.add("overlay-visible");
}

// Bezárja a sidebart: eltávolítja a CSS osztályokat
function sidebarBezarasa() {
    sidebar.classList.remove("sidebar-open");
    overlay.classList.remove("overlay-visible");
}

// Ha a hamburger gombra kattintunk, nyissuk meg a menüt
hamburgerBtn.addEventListener("click", sidebarMegnyitasa);

// Ha az X gombra kattintunk, zárjuk be
sidebarCloseBtn.addEventListener("click", sidebarBezarasa);

// Ha a sötét háttérre (overlay) kattintunk, azzal is zárjunk
overlay.addEventListener("click", sidebarBezarasa);


/* --------------------------------------------------------------------
   3. RÉSZ: CIKK-KÁRTYÁK KIRAJZOLÁSA A FŐOLDALON
   --------------------------------------------------------------------
   Végigmegyünk a "cikkLista" tömbön (ez az articles.js fájlban van),
   és minden egyes cikkhez létrehozunk egy kártyát (gombot).
*/
function kartyakKirajzolasa() {
    // Előbb ürítsük ki a grid tartalmát, hogy ne duplázódjon
    articleGrid.innerHTML = "";

    cikkLista.forEach(function (cikk) {
        // Létrehozunk egy <button> elemet minden cikkhez
        const kartya = document.createElement("button");
        kartya.className = "article-card";

        // A kártya belsejébe beírjuk a címet és a leírást
        kartya.innerHTML = `
            <div class="article-card-title">${cikk.cim}</div>
            <div class="article-card-desc">${cikk.leiras}</div>
        `;

        // Ha rákattintunk a kártyára, nyissuk meg az adott cikket
        kartya.addEventListener("click", function () {
            cikkMegnyitasa(cikk);
        });

        // Hozzáadjuk a kártyát a grid-hez, hogy megjelenjen az oldalon
        articleGrid.appendChild(kartya);
    });
}


/* --------------------------------------------------------------------
   4. RÉSZ: EGY CIKK BETÖLTÉSE ÉS MEGJELENÍTÉSE
   --------------------------------------------------------------------
   A "fetch" paranccsal beolvassuk a cikk .md fájljának tartalmát,
   majd a "marked.parse()" függvénnyel (ezt a marked.js könyvtár adja)
   HTML-lé alakítjuk, és beírjuk a cikk nézet dobozába.
*/
function cikkMegnyitasa(cikk) {
    // Átváltunk a "cikk nézetre": elrejtjük a listát, megmutatjuk a cikket
    articleListView.classList.add("hidden");
    articleView.classList.remove("hidden");

    // Amíg a fájl betölt, mutassunk egy egyszerű üzenetet
    articleContent.innerHTML = "<p>Betöltés...</p>";

    // Beolvassuk a .md fájl tartalmát
    fetch(cikk.fajl)
        .then(function (valasz) {
            //ellenőrző konzoljelentés
            console.log("Válasz érkezett:", valasz);
            console.log("Státusz:", valasz.status);
            console.log("OK:", valasz.ok);
            // Ha a fájl nem található, hibát dobunk
            if (!valasz.ok) {
                throw new Error("A fájl nem található: " + cikk.fajl);
            }
            return valasz.text();
        })
        .then(function (markdownSzoveg) {
            // A Markdown szöveget HTML-lé alakítjuk, és megjelenítjük
            articleContent.innerHTML = marked.parse(markdownSzoveg);
        })
        .catch(function (hiba) {
            // Ha valami hiba történt (pl. nincs meg a fájl), írjuk ki
            articleContent.innerHTML =
                "<p>Nem sikerült betölteni a cikket. Hiba: " + hiba.message + "</p>";
        });
}

// A "Vissza a cikkekhez" gomb visszaviszi a listanézetre
backBtn.addEventListener("click", function () {
    articleView.classList.add("hidden");
    articleListView.classList.remove("hidden");
});

// A fejlécben lévő logóra kattintva is visszatérünk a főoldalra
logoLink.addEventListener("click", function (esemeny) {
    esemeny.preventDefault(); // megakadályozza, hogy a link "ugorjon" valahova
    articleView.classList.add("hidden");
    articleListView.classList.remove("hidden");
});


/* --------------------------------------------------------------------
   5. RÉSZ: INDÍTÁS
   --------------------------------------------------------------------
   Amikor az oldal betöltődik, rajzoljuk ki a cikk-kártyákat.
*/
kartyakKirajzolasa();
