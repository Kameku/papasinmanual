export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  color: string;
  coverImage: string;
  readTime: string;
  date: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'alejar-ninos-youtube',
    title: '¿Por qué alejar a los niños de YouTube es una de las mejores decisiones?',
    excerpt: 'Las pantallas no son niñeras. Descubre cómo el consumo excesivo de contenido digital afecta el desarrollo de nuestros hijos.',
    tag: 'Salud Digital',
    color: 'bg-red-50 text-red-600',
    coverImage: '/images/blog/post_1.png',
    readTime: '4 min',
    date: '15 de Mayo, 2026',
    content: `
La llegada de las pantallas a los hogares modernos ha solucionado un problema a corto plazo para muchos padres: mantener a los niños entretenidos. Sin embargo, el costo a largo plazo que estamos pagando es innegable. 

Cuando dejamos que el algoritmo de una plataforma decida qué información debe consumir el frágil y maleable cerebro de un niño en desarrollo, estamos entregando su atención a un sistema diseñado exclusivamente para generar retención y clics, no aprendizaje ni bienestar. Los expertos coinciden en que la exposición sostenida a estímulos visuales hiper-rápidos reduce drásticamente el "span" de atención natural del niño.

### El mito del "contenido educativo"
Muchas de las aplicaciones y canales que se venden bajo la etiqueta "Kids" están saturados de luces intermitentes, sonidos agudos y un ritmo frenético. Este tipo de formato aumenta los niveles de dopamina pero paraliza la creatividad. Un niño necesita aburrirse para poder inventar; necesita el silencio para poder crear. 

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
    date: '22 de Mayo, 2026',
    content: `
La pedagogía tradicional insiste a menudo en mantener a los niños sentados, escuchando silenciosamente y memorizando información de un libro de texto. Sin embargo, la ciencia cognitiva moderna nos enseña que el cerebro humano —especialmente en sus primeras etapas de desarrollo— absorbe información infinitamente mejor a través del *aprendizaje activo*.

### ¿Qué es el aprendizaje activo?
El aprendizaje activo ocurre cuando los niños no son simples receptores de información, sino que se involucran directamente en el proceso de conocimiento. Esto se logra mediante ensayo y error, construyendo cosas, dibujando, jugando y cometiendo errores. 

Cuando un niño aprende matemáticas sumando bloques de madera, su cerebro crea conexiones neuronales espaciales, táctiles y visuales de manera simultánea. La retención de esta información será monumentalmente superior a la generada por haber copiado una suma de un pizarrón.

### ¿Cómo aplicarlo en casa?
No necesitas ser maestro para promover la educación activa:
1. **Convierte los repasos en juegos:** En lugar de preguntarle las capitales, jueguen a un mapa donde tengan que situar físicamente piezas.
2. **Utiliza herramientas adaptadas:** Usa "Un Papá Sin Manual" para imprimir sopas de letras del vocabulario de ciencias o guías interactivas y retarlo a terminarlas en un tiempo específico.
3. **El aprendizaje es desordenado:** Acepta que aprender jugando involucra ruido temporal, risas y desorden sobre la mesa. Ese desorden es la prueba óptica de que un cerebro está siendo estimulado.
    `.trim()
  },
  {
    id: '3',
    slug: 'papa-sin-manual-experiencia',
    title: 'Ser papá sin manual: mi experiencia real',
    excerpt: 'Nadie te prepara para ser padre. Comparto los errores que cometí, lo que aprendí y por qué decidí crear herramientas para otros papás.',
    tag: 'Experiencia',
    color: 'bg-amber-50 text-amber-600',
    coverImage: '/images/blog/post_3.png',
    readTime: '6 min',
    date: '3 de Junio, 2026',
    content: `
Cuando sostuve a mi hija por primera vez, sentí un terror profundo mezclado con el amor más intenso que hubiera experimentado. Miré la habitación de hospital esperando que alguien me entregara el aclamado manual de instrucciones para no echarlo a perder, pero nadie lo hizo. 

El título de este proyecto, *"Un Papá Sin Manual"*, nace de esa cruda y humilde verdad: todos estamos improvisando. Al principio, recurrí a la salida fácil que toma buena parte de nuestra generación. Encendía la televisión para poder tener 20 minutos de paz y responder correos del trabajo. Funcionaba a corto plazo, pero notaba que los berrinches aumentaban tras apagar la pantalla. 

### El cambio de rumbo
Una tarde decidí desenchufar el televisor e imprimir hojas de trabajo básicas. Puse sobre la mesa una montaña de crayones. El primer día fue una batalla, pero al tercer día, ella llegaba de la escuela pidiendo sus "tareas especiales". 

La necesidad de tener acceso a material educativo inagotable y personalizado para sus temas del colegio me llevó a escribir el código de esta aplicación. Comencé a crear sopas de letras, crucigramas y lecturas usando inteligencia artificial, simplemente porque quería herramientas gratuitas para ella.

Hoy lo comparto con el mundo. Si sirve de algo, mi principal lección tras estos años ha sido que un niño no necesita un manual perfecto para ser educado; solo necesita saber que su padre está presente, intentándolo todos los días.
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
    date: '10 de Junio, 2026',
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
    date: '18 de Junio, 2026',
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
    date: '25 de Junio, 2026',
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
