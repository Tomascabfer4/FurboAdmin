# ⚽👑 Furbo Admin Panel

> **El CMS definitivo para gestionar Furbo Vacano.**
> Administra tus canales, listas y aplicaciones de forma visual sin tocar una sola línea de código JSON.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73C98?style=for-the-badge&logo=vite&logoColor=white)

---

## 📋 Descripción

**Furbo Admin** es una aplicación web diseñada para actuar como "backend" de la aplicación de TV **Furbo Vacano**.

Se conecta directamente a la API de GitHub para leer y escribir en el archivo `furbo-data.json`. Esto permite actualizar los enlaces de fútbol, añadir nuevas APPs o cambiar listas Acestream desde el móvil o el PC, reflejándose los cambios casi al instante en todos los dispositivos TV Box.

## ✨ Características

* **🛡️ Serverless:** No requiere base de datos ni servidor propio. Usa GitHub como backend.
* **⚡ Edición en Tiempo Real:** Lee, edita y guarda cambios directamente en tu repositorio.
* **🎨 Interfaz Intuitiva:** Formularios claros para Canales Web, Listas Acestream, Apps y VPNs.
* **🔒 Seguro:** Acceso mediante Personal Access Token (PAT) de GitHub.
* **📱 Responsive:** Gestiona tu contenido desde el ordenador o el móvil.
* **🌙 Dark Mode:** Diseño oscuro elegante con Tailwind CSS.

## 🚀 Instalación y Desarrollo Local

Sigue estos pasos para ejecutar el panel en tu ordenador:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Tomascabfer4/furbo-admin.git](https://github.com/Tomascabfer4/furbo-admin.git)
    cd furbo-admin
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar constantes:**
    Abre `src/App.tsx` y asegúrate de que estas constantes apuntan a tu repositorio de la App de TV:
    ```typescript
    const GITHUB_OWNER = "Tomascabfer4";
    const GITHUB_REPO = "FurboVacano"; // El nombre del repo de la App
    const FILE_PATH = "furbo-data.json";
    ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 🔑 Configuración del Token de GitHub

Para que la web pueda guardar cambios, necesitas una "llave" de acceso.

1.  Ve a [GitHub Settings > Developer Settings > Personal Access Tokens (Classic)](https://github.com/settings/tokens).
2.  Haz clic en **Generate new token (classic)**.
3.  **Nombre:** `FurboAdmin`.
4.  **Scopes (Permisos):** Marca la casilla **`repo`** (esto da control total sobre tus repos privados/públicos para poder editar el archivo).
5.  Copia el token que empieza por `ghp_...`.
6.  Al abrir **Furbo Admin**, pega este token en la pantalla de inicio.

> **Nota:** El token se guarda en el `localStorage` de tu navegador para que no tengas que escribirlo cada vez.

## 📦 Despliegue (Gratis)

Puedes subir esta web a internet en 2 minutos usando **Vercel** o **Netlify**.

1.  Sube este código a un repositorio de GitHub.
2.  Entra en [Vercel](https://vercel.com).
3.  Dale a **"Add New Project"** e importa tu repo `furbo-admin`.
4.  Dale a **Deploy**.
5.  ¡Listo! Ya tienes tu URL propia (ej: `furbo-admin.vercel.app`) para gestionar tu TV desde cualquier lugar.

## 🛠️ Tecnologías Usadas

* **Frontend:** React + Vite
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS + Lucide React (Iconos)
* **API:** Octokit (GitHub SDK)

## ⚠️ Aviso

Esta herramienta modifica directamente archivos en tu repositorio.
* Se recomienda hacer una copia de seguridad de tu `furbo-data.json` de vez en cuando.
* Si borras un elemento en el Admin, se borra permanentemente del JSON al guardar.

---

Hecho con ❤️ y ⚽ por **Tomás Cabello Fernández**
