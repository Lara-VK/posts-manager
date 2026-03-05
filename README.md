# Posts Manager — Angular

Aplicación Frontend desarrollada con **Angular 17 (Standalone Components)**.

Permite gestionar Posts y Comments consumiendo la API desarrollada en NestJS.

---

## 🚀 Tecnologías

* Angular 17
* Standalone Components
* Angular Signals
* RxJS
* Reactive Forms
* HttpInterceptor

---

## 📌 Instalación

```bash
git clone <repo-url>
cd posts-manager
npm install
ng serve
```

Disponible en:

```
http://localhost:4200
```

---

## 🔥 Funcionalidades

* Listado de posts con paginación
* Crear post
* Editar post
* Eliminar post
* Ver detalle de post
* Crear comentario
* Manejo global de errores (Interceptor)
* Formularios reactivos con validaciones
* Uso de Signals
* Uso de switchMap (RxJS)

---

## 📦 Estructura

```
src/app/
 ├── core/
 │    ├── interceptors/
 │    └── services/
 ├── features/
 │    ├── posts/
 │    └── comments/
 ├── app.config.ts
 ├── app.routes.ts
```

---

## 🧠 Arquitectura

* Servicios desacoplados
* Manejo de estado con Signals
* RxJS para flujos reactivos
* HttpClient centralizado
* Interceptor global para errores

---

## ⚙️ Conexión con Backend

El frontend espera que el backend esté corriendo en:

```
http://localhost:3000
```

Si se usa Docker:

```bash
docker compose up --build
```

---

## 🛠 Scripts útiles

```bash
ng serve        # Dev server
ng build        # Build producción
```

---

## 👨‍💻 Autor

Prueba técnica Full-Stack
Angular + NestJS + MongoDB
