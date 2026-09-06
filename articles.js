/* ====================================================================
   CIKKLISTA
   ====================================================================
   Ez a fájl egyetlen dolgot tartalmaz: egy listát ("tömböt") a cikkekről.

   HA ÚJ CIKKET AKARSZ HOZZÁADNI:
   1. Hozz létre egy új .md fájlt az "articles" mappában (pl. articles/uj-cikk.md)
   2. Másolj be ide egy új sort a minta alapján, pl.:
      { id: "uj-cikk", cim: "Az új cikk címe", leiras: "Rövid leírás.", fajl: "articles/uj-cikk.md" }
   3. Mentsd el ezt a fájlt — kész is vagy, az oldal automatikusan felismeri.

   Minden cikknek 4 tulajdonsága van:
   - id:     egyedi azonosító (ne legyen két egyforma!)
   - cim:    ez jelenik meg a kártya tetején, félkövéren
   - leiras: rövid, egy-két mondatos leírás a kártyán
   - fajl:   az .md fájl elérési útja
*/

const cikkLista = [
    {
        id: "elso-cikk",
        cim: "Üdvözlünk az oldalon!",
        leiras: "Egy rövid bemutató arról, hogyan működik ez a tanuló oldal.",
        fajl: "articles/elso-cikk.md"
    },
    {
        id: "markdown-alapok",
        cim: "Markdown alapok",
        leiras: "Hogyan írj cikket egyszerű szöveges .md fájlban.",
        fajl: "articles/markdown-alapok.md"
    },
    {
        id: "hogyan-bovitsd",
        cim: "Hogyan bővítsd ezt az oldalt",
        leiras: "Ötletek és lépések, ha új funkciókat szeretnél hozzáadni.",
        fajl: "articles/hogyan-bovitsd.md"
    }
];
