export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  tagColor: string;
  author: string;
  date: string;
  readingTime: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'alejar-ninos-youtube',
    title: '¿Por qué alejar a los niños de YouTube es una de las mejores decisiones?',
    excerpt: 'Las pantallas no son niñeras. Descubre cómo el consumo excesivo de contenido digital afecta el desarrollo cognitivo, emocional y social de nuestros hijos.',
    tag: 'Salud Digital',
    tagColor: 'bg-red-50 text-red-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-01',
    readingTime: 6,
    content: `## La pantalla que todo lo absorbe

Reconozcámoslo: todos hemos caído en la tentación. El niño llora, hay que cocinar, hay que trabajar, y ahí está YouTube, listo para hipnotizar a nuestros hijos con colores brillantes y sonidos repetitivos. Pero ¿a qué precio?

## Lo que la ciencia nos dice

Múltiples estudios han demostrado que el consumo excesivo de contenido digital en niños menores de 10 años está asociado con:

- **Reducción de la capacidad de atención**: Los videos cortos y de ritmo rápido entrenan al cerebro para esperar estímulos constantes, haciendo que actividades como leer o escuchar en clase se sientan "aburridas".
- **Retraso en el desarrollo del lenguaje**: Un niño que consume contenido pasivamente no está practicando la conversación, la formulación de ideas ni el vocabulario activo.
- **Problemas de regulación emocional**: Cuando el entretenimiento siempre está disponible con un clic, los niños pierden la capacidad de tolerar el aburrimiento, una habilidad fundamental para la creatividad.
- **Alteraciones del sueño**: La luz azul y la sobreestimulación antes de dormir afectan directamente la calidad del descanso.

## Mi experiencia como padre

En mi casa, YouTube se había convertido en la solución para todo. ¿El niño no quiere comer? YouTube. ¿Hay que hacer una llamada de trabajo? YouTube. ¿Es hora de descansar? YouTube.

Un día me di cuenta de que mi hijo prefería ver a otros niños jugar en una pantalla antes que jugar él mismo. Eso fue mi punto de quiebre.

## ¿Qué hicimos diferente?

No eliminamos las pantallas de golpe, eso no funciona y genera frustración. Lo que hicimos fue **reemplazar gradualmente**:

1. **Sopas de letras y crucigramas** en lugar del primer video del día
2. **Lectura compartida** de 15 minutos antes de dormir, en vez de una tableta
3. **Dibujo libre** mientras cocinábamos, en lugar de YouTube en la cocina
4. **Juegos de mesa** los fines de semana como actividad familiar

## El resultado

Después de tres meses, la diferencia fue notable. Mi hijo empezó a inventar sus propias historias, a dibujar con más detalle, y lo más importante: su capacidad de concentración mejoró visiblemente.

## No es fácil, pero vale la pena

Sé que suena idealista. Sé que hay días donde la paciencia se acaba. Pero cada minuto que rescatamos de la pantalla es un minuto invertido en su desarrollo real. Y eso, como padres, es lo mejor que podemos ofrecerles.

No se trata de ser el padre perfecto. Se trata de intentarlo cada día, un poco mejor que ayer.`,
  },
  {
    slug: 'aprender-jugando',
    title: 'Aprender jugando: la ciencia detrás del aprendizaje activo',
    excerpt: 'Los niños no aprenden sentados escuchando. Aprenden haciendo, tocando, creando. Convierte cualquier tema escolar en una actividad divertida.',
    tag: 'Educación',
    tagColor: 'bg-sky-50 text-sky-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-04',
    readingTime: 5,
    content: `## El cerebro aprende cuando se divierte

Hay una verdad que la neurociencia ha confirmado una y otra vez: **el cerebro humano aprende mejor cuando está emocionalmente involucrado**. Y para un niño, la emoción más poderosa es la diversión.

Cuando un niño juega, su cerebro libera dopamina, el neurotransmisor del placer y la motivación. Esa dopamina no solo hace que el niño quiera seguir jugando, sino que fortalece las conexiones neuronales asociadas a lo que está aprendiendo.

## El problema del aprendizaje tradicional

Sentar a un niño de 7 años frente a un cuaderno y pedirle que copie definiciones durante una hora es, neurológicamente hablando, la peor estrategia posible. El cerebro infantil necesita:

- **Movimiento**: El aprendizaje kinestésico involucra al cuerpo completo
- **Variedad**: Cambiar de actividad cada 15-20 minutos mantiene la atención
- **Propósito**: El niño necesita entender para qué sirve lo que aprende
- **Retroalimentación inmediata**: Saber si lo hizo bien o mal en el momento

## Ejemplos prácticos

### Matemáticas con juegos de mesa
Un simple juego de dados puede enseñar suma, probabilidad y estrategia. No necesitas material especial, solo creatividad.

### Vocabulario con sopas de letras
Buscar palabras en una cuadrícula activa la memoria visual, la concentración y el reconocimiento de patrones. Es mucho más efectivo que repetir listas de palabras.

### Ciencias naturales con experimentos caseros
Mezclar vinagre con bicarbonato enseña más sobre reacciones químicas que cualquier párrafo de un libro de texto.

### Historia con dibujos y dramatizaciones
Pedirle a un niño que dibuje una escena histórica o que actúe un evento lo obliga a comprender, no solo memorizar.

## El rol del padre en el aprendizaje activo

No necesitas ser pedagogo para implementar el aprendizaje activo. Solo necesitas:

1. **Observar qué le interesa** a tu hijo y conectarlo con lo que tiene que aprender
2. **Convertir la tarea en un reto**, no en una obligación
3. **Celebrar el proceso**, no solo el resultado
4. **Participar activamente**: cuando aprendes junto a tu hijo, el vínculo se fortalece

## La herramienta más poderosa

La herramienta más poderosa para el aprendizaje de un niño no es una tableta, ni una app, ni un video educativo. Es un padre presente, dispuesto a sentarse en el piso, dibujar, jugar y descubrir junto a su hijo.

Eso es lo que intentamos facilitar con las herramientas de este proyecto: material que se imprime, se toca, se resuelve con lápiz y se comparte en familia.`,
  },
  {
    slug: 'papa-sin-manual-experiencia',
    title: 'Ser papá sin manual: mi experiencia real',
    excerpt: 'Nadie te prepara para ser padre. Comparto los errores que cometí, lo que aprendí y por qué decidí crear herramientas para otros papás.',
    tag: 'Experiencia',
    tagColor: 'bg-amber-50 text-amber-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-07',
    readingTime: 7,
    content: `## El día que todo cambió

Recuerdo perfectamente el día que me convertí en padre. La mezcla de alegría, miedo, orgullo y absoluta ignorancia sobre lo que venía. En el hospital me dieron un bebé, unas instrucciones básicas sobre alimentación y... eso fue todo. Bienvenido a la paternidad.

## Los errores que cometí

Siendo honesto, los primeros años cometí todos los errores posibles:

- **La pantalla como solución universal**: Cada vez que necesitaba un momento de paz, la tableta aparecía mágicamente. No medí las consecuencias.
- **Creer que "calidad" compensa "cantidad"**: Me decía que 30 minutos de atención plena compensaban horas de ausencia. No es así. Los niños necesitan presencia constante, no momentos perfectos.
- **Comparar con otros padres**: Las redes sociales te hacen creer que todos los demás padres lo están haciendo mejor. Spoiler: nadie sabe lo que hace.
- **Delegar la educación completamente al colegio**: Pensaba que la educación era responsabilidad del colegio. Error. El colegio instruye, pero la educación comienza en casa.

## El punto de quiebre

Un día, revisando el historial de YouTube de mi hijo, encontré horas y horas de videos de "unboxing" y contenido sin ningún valor educativo. Mi hijo de 6 años podía recitar marcas de juguetes pero no sabía los días de la semana en orden.

Esa noche no dormí. Y al día siguiente decidí que algo tenía que cambiar.

## Lo que hice diferente

### Paso 1: Reducir pantallas gradualmente
No de golpe. Cada semana reducíamos 15 minutos de pantalla y los reemplazábamos con otra actividad. En un mes, habíamos reducido el tiempo de pantalla a la mitad.

### Paso 2: Crear rutinas de aprendizaje
Establecimos un "momento de estudio" diario de 30 minutos donde hacíamos actividades juntos: sopas de letras, lecturas cortas, dibujos, problemas de matemáticas divertidos.

### Paso 3: Usar mis habilidades
Soy desarrollador. No sé de pedagogía, pero sé crear herramientas digitales. Empecé a generar material educativo personalizado para mi hijo. Guías interactivas, exámenes divertidos, lecturas adaptadas a su edad.

### Paso 4: Compartirlo con otros
Cuando otros padres del colegio vieron el material que yo creaba, empezaron a pedirme copias. Ahí nació la idea de hacer esto accesible para todos.

## Por qué "Sin Manual"

Porque literalmente no existe un manual para ser padre. Cada niño es diferente, cada familia tiene sus propias dinámicas, y lo que funciona para uno puede no funcionar para otro.

Lo único que sé con certeza es que **estar presente marca la diferencia**. No ser perfecto. No tener todas las respuestas. Solo estar ahí, intentando cada día ser un poco mejor.

## Este proyecto

Un Papá Sin Manual nació de mi frustración, mis errores y mi deseo de hacer las cosas bien. No soy experto en educación. No soy psicólogo. Soy un papá que decidió usar lo que sabe para crear algo útil.

Si este proyecto ayuda a un solo padre a pasar 30 minutos más con su hijo haciendo algo productivo en lugar de ponerle una pantalla... entonces valió la pena cada hora invertida.`,
  },
  {
    slug: 'television-vs-lectura',
    title: 'La televisión vs. la lectura: lo que los estudios dicen',
    excerpt: 'Un niño que lee 20 minutos al día está expuesto a 1.8 millones de palabras al año. Uno que solo ve TV, casi cero.',
    tag: 'Investigación',
    tagColor: 'bg-emerald-50 text-emerald-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-10',
    readingTime: 5,
    content: `## Los números no mienten

Vamos a empezar con datos concretos que deberían hacernos reflexionar:

- Un niño que lee **20 minutos al día** está expuesto a aproximadamente **1.8 millones de palabras al año**.
- Un niño que lee **5 minutos al día** se expone a unas **282,000 palabras al año**.
- Un niño que lee **1 minuto al día** apenas alcanza **8,000 palabras al año**.
- Un niño que **no lee nada** y solo consume televisión: prácticamente **cero palabras nuevas procesadas activamente**.

Estos datos, publicados originalmente por investigadores de la Universidad de Cincinnati, revelan una verdad incómoda: **la televisión no construye vocabulario**.

## ¿Por qué la TV no es igual que leer?

Puede parecer que un programa educativo "enseña" palabras. Pero hay una diferencia fundamental:

### Lectura = Proceso activo
Cuando un niño lee (o le leemos), su cerebro:
- Decodifica símbolos (letras) y los convierte en significado
- Construye imágenes mentales propias
- Mantiene la información en la memoria de trabajo
- Conecta ideas con conocimientos previos

### TV = Proceso pasivo
Cuando un niño ve televisión, su cerebro:
- Recibe imágenes ya construidas
- No necesita crear representaciones propias
- Procesa información a velocidad impuesta (no puede "releer")
- Se acostumbra a la estimulación constante sin esfuerzo

## El impacto en el rendimiento académico

Estudios longitudinales han demostrado que los niños que leen regularmente:

- Tienen un vocabulario **significativamente más amplio**
- Comprenden mejor las instrucciones escritas
- Desarrollan mayor capacidad de **pensamiento crítico**
- Obtienen mejores resultados en **todas** las materias, no solo en lengua

## ¿Cómo empezar?

Si tu hijo no tiene el hábito de lectura, no le pongas un libro de 200 páginas. Empieza así:

1. **Lecturas de 5 minutos** antes de dormir, con temas que le interesen
2. **Cuentos ilustrados** donde pueda ver y leer al mismo tiempo
3. **Trabalenguas y coplas** que son cortas, divertidas y memorables
4. **Que te vea leer**: los niños imitan lo que ven en casa

## No se trata de prohibir la TV

No estoy diciendo que la televisión sea el enemigo. Un documental bien escogido, visto en familia, puede ser valioso. El problema es cuando la TV **reemplaza** actividades de mayor valor educativo.

La clave está en el equilibrio. Y en ese equilibrio, la lectura debe ocupar un lugar prioritario.

## Un dato para motivarte

Si empiezas hoy a leer 20 minutos diarios con tu hijo, en un año habrás leído juntos el equivalente a **30 libros infantiles**. En cinco años, serán 150 libros. Imagina el vocabulario, la imaginación y el vínculo que eso construye.

Solo 20 minutos. Todos los días. Ese es el poder de la lectura.`,
  },
  {
    slug: 'actividades-reemplazan-pantalla',
    title: '5 actividades que reemplazan una hora de pantalla',
    excerpt: 'Sopas de letras, cuentos inventados, dibujos libres, experimentos caseros y juegos de mesa. Ideas prácticas que funcionan.',
    tag: 'Actividades',
    tagColor: 'bg-purple-50 text-purple-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-12',
    readingTime: 5,
    content: `## El reto: una hora sin pantalla

"Papá, estoy aburrido." Esa frase es el gatillo que nos lleva a entregar la tableta. Pero ¿y si tuvieras un plan B listo? Aquí te dejo 5 actividades probadas que funcionan en mi casa y que puedes implementar hoy.

## 1. Sopas de letras temáticas (15 minutos)

Las sopas de letras son una herramienta increíble y subestimada:
- Mejoran la **concentración** y la **atención al detalle**
- Refuerzan el **vocabulario** de cualquier materia
- Se pueden adaptar a **cualquier tema** que tu hijo esté estudiando
- Son satisfactorias: encontrar una palabra genera una pequeña dosis de logro

**Cómo hacerlo**: Usa nuestras herramientas para generar sopas de letras personalizadas, o hazlas a mano en una hoja cuadriculada. Incluye palabras del tema que tu hijo esté viendo en el colegio.

## 2. Cuentos inventados juntos (20 minutos)

Esta actividad es oro puro para el desarrollo del lenguaje:

1. Uno empieza con una frase: "Había una vez un dragón que no sabía volar..."
2. El otro continúa la historia
3. Se van turnando, agregando personajes y giros inesperados
4. Al final, el niño dibuja su escena favorita

**Beneficios**: creatividad, vocabulario, estructura narrativa, vínculo familiar.

## 3. Dibujo libre con temática (15 minutos)

No "colorear dentro de las líneas". Dibujo **libre** con una temática:

- "Dibuja cómo sería tu casa ideal"
- "Inventa un animal que no existe y ponle nombre"
- "Dibuja qué harías si fueras invisible por un día"

El dibujo libre desarrolla la motricidad fina, la expresión emocional y la creatividad sin las restricciones de una actividad dirigida.

## 4. Experimentos caseros simples (20 minutos)

Con cosas que tienes en la cocina puedes hacer ciencia:

- **Volcán de bicarbonato**: Vinagre + bicarbonato + colorante = erupción volcánica que enseña sobre reacciones químicas
- **Agua que camina**: Dos vasos con agua de colores y una servilleta de papel entre ellos. El agua "camina" por capilaridad
- **Huevo en vinagre**: Deja un huevo en vinagre 48 horas. La cáscara se disuelve y queda un huevo "de goma"

Los niños recuerdan lo que experimentan. Ningún video de YouTube puede replicar la emoción de ver un volcán casero erupcionar.

## 5. Juegos de mesa adaptados (20+ minutos)

No necesitas juegos caros. Con un dado y papel puedes crear:

- **Batalla de multiplicaciones**: Cada jugador tira dos dados y multiplica. El número más alto gana el punto.
- **Bingo de vocabulario**: En vez de números, usa palabras de vocabulario en inglés o español
- **Memory con tarjetas caseras**: Haz pares de tarjetas con palabras y sus definiciones

## La clave: tenerlo preparado

La razón por la que la pantalla siempre gana es porque está **siempre disponible**. La solución es tener las actividades alternativas igual de accesibles:

- Ten una caja con hojas, lápices de colores, dados y tijeras siempre a mano
- Imprime varias sopas de letras y guías de actividades con anticipación
- Pega una lista de "actividades sin pantalla" en la nevera

Cuando el niño diga "estoy aburrido", en lugar de la tableta, señala la lista. Los primeros días habrá resistencia. Después de una semana, empezará a elegir la actividad por sí mismo.`,
  },
  {
    slug: 'rol-padre-aprendizaje',
    title: 'Educación responsable: el rol del padre en el aprendizaje',
    excerpt: 'No se trata de hacer las tareas por ellos. Se trata de estar presente, de crear el ambiente, de hacer las preguntas correctas.',
    tag: 'Crianza',
    tagColor: 'bg-orange-50 text-orange-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-14',
    readingTime: 6,
    content: `## El padre como primer maestro

Antes de que un niño pise un aula, ya ha aprendido a caminar, hablar, reconocer emociones y resolver problemas básicos. ¿Quién le enseñó todo eso? Sus padres. Somos los primeros y más importantes maestros de nuestros hijos, nos guste o no.

## Lo que NO funciona

Empecemos por lo que muchos padres hacemos mal (yo incluido):

### Hacer las tareas por ellos
"Es que no le sale" y terminamos escribiendo la respuesta. El niño no aprende nada, y peor aún, aprende que alguien siempre resolverá sus problemas.

### Gritar cuando no entienden
"¡Pero si esto es facilísimo!" Esa frase destruye la motivación de un niño más rápido que cualquier otra cosa. Lo que es fácil para un adulto puede ser un enigma para un niño de 7 años.

### Premiar solo las calificaciones
"Si sacas 10, te compro..." Esto enseña que el aprendizaje tiene valor solo cuando hay una recompensa externa. Queremos niños que aprendan porque les gusta, no porque hay un juguete en juego.

### Comparar con otros niños
"Mira cómo tu primo sí puede." La comparación genera inseguridad, resentimiento y ansiedad. Cada niño tiene su propio ritmo.

## Lo que SÍ funciona

### 1. Crear el ambiente adecuado
Un espacio tranquilo, bien iluminado, con los materiales necesarios. Sin televisión de fondo, sin el celular al lado. El ambiente comunica: "este momento es importante".

### 2. Hacer las preguntas correctas
En vez de dar la respuesta, pregunta:
- "¿Qué crees que pasaría si...?"
- "¿Puedes explicarme cómo lo pensaste?"
- "¿Qué parte no te queda clara?"

Las preguntas activan el pensamiento. Las respuestas lo apagan.

### 3. Celebrar el esfuerzo, no solo el resultado
"Veo que te esforzaste mucho en este dibujo" es más poderoso que "¡Qué bonito dibujo!". Cuando celebramos el esfuerzo, el niño aprende que el proceso importa.

### 4. Aprender juntos
Si tu hijo tiene tarea sobre los volcanes, investiga con él. Mira fotos, haz preguntas, sorpréndete junto a él. Cuando un padre muestra curiosidad, el niño la imita.

### 5. Ser consistente, no perfecto
No necesitas dedicar 3 horas diarias. Con 20-30 minutos de atención plena y constante, el impacto es enorme. La clave es la consistencia, no la perfección.

## El padre ausente vs. el padre presente

No hablo de ausencia física necesariamente. Un padre puede estar en la misma habitación y ser completamente ausente si está mirando el celular. La presencia real implica:

- Contacto visual
- Escucha activa
- Participación genuina
- Paciencia

## Mi compromiso

Cada herramienta que creo en este proyecto tiene un objetivo: facilitar que un padre pase tiempo de calidad educativo con su hijo. No reemplazar al padre, sino darle las herramientas para que ese tiempo sea más productivo y divertido.

Porque al final del día, lo que nuestros hijos van a recordar no es la calificación que sacaron en tercero de primaria. Van a recordar que papá se sentó con ellos a resolver sopas de letras, a leer cuentos y a aprender juntos.`,
  },
  {
    slug: 'limites-pantallas-por-edad',
    title: 'Límites de pantalla recomendados por edad',
    excerpt: '¿Cuánto tiempo de pantalla es aceptable según la edad? Una guía práctica basada en recomendaciones de pediatras.',
    tag: 'Salud Digital',
    tagColor: 'bg-red-50 text-red-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-16',
    readingTime: 5,
    content: `## La pregunta del millón

"¿Cuánto tiempo de pantalla le puedo dar a mi hijo?" Es probablemente la pregunta más frecuente entre padres modernos. Y la respuesta, como casi todo en la paternidad, depende.

## Lo que recomiendan los expertos

La Organización Mundial de la Salud (OMS) y la Academia Americana de Pediatría (AAP) tienen guías claras:

### De 0 a 2 años: CERO pantallas
- El cerebro está en formación crítica
- Necesitan interacción humana directa, no mediada por pantallas
- Incluso las videollamadas con familiares deben ser breves y acompañadas por un adulto

### De 2 a 5 años: Máximo 1 hora al día
- Solo contenido de alta calidad educativa
- Siempre acompañado por un adulto que comente y pregunte
- Nunca como herramienta para calmar berrinches (crea dependencia)

### De 6 a 10 años: 1 a 2 horas al día
- Incluir todo: televisión, tableta, videojuegos, celular
- Establecer horarios fijos y respetarlos
- Priorizar contenido interactivo sobre pasivo
- Nunca pantallas durante las comidas o antes de dormir

### De 11 años en adelante: Reglas claras y flexibles
- Negociar límites juntos (les enseña autorregulación)
- Más importante que el tiempo es el **contenido**
- Mantener espacios libres de pantalla: dormitorio, comedor
- Modelar con el ejemplo (sí, eso incluye nuestro celular)

## La regla que uso en mi casa

Más allá de los límites de tiempo, en mi casa aplicamos una regla simple:

**"Por cada hora de pantalla, una hora de actividad activa"**

Si mi hijo ve 30 minutos de dibujos animados, después hacemos 30 minutos de alguna actividad: leer, dibujar, jugar afuera, resolver una sopa de letras.

## El verdadero problema no es el tiempo

Honestamente, si un niño ve 2 horas de documentales de National Geographic con sus padres comentando y preguntando, eso es infinitamente mejor que 30 minutos de YouTube Kids sin supervisión.

El problema real no es cuántas horas, sino:
- **¿Qué contenido consume?** No es lo mismo un programa educativo que videos de "unboxing"
- **¿Está solo o acompañado?** La co-visualización multiplica el valor educativo
- **¿Qué actividad está reemplazando?** Si reemplaza sueño, ejercicio o interacción social, es dañino
- **¿Es la primera opción o la última?** Si la pantalla es siempre el primer recurso, hay un problema

## Cómo implementar los límites

1. **Establece horarios, no negociaciones**: "Las pantallas se apagan a las 7pm" es más efectivo que "5 minutitos más"
2. **Usa temporizadores visibles**: Que el niño vea cuánto tiempo le queda reduce las peleas
3. **Ten alternativas listas**: Cuando se acaba el tiempo de pantalla, debe haber algo atractivo esperando
4. **Sé consistente**: Si un día permites 3 horas y al siguiente solo 1, el niño no entenderá los límites
5. **Revisa tu propio uso**: Si tú pasas 4 horas en el celular, no puedes pedirle a tu hijo que no use pantallas

## No somos perfectos

Habrá días donde los límites se rompan. Un viaje largo en carro, un día de enfermedad, un momento de agotamiento total. Está bien. Un día fuera de la rutina no arruina meses de buenos hábitos.

Lo importante es que los límites existan, que el niño los conozca, y que la mayoría del tiempo se respeten.`,
  },
  {
    slug: 'como-crear-habito-lectura',
    title: 'Cómo crear el hábito de lectura en niños',
    excerpt: 'El hábito de lectura no se impone, se cultiva. Estrategias reales para que tu hijo descubra el placer de leer.',
    tag: 'Educación',
    tagColor: 'bg-sky-50 text-sky-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-18',
    readingTime: 6,
    content: `## La verdad incómoda

Obligar a un niño a leer es la mejor forma de que odie la lectura. Si "leer" se asocia con castigo, obligación o aburrimiento, estamos creando el efecto contrario al que queremos.

El hábito de lectura se **cultiva**, no se impone.

## Por qué es tan importante

Un niño que lee regularmente:
- Tiene **3 veces más vocabulario** que un niño que no lee
- Desarrolla mayor **empatía** (al ponerse en el lugar de personajes)
- Mejora su **concentración** y memoria de trabajo
- Tiene mejores resultados en **todas** las materias escolares
- Desarrolla **pensamiento crítico** y capacidad de análisis

## Estrategias que funcionan

### 1. Que te vea leer
Los niños imitan a sus padres. Si te ven con un celular todo el día, querrán un celular. Si te ven con un libro, sentirán curiosidad por los libros. Es así de simple y así de poderoso.

### 2. Leer juntos antes de dormir
Este es el hábito más valioso que puedes crear. 10-15 minutos antes de dormir, sin negociación, sin excepciones. Al principio lees tú, luego van turnándose, y eventualmente el niño quiere leer solo.

### 3. Dejar que elija
"Tienes que leer este libro" no funciona. Llévalo a una librería o biblioteca y déjalo explorar. Si quiere un libro de dinosaurios, perfecto. Si quiere un cómic, perfecto. Lo importante es que lea, no qué lea.

### 4. Empezar por lo corto y visual
Para niños que no tienen el hábito:
- **Trabalenguas** y adivinanzas (divertidas y cortísimas)
- **Coplas y poemas** con rima (fáciles de recordar)
- **Cuentos ilustrados** donde la imagen ayuda a la comprensión
- **Fábulas** con moraleja (les encanta la "enseñanza")

### 5. Conectar la lectura con sus intereses
¿Le gustan los dinosaurios? Hay libros de dinosaurios. ¿Le gusta el fútbol? Hay libros de fútbol. ¿Le gustan los videojuegos? Hay libros sobre la historia de los videojuegos. Siempre hay un libro para cada interés.

### 6. Crear un rincón de lectura
Un espacio especial dedicado solo a leer. Puede ser un cojín grande en una esquina, una hamaca, o simplemente una silla cómoda con buena luz. El espacio físico refuerza el hábito.

### 7. No interrumpir cuando está leyendo
Si tu hijo está leyendo voluntariamente, NO lo interrumpas para que haga otra cosa. Protege ese momento. Enséñale que la lectura merece el mismo respeto que cualquier otra actividad.

## Los errores que cometí

Confieso que al principio intenté obligar a mi hijo a leer. "Tienes que leer 20 minutos antes de poder jugar." ¿Resultado? Leía mirando el reloj, sin comprender nada, solo cumpliendo la cuota.

Cuando cambié el enfoque y empecé a leer yo primero, a comentar lo que leía con entusiasmo, a dejar libros "casualmente" sobre la mesa... entonces empezó a funcionar.

## La clave: paciencia

El hábito de lectura no se forma en una semana. Pueden pasar meses antes de que un niño elija un libro voluntariamente. Pero cuando sucede, cuando lo ves absorto en una historia por decisión propia, entiendes que valió la pena cada minuto de paciencia.

## Herramientas que ayudan

En nuestro módulo de lecturas generamos textos adaptados a cada edad: cuentos, fábulas, poemas, coplas y más. Todos con vocabulario adecuado, extensión apropiada y actividades de comprensión. Son un excelente punto de partida para crear el hábito.`,
  },
  {
    slug: 'errores-comunes-padres-tecnologia',
    title: 'Errores comunes de padres con la tecnología',
    excerpt: 'De dar el celular para calmar berrinches a no poner límites: los errores más frecuentes y cómo corregirlos.',
    tag: 'Crianza',
    tagColor: 'bg-orange-50 text-orange-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-20',
    readingTime: 6,
    content: `## No juzgo, porque yo también los cometí

Antes de listar estos errores, quiero ser claro: los he cometido todos. No escribo desde una posición de superioridad, sino desde la experiencia de haber hecho las cosas mal, haber visto las consecuencias, y haber buscado alternativas.

## Error 1: Usar la pantalla para calmar berrinches

**Lo que hacemos**: El niño llora en el restaurante, en el supermercado, en el carro. Sacamos el celular y en 3 segundos hay paz.

**El problema**: Estamos enseñándole que la forma de manejar emociones negativas es escapar hacia una pantalla. Este patrón se refuerza y eventualmente el niño no sabe gestionar frustración, aburrimiento o tristeza sin un dispositivo.

**La alternativa**: Llevar siempre una bolsa con actividades: un cuaderno pequeño, lápices de colores, un libro, stickers. Sí, toma más esfuerzo. Pero el resultado a largo plazo es un niño que sabe entretenerse solo.

## Error 2: No supervisar el contenido

**Lo que hacemos**: "Está viendo YouTube Kids, es seguro." Y nos desentendemos.

**El problema**: Incluso en plataformas "para niños" el algoritmo puede llevar a contenido inapropiado, perturbador o simplemente vacío. Videos de "Elsa y Spiderman", ASMR extraño, o contenido que parece infantil pero no lo es.

**La alternativa**: Ver el contenido con ellos, al menos parte del tiempo. Usar listas de reproducción curadas en vez de autoplay. Mejor aún, reemplazar YouTube con contenido descargado y seleccionado.

## Error 3: Pantallas antes de dormir

**Lo que hacemos**: "Un episodio más y a dormir." El niño ve la pantalla hasta que se le cierran los ojos.

**El problema**: La luz azul suprime la melatonina (hormona del sueño). El contenido estimulante activa el cerebro justo cuando debería estar desacelerando. Resultado: sueño de peor calidad, más dificultad para despertar, peor rendimiento al día siguiente.

**La alternativa**: Pantallas se apagan mínimo 1 hora antes de dormir. Ese tiempo se reemplaza con lectura, conversación, o actividades tranquilas.

## Error 4: No poner límites claros

**Lo que hacemos**: "Un ratito más", "ya casi", "después de este video". El tiempo de pantalla se estira indefinidamente.

**El problema**: Sin límites claros, el niño aprende que los límites son negociables. Esto genera peleas diarias sobre cuándo apagar la pantalla.

**La alternativa**: Horarios fijos, no negociables. "Las pantallas se apagan a las 6pm" es más efectivo que contar minutos. Un temporizador visible ayuda.

## Error 5: Usar la tecnología como premio

**Lo que hacemos**: "Si te portas bien, te dejo jugar en la tableta."

**El problema**: Elevamos la tecnología a la categoría de "lo más deseado". Si la pantalla es el premio, todo lo demás (leer, jugar afuera, dibujar) se convierte automáticamente en algo menos valioso.

**La alternativa**: Premiar con experiencias: "Si terminas la tarea, jugamos juntos un juego de mesa", "Si te portas bien, vamos al parque". La pantalla debe ser una opción más, no el premio máximo.

## Error 6: No dar el ejemplo

**Lo que hacemos**: Le decimos al niño que no use tanto el celular mientras nosotros revisamos Instagram cada 5 minutos.

**El problema**: Los niños detectan la hipocresía a kilómetros. Si ven que para nosotros el celular es lo más importante, naturalmente querrán lo mismo.

**La alternativa**: Crear zonas y momentos libres de celular para TODA la familia. Durante la cena, nadie usa celular. En el parque, el celular se queda en el bolsillo. Si queremos que lean, que nos vean leer.

## El camino hacia adelante

Reconocer estos errores es el primer paso. El segundo es no flagelarnos por haberlos cometido. El tercero, y más importante, es empezar a hacer pequeños cambios, uno a la vez.

No se trata de eliminar la tecnología de sus vidas. Se trata de que la tecnología sea una herramienta, no una muleta. Y eso empieza por nosotros, los padres.`,
  },
  {
    slug: 'juegos-mesa-desarrollo-cognitivo',
    title: 'Juegos de mesa y desarrollo cognitivo: más que diversión',
    excerpt: 'Los juegos de mesa desarrollan habilidades matemáticas, sociales y de pensamiento estratégico desde edades tempranas.',
    tag: 'Actividades',
    tagColor: 'bg-purple-50 text-purple-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-22',
    readingTime: 5,
    content: `## El juguete más infravalorado

En una era de videojuegos con gráficos impresionantes y apps interactivas, los juegos de mesa parecen reliquias del pasado. Pero la ciencia dice lo contrario: son una de las herramientas más poderosas para el desarrollo cognitivo infantil.

## Lo que un juego de mesa enseña

### Pensamiento estratégico
Cada turno requiere evaluar opciones, anticipar consecuencias y tomar decisiones. Esto desarrolla la **planificación** y el **pensamiento a futuro**, habilidades que no se aprenden viendo videos.

### Habilidades matemáticas
Contar casillas, sumar dados, manejar dinero ficticio, calcular probabilidades. Los juegos de mesa son matemáticas disfrazadas de diversión.

### Tolerancia a la frustración
Perder en un juego de mesa enseña a manejar la derrota en un entorno seguro. Un niño que aprende a perder con gracia en un juego está mejor preparado para las frustraciones reales de la vida.

### Habilidades sociales
Esperar turno, respetar reglas, negociar, cooperar, comunicarse. Todo esto sucede naturalmente alrededor de un tablero.

### Concentración sostenida
Una partida puede durar 30-60 minutos de atención enfocada. Eso es un entrenamiento de concentración que ninguna app de "mindfulness" puede igualar.

## Juegos recomendados por edad

### De 3 a 5 años
- **Memorama/Memory**: Desarrolla memoria visual y concentración
- **Serpientes y escaleras**: Conteo, reconocimiento de números, turnos
- **Dominó de figuras**: Asociación, patrones, motricidad fina

### De 6 a 8 años
- **UNO**: Reconocimiento de colores y números, estrategia básica
- **Jenga**: Control motor, física intuitiva, manejo del estrés
- **Batalla naval**: Coordenadas, lógica, deducción

### De 9 a 12 años
- **Monopoly/Turista**: Matemáticas, negociación, planificación financiera
- **Scrabble**: Vocabulario, ortografía, estrategia
- **Clue/Cluedo**: Deducción lógica, eliminación, pensamiento crítico

## Juegos caseros que no cuestan nada

No necesitas comprar juegos caros. Con materiales caseros puedes crear:

### Bingo de vocabulario
Haz tarjetas con palabras de vocabulario. Uno lee la definición, los demás buscan la palabra. Perfecto para repasar antes de un examen.

### Batalla de operaciones
Cada jugador tira dos dados. Uno multiplica, otro suma. El resultado más alto gana. Se puede adaptar a cualquier operación.

### Trivia familiar
Cada miembro de la familia escribe 10 preguntas sobre cualquier tema. Se mezclan y se juega en equipos. Preparar las preguntas es tan educativo como responderlas.

## El beneficio oculto: tiempo en familia

Más allá de todos los beneficios cognitivos, hay algo que los juegos de mesa logran y que ninguna tecnología puede replicar: **poner a toda la familia alrededor de una mesa, mirándose a los ojos, riendo juntos**.

En mi casa, los domingos por la tarde son sagrados: es el momento del juego de mesa familiar. No hay celulares, no hay televisión. Solo nosotros, un tablero, y mucha risa.

## Empieza hoy

Si no tienes juegos de mesa en casa, empieza con un mazo de cartas. Con él puedes jugar decenas de juegos diferentes. O imprime un tablero simple, consigue un dado y fichas improvisadas.

Lo importante no es el juego en sí, sino lo que sucede alrededor de él: conversación, aprendizaje, conexión. Eso es irremplazable.`,
  },
  {
    slug: 'importancia-escritura-mano',
    title: 'Por qué escribir a mano sigue siendo importante en la era digital',
    excerpt: 'Escribir a mano activa áreas del cerebro que el teclado no alcanza. La ciencia explica por qué no debemos abandonar el lápiz.',
    tag: 'Educación',
    tagColor: 'bg-sky-50 text-sky-600',
    author: 'Un Papá Sin Manual',
    date: '2026-03-24',
    readingTime: 5,
    content: `## El lápiz vs. el teclado

En muchas escuelas del mundo se está debatiendo si la escritura a mano sigue siendo relevante. Algunos argumentan que en la era digital, lo importante es saber teclear. Pero la neurociencia tiene algo que decir al respecto, y es contundente.

## Lo que dice la ciencia

Investigadores de la Universidad de Indiana descubrieron que cuando los niños escriben letras a mano, se activan tres áreas del cerebro simultáneamente:

1. **Área motora**: Controla el movimiento fino de la mano
2. **Área visual**: Procesa la forma de las letras
3. **Área de lectura**: Asocia los trazos con significado

Cuando un niño escribe en un teclado, **solo se activa el área motora**. Las otras dos permanecen prácticamente inactivas.

## ¿Qué significa esto en la práctica?

### Mejor retención de información
Tomar notas a mano obliga al cerebro a procesar y sintetizar la información en tiempo real. No puedes copiar palabra por palabra (es muy lento), así que tu cerebro selecciona lo importante. Estudios demuestran que estudiantes que toman notas a mano recuerdan un 30% más que los que usan laptop.

### Mejor comprensión lectora
Existe una conexión directa entre la escritura manual y la capacidad de lectura. Los niños que practican escritura a mano reconocen letras más rápido y cometen menos errores de lectura.

### Desarrollo de la motricidad fina
Los músculos pequeños de la mano y los dedos necesitan ejercitarse. La escritura a mano es el gimnasio de la motricidad fina, esencial no solo para escribir sino para cualquier actividad que requiera precisión manual.

### Mayor creatividad
Hay algo en el acto físico de escribir que conecta con la creatividad de una forma que el teclado no logra. Muchos escritores profesionales siguen haciendo sus borradores a mano precisamente por esto.

## El problema actual

Cada vez más niños llegan a primaria sin saber sostener correctamente un lápiz. Las tabletas y celulares han reemplazado el dibujo, el coloreado y la escritura libre que antes eran actividades cotidianas.

El resultado:
- Letra ilegible
- Fatiga rápida al escribir
- Frustración con las tareas escritas
- Menor rendimiento académico general

## Cómo ejercitar la escritura a mano

### Para niños pequeños (3-5 años)
- Dibujo libre todos los días
- Trazar líneas, círculos, zigzags
- Colorear (fortalece los músculos de la mano)
- Jugar con plastilina (motricidad fina)

### Para niños en primaria (6-10 años)
- **Dictados cortos** de 5-10 minutos
- **Copiar poemas o trabalenguas** que les gusten
- **Escribir cartas** a familiares o amigos
- **Llevar un diario** simple (3-4 oraciones sobre su día)
- **Resolver sopas de letras** y crucigramas a mano

### Para preadolescentes (11-13 años)
- Tomar notas de lo que leen o ven
- Escribir historias cortas
- Hacer resúmenes de temas escolares a mano
- Crear mapas mentales en papel

## No es uno u otro

No estoy sugiriendo que los niños no aprendan a usar teclados y dispositivos digitales. Por supuesto que deben hacerlo. Pero la escritura a mano y la escritura digital no son intercambiables. Cada una activa diferentes procesos cerebrales y desarrolla diferentes habilidades.

La solución es el equilibrio: que sepan teclear, pero que también escriban a mano todos los días. Que usen tabletas para algunas cosas, pero que sigan teniendo un cuaderno y un lápiz como herramientas cotidianas.

## Por eso creamos ejercicios para imprimir

Una de las premisas fundamentales de este proyecto es que el material se imprime y se completa a mano. No es un capricho nostálgico. Es una decisión basada en lo que la ciencia nos dice sobre cómo aprende el cerebro infantil.

Cada sopa de letras, cada ejercicio de escritura, cada guía de estudio está diseñada para que el niño tome un lápiz y trabaje con sus manos. Eso es aprendizaje real.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, tag: string, limit = 3): BlogPost[] {
  return BLOG_POSTS
    .filter(p => p.slug !== currentSlug)
    .sort((a, b) => (a.tag === tag ? -1 : 1) - (b.tag === tag ? -1 : 1))
    .slice(0, limit);
}
