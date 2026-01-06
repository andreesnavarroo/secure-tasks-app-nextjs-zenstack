# Secure Tasks App – Next.js + ZenStack

Aplicación **full-stack** construida con **Next.js**, **Prisma** y **ZenStack**, cuyo objetivo es demostrar cómo implementar un **CRUD seguro** utilizando **control de acceso basado en políticas a nivel de modelo**, en lugar de validaciones distribuidas en controladores o rutas.

Este proyecto muestra una forma escalable y limpia de manejar **autorización**, ideal para aplicaciones SaaS, sistemas multiusuario y entornos donde la seguridad de los datos es crítica.

---

## 🚀 Stack Tecnológico

- **Next.js (App Router)** – Framework full-stack
- **TypeScript**
- **Prisma ORM** – Acceso a base de datos
- **ZenStack v2** – Capa de autorización y CRUD automático
- **PostgreSQL** – Base de datos relacional
- **Postman** – Pruebas de la API

---

## 🎯 Objetivo del Proyecto

Demostrar cómo:
- Centralizar reglas de acceso en el **modelo de datos**
- Evitar duplicación de lógica de permisos en rutas o controladores
- Proteger automáticamente todas las operaciones CRUD
- Separar claramente **autenticación** y **autorización**

---

## 🔐 Conceptos Clave Implementados

- Autorización declarativa usando **policies (`@@allow`)**
- CRUD automático expuesto bajo `/api/model/*`
- Control de acceso por **propiedad de datos**
- Visibilidad de datos **públicos vs privados**
- Seguridad aplicada antes de que cualquier query llegue a la base de datos

---

## 🧱 Arquitectura

Request (Frontend / API Client)
↓
Next.js API Route (/api/model/*)
↓
ZenStack Access Policies
↓
Prisma Client
↓
PostgreSQL

python
Copiar código

ZenStack intercepta todas las operaciones de datos y evalúa las políticas de acceso
antes de ejecutar cualquier consulta en la base de datos.

---

## 📊 Modelos de Datos

### User
- Cada usuario solo puede crear y acceder a su propio registro.

### Task
- Las tareas públicas pueden ser vistas por cualquier usuario.
- Las tareas privadas solo pueden ser vistas por su propietario.
- Solo el propietario puede actualizar o eliminar una tarea.

### Ejemplo de políticas en el modelo `Task`

```zmodel
@@allow('read', isPublic == true || ownerId == auth().id)
@@allow('create', auth() != null && ownerId == auth().id)
@@allow('update', ownerId == auth().id)
@@allow('delete', ownerId == auth().id)