# Configuración de Webhooks - WordPress a Vercel

## ¿Qué hace esto?
Cuando publicas o actualizas contenido en WordPress (cms.viamedperu.com), automáticamente se hace un rebuild del sitio en Vercel para reflejar los cambios.

---

## Paso 1: Crear Deploy Hook en Vercel

1. Ve a tu proyecto en Vercel → **Settings** → **Git**
2. Busca la sección **Deploy Hooks**
3. Click en **Create Hook**
4. Nombre: `WordPress Content Update`
5. Branch: `main`
6. Click **Create Hook**
7. **Copia la URL generada** (algo como: `https://api.vercel.com/v1/integrations/deploy/...`)

---

## Paso 2: Instalar Plugin en WordPress

### Opción A: Plugin WP Webhooks (Recomendado)

1. En WordPress Admin → **Plugins** → **Add New**
2. Busca: **WP Webhooks**
3. Instala y activa el plugin
4. Ve a **Settings** → **WP Webhooks** → **Send Data**
5. Click en **Add Webhook URL**
6. Configuración:
   ```
   Webhook URL: [Pega la URL de Vercel aquí]
   Trigger: post_updated, page_updated
   ```
7. Guarda

### Opción B: Plugin Manual (Código en functions.php)

Si prefieres no usar plugin, agrega este código a `functions.php` de tu tema:

```php
<?php
// Webhook para Vercel cuando se publica contenido
function trigger_vercel_rebuild($post_id) {
    // Solo para posts y páginas publicadas
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }
    
    $post_status = get_post_status($post_id);
    if ($post_status !== 'publish') {
        return;
    }
    
    // URL del Deploy Hook de Vercel (cambiar por tu URL)
    $webhook_url = 'https://api.vercel.com/v1/integrations/deploy/TU_URL_AQUI';
    
    // Hacer la petición POST
    wp_remote_post($webhook_url, array(
        'method'      => 'POST',
        'timeout'     => 5,
        'redirection' => 5,
        'blocking'    => false, // No bloquear la respuesta
        'headers'     => array('Content-Type' => 'application/json'),
        'body'        => json_encode(array('trigger' => 'wordpress'))
    ));
}

// Disparar webhook cuando se publica/actualiza un post
add_action('save_post', 'trigger_vercel_rebuild', 10, 1);
add_action('publish_post', 'trigger_vercel_rebuild', 10, 1);
add_action('publish_page', 'trigger_vercel_rebuild', 10, 1);
?>
```

---

## Paso 3: Probar el Webhook

1. En WordPress, edita cualquier página o post
2. Publica o actualiza el contenido
3. Ve a Vercel → **Deployments**
4. Deberías ver un nuevo deployment iniciándose automáticamente
5. Espera 2-3 minutos a que termine el build
6. Verifica que los cambios se reflejen en `viamedperu.com`

---

## ⚙️ Configuración Avanzada (Opcional)

### Agregar delay para evitar múltiples rebuilds

Si haces varios cambios seguidos, puedes agregar un delay:

```php
function trigger_vercel_rebuild_delayed($post_id) {
    // Solo disparar si han pasado al menos 5 minutos desde el último rebuild
    $last_trigger = get_transient('vercel_last_rebuild');
    
    if ($last_trigger) {
        return; // Ya se disparó recientemente
    }
    
    trigger_vercel_rebuild($post_id);
    
    // Bloquear por 5 minutos
    set_transient('vercel_last_rebuild', time(), 5 * MINUTE_IN_SECONDS);
}

add_action('save_post', 'trigger_vercel_rebuild_delayed', 10, 1);
```

---

## 🐛 Troubleshooting

### El webhook no se dispara:
- Verifica que la URL del Deploy Hook sea correcta
- Revisa los logs de WordPress (WP Webhooks tiene logs)
- Verifica que el post/página esté en estado "publish"

### Toma mucho tiempo:
- El rebuild de Vercel toma 2-3 minutos normalmente
- Puedes ver el progreso en tiempo real en Vercel Dashboard

### Demasiados rebuilds:
- Implementa el delay mostrado arriba
- O solo dispara el webhook en ciertos post types específicos

---

## 📊 Monitoreo

Para ver los webhooks disparados:
- **Vercel**: Dashboard → Deployments (verás "Triggered by Hook")
- **WordPress con WP Webhooks**: Settings → WP Webhooks → Logs

---

## ✅ Resumen

1. ✅ Crea Deploy Hook en Vercel
2. ✅ Instala WP Webhooks o agrega código a functions.php
3. ✅ Configura la URL del webhook
4. ✅ Prueba publicando contenido
5. ✅ Verifica en Vercel que se dispare el rebuild
