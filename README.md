# Turing-haaste

Suomenkielinen PWA-haastegeneraattori **Turing Machine** -lautapeliin.

Tämä repositorio on forkki alkuperäisestä fan-made Python-generaattorista. Forkin päätarkoitus on tarjota iPhonella, iPadilla ja tietokoneella toimiva selain/PWA-käyttöliittymä, jolla voi luoda uusia epävirallisia Turing Machine -haasteita pelipöydässä.

Sovellus luo haasteita, joilla on täsmälleen yksi ratkaisu.

## PWA-käyttö

Käynnistä paikallinen palvelin repositorion juuressa:

```bash
python3 -m http.server 8000
```

Avaa selaimessa:

```text
http://127.0.0.1:8000/
```

iPhonella tai iPadilla avaa sama osoite lähiverkon IP-osoitteella, esimerkiksi:

```text
http://192.168.1.50:8000/
```

Safarissa sovelluksen voi lisätä kotivalikkoon:

```text
Jaa -> Lisää Koti-valikkoon
```

## Pelissä

1. Valitse vaikeustaso: `Helppo`, `Normaali` tai `Vaikea`.
2. Valitse tarkistimien määrä: 4-6.
3. Halutessasi pakota mukaan tietty tarkistin.
4. Paina `Luo haaste`.
5. Aseta fyysisessä pelissä näkyvät tarkistimet A, B, C... pöydälle.
6. Ota jokaiselle tarkistimelle sovelluksen näyttämä tarkistuskortti.
7. Pelaa normaalisti. Paina `Ratkaisu` vasta, kun haluat tarkistaa vastauksen.

Tarkistinkortin napautus näyttää kyseisen tarkistimen mahdolliset ehdot, mutta ei paljasta oikeaa ehtoa. Ratkaisu näyttää oikean koodin ja oikeat ehdot.

## Vaikeustasot

- `Helppo`: tarkistimet 1-17
- `Normaali`: tarkistimet 1-22
- `Vaikea`: tarkistimet 1-48

## Staattiset tiedostot

PWA toimii ilman build-vaihetta:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icon.svg`

## Python-työkalut

Alkuperäinen Python-komentorivityökalu on edelleen mukana.

Luo yksittäinen haaste:

```bash
python3 turing.py 4 EASY
python3 turing.py 6 STANDARD --include-verifiers 14
python3 turing.py 5 HARD --include-verifiers 3 40
```

Listaa ratkaisut tarkistinjoukolle:

```bash
python3 turing.py --getcodes 7 13 24 32
```

Luo PDF-vihko:

```bash
python3 -m pip install -r requirements.txt
python3 turing.py --generate-booklet
```

PDF-toiminto vaatii `fpdf2`-kirjaston.

## Huomioita

Tämä on epävirallista fanisisältöä. Sitä ei ole tehnyt Le Scorpion Masqué eikä pelin tekijät.

Forkissa on mukana tarkistuskorttikorjaus:

```python
68: {"lozenge": 628, "pound": 391, "slash": 630, "currency": 389}
```
