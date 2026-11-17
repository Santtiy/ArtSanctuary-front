# ArtSanctuary

![Logo de ArtSanctuary](public/images/brand/isotipo-artsanctuary.png)

ArtSanctuary es un frontend Angular para una comunidad artística de Pasto, Nariño.

El proyecto integra la creación y exploración de obras con el contexto del Carnaval de Negros y Blancos y Corpocarnaval.
Es un proyecto de curso de la Universidad Cooperativa de Colombia.

Diseño original en Figma: [ArtSanctuary - Localhost](https://www.figma.com/design/Ay9BkdbRIu4EA1m7B1IU4K/ArtSanctuary-%E2%80%93-Localhost)
Repositorio: [Santtiy/ArtSanctuary-front](https://github.com/Santtiy/ArtSanctuary-front)

## Tecnologías

- Angular `22.2.0`
- TypeScript `~6.0.2`
- Vitest `^5.0.0`
- SCSS
- Google Fonts: Barlow, Barlow Semi Condensed y Space Mono
- Material Symbols

Las versiones de Angular corresponden a los paquetes del framework en `package.json`; Angular CLI y Angular Build están en `22.2.6`.

## Cómo ejecutar el proyecto

### Requisitos

- Node.js
- npm

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/Santtiy/ArtSanctuary-front.git
cd ArtSanctuary-front
npm install
```

Sin ejecutar `npm install`, `ng serve` falla porque las dependencias del proyecto no están instaladas.

Inicia el servidor de desarrollo:

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200).

Para compilar:

```bash
npm run build
```

Para ejecutar las pruebas:

```bash
npm test
```

## Páginas y rutas

Las rutas se declaran en [`src/app/app.routes.ts`](src/app/app.routes.ts). Las páginas principales están dentro de `MainLayout`, que agrega el header y el footer.

| Ruta | Componente | Qué se puede hacer |
| --- | --- | --- |
| `/` | `Home` | Ver el hero, la introducción, categorías, herramientas, artistas, obras recientes y el acceso al workspace. |
| `/gallery` | `Gallery` | Explorar obras, artistas y carrozas; aplicar filtros por categoría y marcar likes. |
| `/explore` | `Explore` | Buscar obras por título, autor o categoría y usar filtros de categoría y etiquetas. |
| `/dashboard/tools` | `Tools` | Consultar las herramientas y filtrar la vista para ver las herramientas gratuitas. |
| `/dashboard/workspaces` | `Workspace` | Crear y eliminar proyectos y activar o desactivar la acreditación de Corpocarnaval. |
| `/upload` | `Upload` | Registrar una obra mediante un formulario, seleccionar una imagen, validarla y ver su vista previa. |
| `/artisans/:id` | `ArtisanProfile` | Consultar el perfil del artesano identificado por `id`, sus obras y su galería de fotos. Se abre desde las tarjetas de artistas de la Home y de la galería. |
| `/carrozas/:id` | `CarrozaProfile` | Consultar el perfil de una carroza, abrir sus fotos y revisar sus obras. Se abre desde las tarjetas de carrozas de la galería. |
| `/login` | `Login` | Iniciar sesión con validaciones de correo y contraseña. |
| `/register` | `Register` | Registrar una cuenta con validaciones de nombre, correo, contraseña y confirmación. |
| `**` | Redirección a `/` | Enviar las rutas no reconocidas a la Home. |

`/login` y `/register` no tienen header ni footer porque están fuera de `MainLayout`.

## Funcionalidades

- Likes persistentes para las obras mediante `LikesService` y `localStorage`.
- Filtros de la galería por obras, artistas, carrozas y categorías.
- Buscador de Explore por título, autor y categoría, con filtros y etiquetas.
- Proyectos del workspace con estado gratuito o acreditación de Corpocarnaval.
- Formulario de registro de obras con validaciones, selección de imagen y vista previa.
- Validación de tipo JPG, PNG o WebP y límite de 2 MB para la imagen seleccionada.
- Registro e inicio de sesión con formularios reactivos y validaciones.
- Perfiles de artesanos y de carrozas con información, obras y galería de fotos.

## Conceptos de Angular aplicados

| Concepto | Archivo y línea donde se observa |
| --- | --- |
| Componentes standalone | [`src/app/components/category-card/category-card.ts:14`](src/app/components/category-card/category-card.ts:14), con `standalone: true`. |
| Rutas e hijas | [`src/app/app.routes.ts:16`](src/app/app.routes.ts:16), donde las páginas se agrupan como `children` de `MainLayout`. |
| Signals | [`src/app/pages/explore/explore.ts:18`](src/app/pages/explore/explore.ts:18), con `searchTerm`, `showFilters` y otros estados reactivos. |
| `computed` | [`src/app/pages/explore/explore.ts:36`](src/app/pages/explore/explore.ts:36), para calcular las disciplinas; también se usa para los resultados. |
| `*ngFor` | [`src/app/components/footer/footer.html:21`](src/app/components/footer/footer.html:21), para recorrer los enlaces del footer. |
| `*ngIf` con `else` | [`src/app/components/category-card/category-card.html:15`](src/app/components/category-card/category-card.html:15), para mostrar la imagen o `iconTpl`. |
| `ngClass` | [`src/app/components/artwork-card/artwork-card.html:19`](src/app/components/artwork-card/artwork-card.html:19), para aplicar el estado activo del like. |
| Eventos `(click)`, `(input)`, `(change)` y `(keyup.enter)` | [`src/app/pages/explore/explore.html:10`](src/app/pages/explore/explore.html:10), [`src/app/pages/explore/explore.html:36`](src/app/pages/explore/explore.html:36), [`src/app/pages/workspace/workspace.html:28`](src/app/pages/workspace/workspace.html:28) y [`src/app/pages/workspace/workspace.html:13`](src/app/pages/workspace/workspace.html:13). |
| Métodos con parámetros | [`src/app/components/artwork-card/artwork-card.ts:27`](src/app/components/artwork-card/artwork-card.ts:27), donde `onLike` recibe un `MouseEvent`; `openProfile` usa los datos de la obra. |
| `localStorage` | [`src/app/services/likes.service.ts:17`](src/app/services/likes.service.ts:17), donde se persisten los likes. |
| Servicios con `inject()` | [`src/app/services/auth.service.ts:11`](src/app/services/auth.service.ts:11), donde se declara `AuthService` como servicio inyectable; su uso aparece en [`src/app/pages/login/login.ts:16`](src/app/pages/login/login.ts:16). |
| Formularios reactivos | [`src/app/pages/login/login.ts:20`](src/app/pages/login/login.ts:20), con `FormBuilder`, `ReactiveFormsModule` y `Validators`. |
| Validador personalizado | [`src/app/validators/passwords-match.validator.ts:3`](src/app/validators/passwords-match.validator.ts:3), que compara `password` y `confirmPassword`. |
| `@Input` y `@Output` | [`src/app/components/artwork-card/artwork-card.ts:15`](src/app/components/artwork-card/artwork-card.ts:15) y [`src/app/components/artwork-card/artwork-card.ts:18`](src/app/components/artwork-card/artwork-card.ts:18). |
| Parámetros de ruta con `ActivatedRoute` | [`src/app/pages/artisan-profile/artisan-profile.ts:14`](src/app/pages/artisan-profile/artisan-profile.ts:14), donde se lee el parámetro `id`. |

## Estructura de `src/app`

```text
src/app/
├── components/
├── pages/
├── layouts/
├── models/
├── data/
├── services/
└── validators/
```

- `components/`: componentes reutilizables, como header, footer, tarjetas y secciones de la Home.
- `pages/`: vistas asociadas a las rutas de la aplicación.
- `layouts/`: estructuras generales que envuelven varias páginas.
- `models/`: interfaces y tipos de los datos de obras, herramientas, categorías, proyectos y perfiles.
- `data/`: datos estáticos usados por las páginas y componentes.
- `services/`: lógica reutilizable para autenticación y likes.
- `validators/`: validadores personalizados de formularios.

## Datos y almacenamiento

Los datos iniciales son estáticos y se encuentran en `src/app/data`:

- `artisan-profiles.ts`
- `artworks.ts`
- `categories.ts`
- `nav-links.ts`
- `tools.ts`

La aplicación usa estas claves de `localStorage`:

| Clave | Uso |
| --- | --- |
| `as_liked_artworks` | Guarda los identificadores de las obras marcadas con like. |
| `as_projects` | Guarda los proyectos del workspace y su estado de acreditación. |
| `as_uploads` | Guarda los registros de obras creados desde Upload. |
| `as_users` | Guarda los usuarios registrados para el flujo educativo de autenticación. |
| `as_session` | Guarda la sesión del usuario que inició sesión. |

Las contraseñas se guardan en el navegador únicamente con fines educativos. El proyecto no tiene backend ni un sistema de autenticación seguro para producción.

## Flujo de trabajo del equipo

1. Mantener `main` como rama principal y `develop` como rama de integración.
2. Crear una rama `feature/...` por cada funcionalidad.
3. Implementar la funcionalidad y realizar un commit por paso.
4. Abrir un pull request desde la rama `feature/...` hacia `develop` usando la plantilla del curso.
5. Revisar y aprobar el pull request antes de integrar los cambios.

## Limitaciones conocidas

- No hay backend; los datos de la aplicación y la autenticación son locales al navegador.
- Las contraseñas se almacenan en `localStorage` sin cifrado, únicamente para fines educativos.
- La opción **Sign out** del menú del header navega a `/login`, pero no ejecuta `AuthService.logout()`, por lo que no cierra la sesión persistida.
- La recuperación de contraseña solo muestra el mensaje `Password recovery coming soon.`.
- Las obras registradas desde Upload se guardan en `localStorage`; no se suben a un servidor.
- Las rutas con un `id` no válido muestran el estado de perfil no encontrado definido por cada plantilla.

## Equipo

| Nombre | Rol y contribución |
| --- | --- |
| Santyago Bustos | Base del proyecto, rutas, layout, header, footer, hero, intro, sección de artistas, perfiles de artesanos y carrozas, y revisión de pull requests. |
| Juan Enriquez | `ToolCard`, sección TOOLS, `ArtworkCard` con likes, Gallery y Explore. |
| Manuel Viveros | Categorías de la Home y página Tools. |
| Samuel Mena | Workspace, formulario Upload, Login y Register. |
