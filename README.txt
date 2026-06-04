Duelos Web V7

Cambios:
- Corrección de clase/subclase:
  - En héroes: i11 = imagen de clase, i14 = imagen de subclase.
  - En cartas: i11 se interpreta como imagen/icono. Si coincide con una imagen de subclase del héroe, la carta queda bloqueada a esa subclase. Si coincide con la imagen de clase, queda como carta general de clase.
- Isol, Engendro de maná ahora aparece como Tecnomago / Manáfago.
- El flujo clase → subclase → héroe se mantiene.

Total de cartas: 174

Por clase:
{
  "Asesino": 39,
  "Paladín": 33,
  "Tecnomago": 34,
  "Nigromante": 36,
  "Ingeniera de Conquista": 32
}

Por tipo:
{
  "Héroe": 15,
  "Esbirro": 91,
  "Hechizo": 49,
  "Arma": 9,
  "Campo": 7,
  "Esbirro Extra": 3
}

Cartas bloqueadas por subclase:
{
  "Asesino / Alquimista": 2,
  "Asesino / Hojas Danzantes": 2,
  "Asesino / Sombras Gemelas": 2,
  "Paladín / Alas de acero": 2,
  "Paladín / Paragón de Luz": 2,
  "Paladín / Sol Eclipsado": 2,
  "Tecnomago / Artificiero": 2,
  "Tecnomago / Manáfago": 2,
  "Tecnomago / Saqueador": 2,
  "Nigromante / Bruja de Sangre": 2,
  "Nigromante / Reanimador": 2,
  "Nigromante / Ritualista Oscuro": 1,
  "Ingeniera de Conquista / \"Mejoradora\"": 2,
  "Ingeniera de Conquista / Estratega Belicista": 2,
  "Ingeniera de Conquista / Revolucionaria": 2
}

Héroes:
[
  {
    "name": "Thuls, Mortacechador",
    "class": "Asesino",
    "subclass": "Sombras Gemelas",
    "classImage": "Emboscada.png",
    "subclassImage": "Paso Sombrío.png",
    "heroImage": "Opera Instantánea_2025-05-07_104834_creator.nightcafe.studio.png"
  },
  {
    "name": "Flamel, mente envenenada",
    "class": "Asesino",
    "subclass": "Alquimista",
    "classImage": "",
    "subclassImage": "Opera Instantánea_2025-02-01_145955_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_104434_creator.nightcafe.studio.png"
  },
  {
    "name": "Rampeish, el demonio",
    "class": "Asesino",
    "subclass": "Hojas Danzantes",
    "classImage": "",
    "subclassImage": "Frenesí.png",
    "heroImage": "Opera Instantánea_2025-05-07_103949_creator.nightcafe.studio.png"
  },
  {
    "name": "Mograine, Ascendido",
    "class": "Paladín",
    "subclass": "Alas de acero",
    "classImage": "Opera Instantánea_2025-02-11_114204_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-05-06_115902_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_095743_creator.nightcafe.studio.png"
  },
  {
    "name": "Ofhelia de la Santa Luz",
    "class": "Paladín",
    "subclass": "Paragón de Luz",
    "classImage": "Opera Instantánea_2025-02-11_114204_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-02-11_112657_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_095829_creator.nightcafe.studio.png,42,25,193"
  },
  {
    "name": "Rabia, luz trémula",
    "class": "Paladín",
    "subclass": "Sol Eclipsado",
    "classImage": "Opera Instantánea_2025-02-11_114204_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-05-06_120008_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-02_012247_creator.nightcafe.studio.png"
  },
  {
    "name": "Uriel, el Aprendiz",
    "class": "Tecnomago",
    "subclass": "Artificiero",
    "classImage": "Opera Instantánea_2025-02-05_210314_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-05-06_110637_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_104546_creator.nightcafe.studio.png"
  },
  {
    "name": "Isol, Engendro de maná",
    "class": "Tecnomago",
    "subclass": "Manáfago",
    "classImage": "Opera Instantánea_2025-02-05_210314_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-05-06_110737_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-02_012840_creator.nightcafe.studio.png"
  },
  {
    "name": "Techis, Ladrón de reliquias",
    "class": "Tecnomago",
    "subclass": "Saqueador",
    "classImage": "Opera Instantánea_2025-02-05_210314_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-02-05_210504_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2024-01-30_113352_creator.nightcafe.studio.png"
  },
  {
    "name": "Gothik, el exánime",
    "class": "Nigromante",
    "subclass": "Reanimador",
    "classImage": "Opera Instantánea_2025-02-05_220710_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-02-05_210452_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_110136_creator.nightcafe.studio.png"
  },
  {
    "name": "Hyung Daegu, Bruja carmesí",
    "class": "Nigromante",
    "subclass": "Bruja de Sangre",
    "classImage": "Opera Instantánea_2025-02-05_220710_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-02-05_211153_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_103929_creator.nightcafe.studio.png"
  },
  {
    "name": "Zarín, el Pesteador",
    "class": "Nigromante",
    "subclass": "Ritualista Oscuro",
    "classImage": "Opera Instantánea_2025-02-05_220710_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-02-05_205119_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2024-01-29_003609_creator.nightcafe.studio.png"
  },
  {
    "name": "Kaneth, más allá de lo mortal",
    "class": "Ingeniera de Conquista",
    "subclass": "\"Mejoradora\"",
    "classImage": "Opera Instantánea_2025-05-06_112026_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-05-06_111858_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_103815_creator.nightcafe.studio.png"
  },
  {
    "name": "Raina, la Imbatible",
    "class": "Ingeniera de Conquista",
    "subclass": "Estratega Belicista",
    "classImage": "Opera Instantánea_2025-05-06_112026_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-05-06_111625_graphicriver.net.png",
    "heroImage": "Cazadora de la conquista.png"
  },
  {
    "name": "Sophia del siglo de las Luces",
    "class": "Ingeniera de Conquista",
    "subclass": "Revolucionaria",
    "classImage": "Opera Instantánea_2025-05-06_112026_graphicriver.net.png",
    "subclassImage": "Opera Instantánea_2025-05-06_111613_graphicriver.net.png",
    "heroImage": "Opera Instantánea_2025-05-07_103704_creator.nightcafe.studio.png"
  }
]


V8:
- Imágenes:
  Crea/usa la carpeta images/ y coloca ahí las imágenes de cartas.
- Exportación Untap.in:
  [Play] = héroe.
  [Main Deck] = cartas normales.
  [Second Deck] = cartas detectadas como pócima.
  [Tokens] = esbirros extra.
- Copias especiales:
  Reanimado máximo 10.
  Víctima de la dama tóxica máximo 2.
  Soldado raso máximo 10.
- Orden visual:
  Las cartas disponibles salen primero.
  Las cartas bloqueadas por clase/subclase quedan al final.


V9:
- Las Pócimas tienen máximo 1 copia.
- Las Pócimas se exportan a [Second Deck].
- Los Esbirros Extra se exportan a [Tokens].
- En la interfaz, Pócimas y Esbirros Extra se muestran como categoría lógica "Extra".
- Las cartas normales conservan su tipo real para reglas internas.


V10:
- Las imágenes de clase/subclase/héroe ya se intentan cargar desde images/.
- Las cartas ya elegidas bajan al final de la galería.
- Las cartas ya elegidas aparecen desactivadas con el botón "Ya elegido".
- Para que los iconos de subclase aparezcan, sus archivos también deben estar dentro de images/.


V11:
- El héroe elegido también aparece en la galería como una carta más.
- Las cartas ya elegidas siguen bajando al final y muestran "Ya elegido".
- Imágenes de cartas con proporción fija para que no rompan el texto.
- Estadísticas ahora aparecen como orbes:
  gris = daño/ataque
  rojo = salud/vida
  amarillo = durabilidad/duración


V12:
- Las cartas con 2 copias ya permiten añadir la segunda copia.
- El botón muestra Añadir (1/2) hasta llegar al máximo.
- Solo baja al final y dice Ya elegido cuando ya está al máximo.
- Los orbes se separan a los extremos: daño izquierda, vida/durabilidad derecha.
- En la elección de héroe se muestra la carta más completa: imagen, texto y vida.


V13:
- Cartas con subtipo "(Único)" máximo 1 copia.
- Armas máximo 1 copia.
- Pócimas máximo 1 copia.
- Reanimados máximo 10 copias.
- Soldados rasos máximo 10 copias.
- Víctimas de la dama tóxica máximo 4 copias.
- Botón de añadir alineado al fondo de cada carta.
- Botón "Exportar mazo" descarga un .txt con la lista separada por zonas.
- La URL generada es local tipo blob:, útil para descargar, pero Untap.in solo podrá leer una URL si el archivo está alojado públicamente.


V14:
- Campos máximo 1 copia por mazo.
- Corrección de imágenes con sufijos accidentales después de la extensión.
  Ejemplo: "imagen.png,42,25,193" ahora se lee como "imagen.png".
- Esto corrige la imagen de Ofhelia/Ophelia si el archivo existe en images/ con su nombre normal.


V15:
- El contador principal ahora muestra Main Deck: X/30.
- El héroe no cuenta para el total.
- Pócimas / Second Deck no cuentan para el Main Deck.
- Esbirros Extra / Tokens no cuentan para el Main Deck.
- El mazo principal tiene límite de 30 cartas.
- Las cartas extra siguen apareciendo en exportación, pero no afectan el límite de 30.


V16:
- La curva de coste ahora solo cuenta cartas del Main Deck.
- Tokens, héroe, pócimas y Second Deck ya no aparecen en la curva.
- Añadido promedio de coste del Main Deck.

V17:
- Regenerado desde el nuevo cards.json.
- Las armas leen Una mano/Dos manos desde t20: Arma (Una mano), Arma (Dos manos).
- Se añade weaponHands al cards.json web.
