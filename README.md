# 🌿 Manual de Usuario y Guía del Sistema: Directorio de Negocios Verdes

Este manual describe el funcionamiento detallado de la aplicación, su estructura de navegación y las reglas para la gestión de datos.

---

## 🚀 1. Estructura de Navegación (Cómo usar la App)

La aplicación está dividida en módulos accesibles mediante rutas específicas. A continuación, se detalla qué hace cada sección:

### **🏠 Inicio (Página Principal)**
*   **Ruta:** `/`
*   **Uso:** Vista general de los negocios destacados, buscador principal y acceso a las categorías. Es la puerta de entrada para los usuarios.

### **🏢 Gestión de Negocios (Directorio Verde)**
*   **Ver Perfil de Negocio:** `/verPerfilNegocio/[id_negocio]`
    *   Muestra toda la información pública del negocio: descripción, fotos, redes sociales y ubicación.
*   **Crear Negocio:** `/crearNegocio`
    *   Formulario para registrar un nuevo emprendimiento. Requiere subir un logo y fotos de galería.
*   **Editar Negocio:** `/editarNegocio/[id_negocio]`
    *   Permite actualizar la información de un negocio existente.

### **🛍️ Catálogo de Productos**
*   **Ver Productos por Negocio:** `/productos/[id_negocio]`
    *   Muestra el listado de productos específicos que vende un negocio.
*   **Gestión de Productos:** `/productos/crear` y `/productos/editar`
    *   Permite añadir nuevos productos (nombre, precio, imagen) o modificar los actuales.

### **📞 Contactos**
*   **Ver Contactos:** `/contactos/[id_negocio]`
    *   Listado de personas o medios de contacto asociados a un negocio.
*   **Gestión:** `/contactos/crear` y `/contactos/editar`
    *   Para añadir números de teléfono o correos adicionales de atención.

### **📅 Eventos y Ferias**
*   **Listado por Estado:** `/eventos/[Estado]`
    *   Filtra los eventos según su estado (ej: "Proximos", "Finalizados").
*   **Gestión:** `/eventos/crear`, `/eventos/editar` y `/eventos/verEvento`
    *   Administración de las ferias donde participan los negocios verdes.

### **📍 Mapa Interactivo**
*   **Ruta:** `/mapa`
*   **Uso:** Visualización geográfica de todos los negocios que tienen coordenadas GPS registradas. Permite al usuario encontrar negocios cercanos.

### **🗺️ Municipios y Grupos**
*   **Ruta:** `/municipios/[zona]` y `/grupos`
    *   Administración de la organización territorial y sectorial de los negocios. Permite agrupar negocios por regiones o tipos de actividad.

### **🔐 Administración y Seguridad**
*   **Ruta:** `/auth`
    *   Acceso restringido para administradores. Aquí se inicia sesión para poder crear, editar o eliminar registros.

---

## 🛠️ 2. Reglas de Operación y Validaciones

### **Negocios (Directorio)**
1.  **Imágenes Obligatorias:** No se puede crear un negocio sin un **Logo**. Se recomienda formato cuadrado.
2.  **Ubicación GPS:** Si ingresas latitud, debes ingresar longitud obligatoriamente para que el negocio aparezca en el `/mapa`.
3.  **Redes Sociales:** Los enlaces deben empezar con `https://` (ej: `https://facebook.com/minervatodo`).

### **Productos**
1.  **Relación:** Un producto siempre debe pertenecer a un negocio. No existen productos "sueltos".
2.  **Precio:** Debe ser un valor numérico positivo.

### **Contactos**
1.  **Unicidad:** No se permite registrar el mismo número de teléfono dos veces para el mismo negocio para evitar datos basura.

---

## ❌ 3. Guía de Mensajes y Errores

| Mensaje en Pantalla | ¿Qué significa? | ¿Cómo solucionarlo? |
| :--- | :--- | :--- |
| **"Datos incompletos"** | Olvidaste llenar un campo obligatorio o subir una imagen. | Revisa los campos con asterisco o el campo de imagen. |
| **"Correo ya registrado"** | El email ingresado ya pertenece a otro negocio o contacto. | Usa un correo único para cada registro. |
| **"No puedes eliminar este negocio..."** | El sistema protege los datos. No permite borrar un negocio que aún tiene productos o contactos. | Borra primero sus productos y contactos, luego borra el negocio. |
| **"Formato de URL inválido"** | El enlace de red social está mal escrito. | Asegúrate de que el link sea completo y empiece por `https://`. |

---

## 📂 4. Gestión de Archivos (Vercel Blob)

El sistema utiliza almacenamiento en la nube para optimizar la velocidad:
*   **Imágenes:** Se procesan automáticamente al subir.
*   **Catálogos PDF:** Se pueden descargar directamente desde el perfil del negocio.
*   **Borrado Automático:** Al eliminar un registro (negocio, producto o evento), el sistema limpia automáticamente la nube eliminando las imágenes asociadas para no generar costos extra.

---

## 💻 5. Información Técnica para Desarrolladores

Para ejecutar el proyecto localmente:

```bash
pnpm install   # Instalar dependencias
npx prisma generate # Generar cliente de base de datos
pnpm dev       # Iniciar servidor de desarrollo
```

**Tecnologías:** Next.js 15, Prisma ORM, PostgreSQL, Vercel Blob, Tailwind CSS.
