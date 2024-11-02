# Microservicio de Cálculo en NestJS

Este proyecto implementa una aplicación de microservicios en NestJS para realizar cálculos matemáticos en función de un número entero proporcionado como entrada. Utiliza RabbitMQ como intermediario de mensajería y sigue los principios de arquitectura hexagonal y limpia, además de aplicar principios SOLID y KISS.

---

## Decisiones de Arquitectura

### 1. **Arquitectura Hexagonal y Modular**
   - La aplicación está dividida en dos servicios principales: `Gateway` y `Calculator`.
   - **Gateway** se encarga de recibir las solicitudes HTTP, validar el input y publicar mensajes a través de RabbitMQ.
   - **Calculator** realiza los cálculos específicos (paridad, primalidad, factorial, suma, factores y Fibonacci).
   - Ambos servicios están diseñados como módulos independientes en el monorepo, lo que facilita la mantenibilidad y escalabilidad.

### 2. **Microservicios y RabbitMQ**
   - RabbitMQ se utiliza para manejar la comunicación entre los servicios de forma asincrónica, lo que permite distribuir las responsabilidades entre servicios independientes.
   - Cada tipo de cálculo está configurado como un port en el módulo `Calculator`, siguiendo el patrón de diseño de puertos y adaptadores.
   - Aunque el diseño está preparado para asincronía, en este caso el `Gateway` escucha la respuesta de `Calculator` de manera inmediata para devolver una respuesta completa al cliente.

### 3. **Principios SOLID y Clean Architecture**
   - **Single Responsibility Principle (SRP)**: Los servicios `Gateway` y `Calculator` están claramente separados, cada uno con responsabilidades distintas (manejo de solicitudes y cálculos, respectivamente).
   - **Dependency Inversion Principle (DIP)**: Los casos de uso se inyectan en el `CalculatorService` mediante interfaces o "ports", lo que permite sustituir implementaciones sin cambiar el código principal.
   - **Casos de uso**: Cada operación matemática se define en un caso de uso independiente. Esto permite un desarrollo modular y testable, y garantiza una alta cohesión dentro de cada caso de uso.
   
### 4. **Inyección de Dependencias y Configuración Global**
   - Se utiliza `@nestjs/config` para manejar variables de entorno en distintos entornos (desarrollo, producción, test).
   - La configuración global se define en archivos `.env` y `tsconfig.global.json` para centralizar opciones comunes de TypeScript.


---

## Instrucciones de Ejecución

### Prerrequisitos

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (opcional si usas Docker para todo)

### Paso a Paso

1. **Clonar el Repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Configurar Variables de Entorno**

   - Crea archivos `.env.development` y `.env.production` en la raíz del proyecto si no existen.
   - Configura las variables necesarias (por ejemplo, `RABBITMQ_URL`).

3. **Levantar RabbitMQ con Docker Compose**

   Si tienes Docker Compose instalado, puedes levantar RabbitMQ con el siguiente comando:

   ```bash
   docker-compose up -d
   ```

   Este comando usará el archivo `docker-compose.yml` en la raíz del proyecto para crear un contenedor de RabbitMQ.

4. **Construir e Iniciar los Servicios**

   Usando Docker Compose, puedes levantar toda la aplicación en contenedores:

   ```bash
   docker-compose -f docker-compose.yml up --build
   ```

   Esto construirá las imágenes Docker para `gateway` y `calculator`, y las ejecutará junto con RabbitMQ.

5. **Ejecutar Sin Docker (Opcional)**

   Si prefieres ejecutar los servicios manualmente sin Docker, asegúrate de que RabbitMQ esté corriendo y luego sigue estos pasos:

   - **Instalar dependencias**

     ```bash
     npm install
     ```

   - **Iniciar el Servicio Calculator**

     ```bash
     cd apps/calculator
     npm run start:dev
     ```

   - **Iniciar el Servicio Gateway**

     En otra terminal:

     ```bash
     cd apps/gateway
     npm run start:dev
     ```

6. **Pruebas**

   Ejecuta las pruebas unitarias para ambos servicios con el siguiente comando:

   ```bash
   npm run test
   ```

### Ejemplo de Uso

Para hacer una solicitud, envía una petición `GET` a `http://localhost:3000/calculate/:number` donde `number` sera un numero entero positivo, en caso de no serlo se arrojara una respuesta de error.

La respuesta debería seguir el formato:

```json
{
  "isPair": false,
  "isPrime": true,
  "factorial": 120,
  "sumN": 15,
  "factors": [1, 5],
  "fibonacci": 5
}
```

### Limitaciones

Para el calculo de factoriales, al estar usando el tipo entero, en caso de numeros cuyo factorial sea mayor a 170, podria retornar `null` ya que el resultado revasara el maximo que puede almacenar este tipo de dato. Para el caso de fibonacci el numero mayor que incurre en esta limitante sera 1476.


---

## Notas Finales

Este proyecto está diseñado para ser modular, extensible y mantener principios de arquitectura limpia. Puedes añadir más servicios de cálculo en el futuro simplemente creando nuevos casos de uso y añadiéndolos como nuevos adaptadores. La configuración de Docker y RabbitMQ permite escalar el sistema fácilmente.

Sigue los principios de SOLID y Clean Architecture, manteniendo cada módulo y servicio enfocado en su responsabilidad específica. Con esto, el proyecto puede mantenerse y escalarse a medida que crecen los requerimientos.