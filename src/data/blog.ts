export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  color: string;
  coverImage: string;
  imagePosition?: string;
  readTime: string;
  date: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '3',
    slug: 'papa-sin-manual-experiencia',
    title: 'Solo un papá real: mi experiencia como padre',
    excerpt: 'Nadie te prepara para ser padre. Comparto los errores que cometí, lo que aprendí y por qué decidí crear herramientas para otros papás.',
    tag: 'Experiencia',
    color: 'bg-amber-50 text-amber-600',
    coverImage: '/images/blog/un papa sin manual.jpeg',
    imagePosition: 'bottom',
    readTime: '6 min',
    date: '24 de Marzo, 2026',
    author: 'Michael Angel',
    content: `
Cuando sostuve a mi hijo por primera vez, sentí un terror profundo mezclado con el amor más intenso que hubiera experimentado. Miré la habitación de hospital esperando que alguien me entregara el aclamado manual de instrucciones para no cagarla, pero nadie lo hizo.

El título de este proyecto, *"Solo un Papá REAL"*, nace de esa cruda y humilde verdad: todos estamos improvisando. Al principio, recurrí a la salida fácil que toma buena parte de nuestra generación. Encendía la televisión para poder tener 20 minutos de paz y responder correos del trabajo. Funcionaba a corto plazo, pero notaba que los berrinches aumentaban tras apagar la pantalla.

### El cambio de rumbo
Una tarde decidí desenchufar el televisor e imprimir hojas de trabajo básicas. Puse sobre la mesa una montaña de crayones. El primer día fue una batalla, pero al tercer día, él llegaba de la escuela pidiendo sus "tareas especiales".

La necesidad de tener acceso a material educativo inagotable y personalizado para sus temas del colegio me llevó a escribir el código de esta aplicación. Comencé a crear sopas de letras, crucigramas y lecturas usando inteligencia artificial, simplemente porque quería herramientas gratuitas para él.

Hoy lo comparto con el mundo. Si sirve de algo, mi principal lección tras estos años ha sido que un niño no necesita un manual perfecto para ser educado; solo necesita saber que su padre está presente, intentándolo todos los días.
    `.trim()
  },
  {
    id: '7',
    slug: 'pantallas-antes-de-dormir',
    title: 'Pantallas antes de dormir: el enemigo silencioso del sueño infantil',
    excerpt: 'La luz azul de las pantallas altera la producción de melatonina en los niños. Descubre qué dicen los pediatras y cómo crear una rutina nocturna saludable.',
    tag: 'Salud Digital',
    color: 'bg-red-50 text-red-600',
    coverImage: '/images/blog/post_7.png',
    readTime: '5 min',
    date: '25 de Marzo, 2026',
    author: 'Solo un Papá REAL',
    content: `
Son las 9 de la noche. Tu hijo está en la cama, pero no durmiendo: está viendo videos con la tablet apoyada en la almohada. Piensas que al menos está tranquilo y que pronto caerá rendido. La realidad es que ese brillo azulado que ilumina su cara está saboteando activamente su capacidad para conciliar el sueño.

### Lo que la luz azul le hace al cerebro infantil
La luz emitida por pantallas LED —teléfonos, tablets, televisores— tiene una longitud de onda corta (luz azul) que el cerebro interpreta como luz solar. Cuando un niño se expone a esta luz en las horas previas a dormir, su glándula pineal reduce drásticamente la producción de **melatonina**, la hormona responsable de regular el ciclo sueño-vigilia.

Estudios publicados por la Academia Americana de Pediatría han demostrado que los niños que usan dispositivos electrónicos en la última hora antes de acostarse tardan en promedio **30 minutos más** en quedarse dormidos y experimentan una reducción significativa en la fase de sueño profundo (REM), que es precisamente donde ocurre la consolidación de la memoria y el aprendizaje.

### Las consecuencias al día siguiente
Un niño que duerme mal no solo está cansado. Los efectos se manifiestan como:
- **Dificultad para concentrarse** en clase
- **Irritabilidad y berrinches** aparentemente sin causa
- **Menor rendimiento académico** sostenido
- **Debilitamiento del sistema inmunológico**

Es un ciclo vicioso: el niño duerme mal, rinde poco, se frustra, y el padre le da la tablet para "calmarlo", perpetuando el problema.

### Creando una rutina nocturna sin pantallas
La solución no es complicada, pero requiere consistencia:
1. **Apagar todas las pantallas 60 minutos antes de dormir.** Sin excepciones. Este es el pilar fundamental.
2. **Sustituir con actividades de baja estimulación:** Leer un cuento juntos, dibujar libremente, armar un rompecabezas sencillo o simplemente conversar sobre el día.
3. **Establecer un ritual fijo:** Baño, pijama, cuento, canción, dormir. La repetición le dice al cerebro que es hora de apagarse.
4. **Predicar con el ejemplo:** Si tu hijo te ve revisando el celular en la cama, ninguna regla será creíble. Deja el teléfono fuera de la habitación.

El sueño es el cimiento invisible sobre el cual se construye todo lo demás: atención, memoria, crecimiento físico, regulación emocional. Protegerlo es una de las decisiones más importantes que puedes tomar como padre.
    `.trim()
  },
  {
    id: '8',
    slug: 'manualidades-desarrollo-infantil',
    title: 'El poder de las manualidades en el desarrollo infantil',
    excerpt: 'Recortar, pegar, moldear y pintar no es solo diversión: es entrenamiento neurológico disfrazado de juego. Descubre por qué las manualidades importan.',
    tag: 'Educación',
    color: 'bg-sky-50 text-sky-600',
    coverImage: '/images/blog/post_8.png',
    readTime: '5 min',
    date: '25 de Marzo, 2026',
    author: 'Solo un Papá REAL',
    content: `
Vivimos en una era donde la mayoría de las experiencias infantiles se han digitalizado. Los niños dibujan en iPads, construyen mundos en Minecraft y "crean" tocando una pantalla de cristal. Sin embargo, el acto físico de manipular materiales con las manos sigue siendo insustituible para el desarrollo integral del cerebro.

### Motricidad fina: las manos que aprenden
Cuando un niño recorta con tijeras, no solo está haciendo una manualidad. Está coordinando simultáneamente más de 30 músculos entre la mano y el antebrazo. Esta es la misma base motriz que necesitará para escribir con fluidez, atarse los zapatos, tocar un instrumento musical o incluso teclear en un computador.

La diferencia entre un niño que ha pasado cientos de horas manipulando plastilina, lápices y pegamento, y uno que ha pasado el mismo tiempo deslizando un dedo sobre vidrio, es **medible en las evaluaciones de grafomotricidad**. Los terapeutas ocupacionales reportan un aumento sostenido de niños con dificultades de escritura directamente relacionadas con la falta de actividades manuales en la primera infancia.

### Creatividad y resolución de problemas
Las manualidades presentan problemas reales en tiempo real. ¿Cómo hago que esta torre de cartón no se caiga? ¿Cómo mezclo estos colores para obtener el tono que imagino? ¿Cómo recorto esta forma curva sin romper el papel?

Cada uno de estos micro-desafíos entrena el pensamiento divergente: la capacidad de encontrar múltiples soluciones a un mismo problema. Esta habilidad es exactamente lo que las empresas más innovadoras del mundo buscan en sus empleados adultos.

### Regulación emocional y paciencia
Pocas actividades enseñan la tolerancia a la frustración como intentar pintar dentro de las líneas o esperar que el pegamento seque. Un niño que regularmente realiza manualidades desarrolla una relación más sana con el error: aprende que equivocarse no es el final, sino parte del proceso creativo.

### 5 manualidades para empezar hoy
1. **Collage de revistas:** Recortar imágenes de revistas viejas y crear una historia visual pegándolas sobre cartulina.
2. **Animales de plastilina:** Modelar los animales que están estudiando en ciencias naturales.
3. **Marionetas de calcetín:** Crear personajes con calcetines viejos, botones y lana para representar un cuento.
4. **Mapa del tesoro:** Dibujar un mapa de la casa con pistas escritas que lleven a una sorpresa.
5. **Diario ilustrado:** Cada noche, dibujar y escribir una oración sobre lo mejor del día.

No necesitas ser artista ni comprar materiales costosos. Una hoja de papel, unos crayones y un poco de imaginación son el kit completo para construir un cerebro más fuerte.
    `.trim()
  },
  {
    id: '9',
    slug: 'rutina-estudio-sin-gritos',
    title: 'Cómo crear una rutina de estudio sin gritos ni castigos',
    excerpt: 'La disciplina positiva funciona mejor que el miedo. Aprende a construir hábitos de estudio basados en la motivación interna, no en la amenaza.',
    tag: 'Crianza',
    color: 'bg-orange-50 text-orange-600',
    coverImage: '/images/blog/post_9.png',
    readTime: '6 min',
    date: '25 de Marzo, 2026',
    author: 'Michael Angel',
    content: `
"¡Siéntate a estudiar!" — lo has dicho cien veces. A veces funciona. La mayoría de las veces, termina en una batalla donde ambos pierden. El niño asocia el estudio con tensión, y tú terminas sintiéndote culpable por haber gritado. Hay una forma diferente de hacer las cosas, y la ciencia la respalda.

### Por qué los gritos no funcionan
Cuando un padre grita, el cerebro del niño activa su respuesta de **lucha o huida**. La amígdala se enciende, el cortisol inunda el torrente sanguíneo y las funciones cognitivas superiores —atención, memoria de trabajo, razonamiento— se apagan literalmente. Es biológicamente imposible aprender en estado de estrés agudo.

Además, el grito enseña algo no intencionado: que el estudio es un castigo, una obligación dolorosa. Esta asociación negativa puede perseguir al niño durante toda su vida académica.

### Los 4 pilares de una rutina positiva

#### 1. Predecibilidad: el mismo momento, el mismo lugar
Los niños prosperan con estructura. Elige un horario fijo para estudiar (por ejemplo, después de la merienda) y un espacio específico. No tiene que ser un escritorio elegante; puede ser la mesa de la cocina, siempre que esté despejada y libre de distracciones. La repetición convierte la actividad en hábito, y el hábito elimina la necesidad de negociar.

#### 2. Autonomía controlada: déjalo elegir
"¿Quieres empezar por matemáticas o por lectura?" Esta simple pregunta transforma la dinámica. Cuando el niño siente que tiene poder de decisión, la resistencia se reduce drásticamente. No le estás preguntando *si* va a estudiar, sino *cómo*. Es una ilusión de control que genera motivación real.

#### 3. Fragmentación: bloques cortos con pausas
Un niño de 6-8 años puede mantener la concentración entre 10 y 20 minutos. Pedirle que estudie una hora seguida es pedirle lo biológicamente imposible. Usa la técnica de bloques:
- **15 minutos de estudio enfocado**
- **5 minutos de pausa activa** (saltar, estirarse, bailar)
- **Repetir 2-3 ciclos**

El total es el mismo, pero la experiencia es radicalmente distinta.

#### 4. Reconocimiento del esfuerzo, no del resultado
"Trabajaste muy duro en esto" es infinitamente más poderoso que "Sacaste 10, qué bien". Cuando premias el esfuerzo, el niño aprende que el proceso importa. Cuando solo premias la calificación, aprende que solo importa el resultado, y el miedo al fracaso se vuelve paralizante.

### Qué hacer cuando la resistencia aparece
Habrá días malos. Días donde nada funciona y la frustración es mutua. En esos momentos:
- **Baja la voz en lugar de subirla.** Hablar en un tono más bajo obliga al niño a prestar atención para escucharte.
- **Valida la emoción:** "Entiendo que estás cansado. Yo también me canso de cosas difíciles. ¿Hacemos solo 5 minutos y vemos cómo nos sentimos?"
- **Permite el descanso genuino.** A veces, el mejor plan de estudio es no estudiar hoy e ir a jugar al parque. Mañana habrá más energía.

### Herramientas que ayudan
Las hojas de trabajo generadas con inteligencia artificial pueden ser un gran aliado. Cuando el material está personalizado con los temas que al niño le interesan —dinosaurios, superhéroes, animales marinos— la motivación viene incluida. No es lo mismo resolver una suma genérica que descubrir cuántos meteoritos necesita el T-Rex para llegar a Marte.

La meta final no es que tu hijo saque 10 en todo. La meta es que cuando sea adulto, asocie el aprendizaje con curiosidad y no con miedo. Eso se construye hoy, en cada sesión de estudio que transcurre sin gritos.
    `.trim()
  },
  {
    id: '1',
    slug: 'alejar-ninos-youtube',
    title: '¿Por qué alejar a los niños de YouTube es una de las mejores decisiones?',
    excerpt: 'Las pantallas no son niñeras. Descubre cómo el consumo excesivo de contenido digital afecta el desarrollo de nuestros hijos.',
    tag: 'Salud Digital',
    color: 'bg-red-50 text-red-600',
    coverImage: '/images/blog/post_1.png',
    readTime: '4 min',
    date: '24 de Marzo, 2026',
    author: 'Solo un Papá REAL',
    content: `
La llegada de las pantallas a los hogares modernos ha solucionado un problema a corto plazo para muchos padres: mantener a los niños entretenidos. Sin embargo, el costo a largo plazo que estamos pagando es innegable. 

Cuando dejamos que el algoritmo de una plataforma decida qué información debe consumir el frágil y maleable cerebro de un niño en desarrollo, estamos entregando su atención a un sistema diseñado exclusivamente para generar retención y clics, no aprendizaje ni bienestar. Los expertos coinciden en que la exposición sostenida a estímulos visuales hiper-rápidos reduce drásticamente el "span" de atención natural del niño.

### El mito del "contenido educativo"
Muchas de las aplicaciones y canales que se venden bajo la etiqueta "Kids" están saturados de luces intermitentes, sonidos marginados y un ritmo frenético. Este tipo de formato aumenta los niveles de dopamina pero paraliza la creatividad. Un niño necesita aburrirse para poder inventar; necesita el silencio para poder crear. 

### Recuperando la conexión
Alejar a tu hijo de estas plataformas no significa que debas estar jugando con él 24/7. Significa reemplazar un iPad por herramientas físicas (lápices, hojas para colorear, rompecabezas de madera). Como padre, el mayor regalo que le puedes dar hoy a tus hijos es la capacidad de enfocarse en el mundo real. Promueve un entorno donde la recompensa provenga de *construir* y de *pensar*, en lugar de *deslizar* la pantalla hacia abajo.
    `.trim()
  },
  {
    id: '2',
    slug: 'aprendizaje-activo',
    title: 'Aprender jugando: la ciencia detrás del aprendizaje activo',
    excerpt: 'Los niños no aprenden sentados escuchando. Aprenden haciendo, tocando, creando. Convierte cualquier tema escolar en una actividad divertida.',
    tag: 'Educación',
    color: 'bg-sky-50 text-sky-600',
    coverImage: '/images/blog/post_2.png',
    readTime: '5 min',
    date: '24 de Marzo, 2026',
    author: 'Solo un Papá REAL',
    content: `
La pedagogía tradicional insiste a menudo en mantener a los niños sentados, escuchando silenciosamente y memorizando información de un libro de texto. Sin embargo, la ciencia cognitiva moderna nos enseña que el cerebro humano —especialmente en sus primeras etapas de desarrollo— absorbe información infinitamente mejor a través del *aprendizaje activo*.

### ¿Qué es el aprendizaje activo?
El aprendizaje activo ocurre cuando los niños no son simples receptores de información, sino que se involucran directamente en el proceso de conocimiento. Esto se logra mediante ensayo y error, construyendo cosas, dibujando, jugando y cometiendo errores. 

Cuando un niño aprende matemáticas sumando bloques de madera, su cerebro crea conexiones neuronales espaciales, táctiles y visuales de manera simultánea. La retención de esta información será monumentalmente superior a la generada por haber copiado una suma de un pizarrón.

### ¿Cómo aplicarlo en casa?
No necesitas ser maestro para promover la educación activa:
1. **Convierte los repasos en juegos:** En lugar de preguntarle las capitales, jueguen a un mapa donde tengan que situar físicamente piezas.
2. **Utiliza herramientas adaptadas:** Usa "Solo un Papá REAL" para imprimir sopas de letras del vocabulario de ciencias o guías interactivas y retarlo a terminarlas en un tiempo específico.
3. **El aprendizaje es desordenado:** Acepta que aprender jugando involucra ruido temporal, risas y desorden sobre la mesa. Ese desorden es la prueba óptica de que un cerebro está siendo estimulado.
    `.trim()
  },
  {
    id: '4',
    slug: 'televisión-vs-lectura-estudios',
    title: 'La televisión vs. la lectura: lo que los estudios dicen',
    excerpt: 'Un niño que lee 20 minutos al día está expuesto a 1.8 millones de palabras al año. Uno que solo ve TV, casi cero.',
    tag: 'Investigación',
    color: 'bg-emerald-50 text-emerald-600',
    coverImage: '/images/blog/post_4.png',
    readTime: '4 min',
    date: '24 de Marzo, 2026',
    author: 'Solo un Papá REAL',
    content: `
A menudo caemos en el falso equilibrio de pensar que ver televisión educativa es un sustituto válido de un libro. La neurociencia ha probado ampliamente que los beneficios cognitivos de la lectura en papel no son replicables por el contenido audiovisual.

### El impacto de los 20 Minutos
Investigadores educativos de todo el mundo apoyan la "Regla de los 20 minutos". Los niños que dedican este tiempo diario a leer están expuestos a un promedio de **1.8 millones de palabras** al año. Se ha comprobado que superan al 90% de sus compañeros en las pruebas estandarizadas nacionales. 

Por el contrario, la televisión requiere un esfuerzo cognitivo casi nulo. Las imágenes ya están dadas, las voces y la entonación están hechas; la imaginación del niño se encuentra en estado inactivo.

### Construyendo el hábito de la lectura
Sabemos que no basta con empujar a los chicos a leer un texto aburrido. El secreto radica en proveer historias adaptadas a sus verdaderos intereses. 

Ese es el poder del generador de *Lecturas a Medida*. Si a tu hijo le encantan los dinosaurios astronautas, la IA generará en diez segundos una fábula ilustrada sobre un T-Rex que viaja a Marte, pero con un vocabulario ajustado perfectamente para un niño de 8 años, incitando su curiosidad y estimulando esos 1.8 millones de palabras en el largo plazo.
    `.trim()
  },
  {
    id: '5',
    slug: 'actividades-reemplazan-pantalla',
    title: '5 actividades que reemplazan una hora de pantalla',
    excerpt: 'Sopas de letras, cuentos inventados, dibujos libres, experimentos caseros y juegos de mesa. Ideas prácticas que funcionan.',
    tag: 'Actividades',
    color: 'bg-purple-50 text-purple-600',
    coverImage: '/images/blog/post_5.png',
    readTime: '5 min',
    date: '24 de Marzo, 2026',
    author: 'Solo un Papá REAL',
    content: `
El síndrome de abstinencia digital es un reto real cuando los padres deciden retirar las pantallas. La clave del éxito no está en prohibir, sino en ofrecer alternativas más táctiles y placenteras. Aquí propongo 5 actividades prácticas que rescatan el enfoque de los más pequeños:

### 1. Laboratorio de arte sin restricciones
Cubre toda la mesa del comedor con papel de empaque reciclado y proporciónales acuarelas, crayones y tijeras. La instrucción es sencilla: "dibuja una ciudad entera". Este ejercicio de baja presión pero alta creatividad absorbe su atención de inmediato.

### 2. Sopas de letras y laberintos físicos
Puede sonar clásico, pero resolver rompecabezas impresos activa la retención semántica. Entregarles una sopa de letras con los temas que les gustan —por ejemplo, personajes de películas o conceptos del colegio— les da una recompensa inmediata al completarla.

### 3. Lectura de campamento (Indoor)
Transformar la lectura en un evento especial es muy fácil: apaguen las luces del cuarto, armen una tienda de campaña rápida con cobijas sobre dos sillas, y usen una linterna para leer un cuento ilustrado. 

### 4. Puzles cooperativos de mesa
Armar un rompecabezas analógico o jugar un juego de mesa clásico con un familiar fortalece los vínculos comunicativos. No solo mejoran habilidades espaciales, sino que el elemento social vence instantáneamente el factor hipnótico y aislante del iPad.

### 5. Escritura compartida y locura ortográfica
Genera una hoja con inicios de cuentos intrigantes y toma turnos para escribir (o dictar) la siguiente oración de la historia hasta completarla de manera absurdamente creativa.
    `.trim()
  },
  {
    id: '6',
    slug: 'educacion-rol-del-padre',
    title: 'Educación responsable: el rol del padre en el aprendizaje',
    excerpt: 'No se trata de hacer las tareas por ellos. Se trata de estar presente, de crear el ambiente, de hacer las preguntas correctas.',
    tag: 'Crianza',
    color: 'bg-orange-50 text-orange-600',
    coverImage: '/images/blog/post_6.png',
    readTime: '6 min',
    date: '24 de Marzo, 2026',
    author: 'Solo un Papá REAL',
    content: `
Un error común entre los padres modernos es creer que la educación de sus hijos ocurre de modo exclusivo dentro de un salón de clases entre las 8:00 AM y las 3:00 PM. Lo cierto es que el hogar es, indudablemente, el principal catalizador de cualquier éxito intelectual y emocional. 

### "Ser presente" sobre "saberlo todo"
Uno de los mayores temores al repasar conceptos con nuestros hijos es el famoso *"papá, es que no recuerdo cómo se despeja una X"*. Pensamos que al no dominar el tema los estamos fallando. 

Sin embargo, tu rol como tutor en el hogar no es el de un experto absoluto, sino el de **facilitador de aprendizaje**. Si no conoces la respuesta, el mayor ejemplo que puedes dar es sentarte con ellos y decir: *"No lo sé, averigüémoslo juntos"*. 

### Creando el ambiente ideal
Los estudiantes más resilientes suelen tener estos tres pilares en su entorno doméstico:
1. **Un espacio de estudio no perturbado:** Una pequeña mesa designada, bien iluminada y libre de televisión.
2. **Exposición constante a preguntas socráticas:** No les des las respuestas de inmediato. Pregúntales qué harían ellos para averiguarlo.
3. **El privilegio de cometer errores:** Asegurarte que tu hijo entienda que sacar una mala calificación en el examen práctico (generado en segundos en esta web) de casa, es simplemente una oportunidad para saber qué repasar al día siguiente. No hay castigos, solo crecimiento.

Ese es el nivel de involucramiento requerido en la educación responsable, y la promesa básica debajo de todas las herramientas gratuitas que he decidido compartir con la comunidad de padres de hoy.
    `.trim()
  }
];
