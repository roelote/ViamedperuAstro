# 🚀 Despliegue en Vercel - Viamedperu

## Configuración Actual

- **Frontend**: `viamedperu.com` (Vercel)
- **Backend**: `cms.viamedperu.com` (WordPress)
- **Desarrollo local**: `http://localhost:4321` → `http://web.viamed`

---

## 📋 Pasos para Desplegar en Vercel

### 1. Preparar el Repositorio

```powershell
# Asegúrate de estar en la rama main
git checkout main

# Añade todos los cambios
git add .

# Commit
git commit -m "Configuración para despliegue en Vercel"

# Push a GitHub
git push origin main
```

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Click en **"Add New Project"**
4. Selecciona el repositorio **`ViamedperuAstro`**
5. Vercel detectará automáticamente que es un proyecto Astro

### 3. Configurar Variables de Entorno en Vercel

**IMPORTANTE**: En la pantalla de configuración del proyecto, añade estas variables:

#### Para **Production** (main branch):
```
WORDPRESS_API_URL = https://cms.viamedperu.com/wp-json/wp/v2
PUBLIC_SITE_URL = https://viamedperu.com
```

#### Para **Preview** (dev branch - opcional):
```
WORDPRESS_API_URL = https://cms.viamedperu.com/wp-json/wp/v2
PUBLIC_SITE_URL = https://dev.viamedperu.com
```

**Pasos en Vercel**:
- Click en **"Environment Variables"**
- Añade `WORDPRESS_API_URL` y selecciona **Production**
- Añade `PUBLIC_SITE_URL` y selecciona **Production**
- Repite para **Preview** si lo deseas

### 4. Deploy

Click en **"Deploy"** y espera a que termine el build (2-3 minutos)

---

## 🌐 Configurar el Dominio viamedperu.com

### En Vercel:

1. Una vez desplegado, ve a **Project Settings → Domains**
2. Click en **"Add Domain"**
3. Ingresa: `viamedperu.com`
4. Vercel te dará las instrucciones de DNS

### Configuración DNS (en tu proveedor de dominio):

Añade estos registros:

#### Opción A - Con subdominios:
```
Tipo    Nombre    Valor
A       @         76.76.21.21
CNAME   www       cname.vercel-dns.com
```

#### Opción B - Solo dominio principal:
```
Tipo    Nombre    Valor
A       @         76.76.21.21
A       www       76.76.21.21
```

**Nota**: Los valores exactos te los proporciona Vercel.

### Para el subdominio dev (opcional):
```
Tipo    Nombre    Valor
CNAME   dev       cname.vercel-dns.com
```

---

## 🔧 Configuración WordPress (cms.viamedperu.com)

Asegúrate de que tu WordPress permita peticiones desde tu dominio de Vercel:

### 1. Verificar CORS (si es necesario)

Añade esto a tu `wp-config.php` o en un plugin:

```php
header("Access-Control-Allow-Origin: https://viamedperu.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

### 2. Verificar URL del sitio

En WordPress Admin → Settings → General:
- **WordPress Address (URL)**: `https://cms.viamedperu.com`
- **Site Address (URL)**: `https://cms.viamedperu.com`

---

## ✅ Verificación Post-Despliegue

Después del despliegue, verifica:

- [ ] El sitio carga en `viamedperu.com`
- [ ] Las imágenes se muestran correctamente
- [ ] Los datos de WordPress se cargan (página de inicio)
- [ ] Las páginas dinámicas funcionan (`/nuestras-unidades`)
- [ ] El botón de WhatsApp funciona
- [ ] Los enlaces de teléfono y email funcionan
- [ ] El video de hero se reproduce
- [ ] Los certificados SSL están activos (candado verde)

---

## 🔄 Workflow de Desarrollo

### Trabajar en desarrollo:

```powershell
# Crear/cambiar a rama dev
git checkout -b dev   # o git checkout dev

# Hacer cambios
npm run dev

# Commit y push
git add .
git commit -m "Nueva funcionalidad"
git push origin dev
```

Vercel creará automáticamente un **preview deployment** con URL temporal.

### Pasar a producción:

```powershell
# Merge a main
git checkout main
git merge dev
git push origin main
```

Vercel desplegará automáticamente a `viamedperu.com`

---

## 🛠️ Comandos Útiles

```powershell
# Ver variables de entorno localmente
Get-Content .env

# Build local (simular producción)
npm run build
npm run preview

# Ver logs en tiempo real
# Ve a Vercel Dashboard → tu proyecto → Deployments → click en el deployment → View Function Logs
```

---

## ⚠️ Troubleshooting

### Error: "WordPress API no responde"
- Verifica que `cms.viamedperu.com` esté accesible públicamente
- Verifica las variables de entorno en Vercel
- Revisa los logs en Vercel Dashboard

### Error: "Cannot find module"
- Verifica que todas las dependencias estén en `package.json`
- Intenta hacer build localmente: `npm run build`

### Error: "Images not loading"
- Verifica que las imágenes estén en `src/assets/` o `public/`
- Verifica rutas relativas en los imports

### Redeploy manual:
En Vercel Dashboard → Deployments → click en los tres puntos → "Redeploy"

---

## 📞 Recursos

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentación Vercel](https://vercel.com/docs)
- [Documentación Astro](https://docs.astro.build)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)

---

## 📝 Checklist Final

Antes de ir a producción:

- [ ] `.env` configurado para desarrollo local
- [ ] Variables de entorno configuradas en Vercel
- [ ] WordPress accesible en `cms.viamedperu.com`
- [ ] DNS configurado correctamente
- [ ] Build local exitoso: `npm run build`
- [ ] Todas las imágenes presentes
- [ ] Código pusheado a GitHub main
- [ ] Dominio verificado en Vercel
- [ ] SSL activo (https)
- [ ] Pruebas en diferentes dispositivos
- [ ] Google Analytics configurado (si aplica)
