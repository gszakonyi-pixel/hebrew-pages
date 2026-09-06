# Hogyan bővítsd ezt az oldalt

Ez az oldal szándékosan egyszerűre lett építve, hogy könnyen hozzá tudj nyúlni. Néhány ötlet, honnan érdemes kezdeni.

## Új cikk hozzáadása

1. Hozz létre egy új `.md` fájlt az `articles` mappában.
2. Nyisd meg az `articles.js` fájlt, és adj hozzá egy új sort a listához.
3. Mentsd el — a cikk automatikusan megjelenik a főoldalon.

## A felső menü gombjainak működővé tétele

Az `index.html` fájlban találod a `top-nav` gombokat. Egy gombhoz így adhatsz funkciót:

```html
<button class="top-nav-btn" onclick="alert('Szia!')">Kezdőlap</button>
```

## Az oldalsó menü bővítése

A `sidebar-list` lista az `index.html` fájlban van. Egyszerűen adj hozzá egy új `<li><a href="#">Új menüpont</a></li>` sort.

## Színek módosítása

Nyisd meg a `style.css` fájlt, és keresd meg a `:root` részt a tetején. Ott találod az összes fő színt egy helyen — ezek módosításával az egész oldal kinézete megváltozik.
