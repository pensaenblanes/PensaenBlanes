# Pensa en Blanes — Guia de desplegament

Aquesta carpeta conté tota la web, llesta per pujar a GitHub. Segueix aquests passos en ordre.

## 1. Estructura de fitxers

```
index.html
privacitat.html
404.html
style.css
script.js
CNAME
assets/
  logo.png
  hero.mp4
  hero-poster.jpg
  imatge-1.jpg
  imatge-2.jpg
  favicon.ico
  favicon-16x16.png
  favicon-32x32.png
  apple-touch-icon.png
  android-chrome-192x192.png
  android-chrome-512x512.png
  og-image.jpg
```

Puja-ho **tot tal qual, mantenint aquesta estructura de carpetes** (el fitxer `CNAME` no té extensió, és normal).

## 2. Pujar a GitHub Pages

1. Crea un repositori nou a GitHub (per exemple `pensa-en-blanes-web`). Pot ser públic o privat (GitHub Pages funciona amb tots dos si tens un pla que ho permeti; amb un compte gratuït cal que sigui **públic**).
2. Puja tots els fitxers d'aquesta carpeta a l'arrel del repositori (no dins d'una subcarpeta).
3. Ves a **Settings → Pages** del repositori.
4. A "Build and deployment", selecciona **Deploy from a branch**, branca `main`, carpeta `/ (root)`.
5. Guarda. GitHub trigarà uns segons a publicar-ho a `https://[el-teu-usuari].github.io/pensa-en-blanes-web/`.

## 3. Connectar el domini propi (Cloudflare)

Ja tens el domini `pensaenblanes.com` comprat a Cloudflare. Cal apuntar-lo a GitHub Pages:

1. Al tauler de Cloudflare, ves a **DNS** del domini `pensaenblanes.com`.
2. Afegeix aquests **4 registres tipus A** apuntant a les IP de GitHub Pages (perquè funcioni el domini arrel, sense `www`):

   | Tipus | Nom | Contingut |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

3. **Important:** posa aquests registres en mode **"DNS only" (núvol gris)**, no "Proxied" (núvol taronja), mentre GitHub verifica el domini. Un cop verificat i amb el certificat HTTPS actiu, pots tornar-los a mode "Proxied" si vols aprofitar la CDN de Cloudflare.
4. Torna a **Settings → Pages** del repositori de GitHub, al camp "Custom domain" escriu `pensaenblanes.com` i guarda. GitHub detectarà automàticament el fitxer `CNAME` que ja hem inclòs al repositori.
5. Espera que GitHub verifiqui el domini (pot trigar entre pocs minuts i unes hores) i marca la casella **"Enforce HTTPS"** quan estigui disponible.

## 4. Verificar Web3Forms

El formulari ja porta la teva clau (`access_key`) incrustada i apunta a `pensa@pensaenblanes.com`. Un cop la web estigui publicada:

1. Omple el formulari de prova des de la web ja publicada (no des de local).
2. Revisa la safata d'entrada de `pensa@pensaenblanes.com` — Web3Forms envia un primer correu de confirmació la primera vegada que rep un missatge des d'un domini nou; cal confirmar-lo perquè els següents arribin sense retenció.
3. Si no arriba res, comprova la carpeta de correu brossa i que el domini `pensaenblanes.com` estigui correctament donat d'alta a Brevo (SPF/DKIM), ja que això pot afectar la recepció.

## 5. Brevo

No cal cap configuració addicional a Brevo per al formulari: Web3Forms envia el correu directament a la bústia. Brevo continua funcionant exactament igual que fins ara per a la resta de correu professional.

## 6. Comprovacions finals un cop publicat

- Obre `https://pensaenblanes.com` des del mòbil i l'ordinador — comprova que el vídeo es reprodueix i que el menú mòbil funciona.
- Prova d'enviar el formulari de debò.
- Enganxa l'enllaç a un xat de WhatsApp per comprovar que es veu la miniatura amb el logo (pot trigar uns minuts perquè WhatsApp actualitzi la memòria cau la primera vegada — si no es veu de seguida, prova amb Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/, on pots forçar que rellegeixi la pàgina).
- Revisa la pàgina `pensaenblanes.com/privacitat.html` i confirma que el text s'ajusta al que necessiteu legalment (recomanem repàs per algú amb coneixement legal, per les obligacions específiques de transparència dels partits polítics).

## Notes tècniques

- El vídeo del Hero s'ha comprimit de 8,4 MB a 2,5 MB (720p, sense àudio) per carregar ràpid en mòbil.
- No hi ha cap cookie ni eina d'analítica instal·lada.
- Totes les imatges i el favicon s'han generat a partir del logo i les fotos que ens vas facilitar.
