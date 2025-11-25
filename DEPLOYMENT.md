# Guía de Despliegue - Viamedperu

## Estructura de Entornos

### Desarrollo Local
- **URL**: http://localhost:4321
- **WordPress**: http://web.viamed
- **Rama Git**: `dev` o `development`

### Producción
- **URL**: https://viamedperu.com
- **WordPress**: https://cms.viamedperu.com
- **Rama Git**: `main`

## Configuración

### 1. Variables de Entorno

Ya están configurados los archivos:
- `.env.development` - Para desarrollo local
- `.env.production` - Para producción

### 2. Despliegue en Vercel (Recomendado)

#### Pasos iniciales:

1. **Crear cuenta en Vercel** (si no la tienes)
   - Ve a https://vercel.com
   - Regístrate con tu cuenta de GitHub

2. **Conectar el repositorio**
   ```bash
   # Primero, asegúrate de tener el código en GitHub
   git add .
   git commit -m "Configuración de entornos"
   git push origin main
   ```

3. **Importar proyecto en Vercel**
   - Click en "Add New Project"
   - Selecciona tu repositorio `ViamedperuAstro`
   - Vercel detectará automáticamente que es un proyecto Astro

4. **Configurar variables de entorno en Vercel**
   - En Project Settings → Environment Variables
   - Añade para **Production**:
     ```
     WORDPRESS_API_URL=https://cms.viamedperu.com/wp-json/wp/v2
     PUBLIC_SITE_URL=https://viamedperu.com
     ```

5. **Configurar dominio personalizado**
   - En Project Settings → Domains
   - Añade `viamedperu.com`
   - Configura los DNS según las instrucciones de Vercel

### 3. Workflow de Desarrollo

#### Rama de Desarrollo (dev)
```bash
# Crear rama de desarrollo
git checkout -b dev

# Hacer cambios y probar localmente
npm run dev

# Subir cambios
git add .
git commit -m "Descripción del cambio"
git push origin dev
```

#### En Vercel - Configurar Preview para Dev
- Project Settings → Git
- Añadir `dev` como rama de preview
- Opcionalmente crear subdominio: `dev.viamedperu.com`

#### Pasar a Producción
```bash
# Cuando los cambios estén listos
git checkout main
git merge dev
git push origin main
```

Vercel desplegará automáticamente a producción.

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción (localmente)
npm run build
npm run preview

# Ver variables de entorno
echo $env:WORDPRESS_API_URL  # PowerShell
```

## Estructura del Proyecto

```
viamedperu/
├── src/
│   ├── config/
│   │   └── wordpress.ts          # Configuración centralizada de WordPress
│   ├── pages/
│   │   ├── index.astro            # Página principal
│   │   ├── [slug].astro           # Páginas dinámicas desde WP
│   │   └── nuestras-unidades.astro
│   └── ...
├── .env.development               # Variables de desarrollo (no subir a Git)
├── .env.production               # Variables de producción (no subir a Git)
├── .env.example                  # Ejemplo de variables
└── vercel.json                   # Configuración de Vercel
```

## Checklist Pre-Despliegue

- [ ] Variables de entorno configuradas
- [ ] WordPress accesible en cms.viamedperu.com
- [ ] Código pusheado a GitHub
- [ ] Vercel conectado al repositorio
- [ ] Dominio configurado en Vercel
- [ ] DNS apuntando a Vercel
- [ ] Probar build local: `npm run build`
- [ ] Verificar que las imágenes se cargan correctamente

## Troubleshooting

### Error al conectar con WordPress
- Verificar que cms.viamedperu.com esté accesible
- Verificar que las variables de entorno estén configuradas
- Verificar CORS en WordPress si es necesario

### Imágenes no se cargan
- Verificar rutas en `src/assets/`
- Verificar que las imágenes estén en el repositorio
- Verificar que el build incluya la carpeta `public/`

### Build falla en Vercel
- Revisar los logs en Vercel Dashboard
- Verificar que todas las dependencias estén en `package.json`
- Probar build localmente primero
