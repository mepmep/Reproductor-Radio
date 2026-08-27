# Antigravity RADIO - Live Radio Player PWA

Especificaciones técnicas, arquitectura y registro de correcciones del reproductor web ejecutable para `myradio.net.ar`.

---

## 📁 Estructura del Proyecto
1. `index.html`: Diseño responsivo y minimalista con Tailwind CSS v4.
2. `app.js`: Lógica de reproducción, temporizador (Sleep Timer), PWA y sincronización MediaSession.
3. `manifest.json` & `sw.js`: Configuración PWA e instalación en pantalla de inicio.

---

## ⚙️ Configuración de Red y Streaming
* **Stream URL:** `https://az03.streaminghd.net.ar/8084/stream`
* **Metadata Widget Script:** `https://az03.streaminghd.net.ar/cp/widgets.js?r=210` (Puerto `8084`)

---

## 🚀 Funcionalidades Principales

1. **Interfaz Móvil:** 
   * Tema oscuro minimalista.
   * Carátula dinámica (`song.art`) centrada. Fallback a `logo.png` si no hay imagen.
   * Título y Artista en tiempo real.
   * Botón de reproducción grande (Play / Pause / Stop).
2. **Control en Segundo Plano / Pantalla de Bloqueo:**
   * Integración con `navigator.mediaSession` para controles Bluetooth y de sistema.
3. **Sleep Timer (Apagado Automático):**
   * Opciones: 15 min, 30 min, 60 min, Desactivar.
   * Detiene el audio (`audio.pause()` / `audio.load()`) para liberar datos móviles al finalizar.
4. **Botón STOP Total:**
   * Detiene la reproducción, resetea la fuente para cortar consumo de datos en segundo plano y muestra `logo.png`.
5. **Botón Compartir:**
   * Usa `navigator.share()` nativo; fallback a copiar URL al portapapeles (`navigator.clipboard`).
6. **Soporte PWA:**
   * Instalación directa en pantalla de inicio.

---

## 📌 Historial de Correcciones y Reglas de Integración

### Corrección 1: Bypass CORS y Metadata SonicPanel
* **Problema:** Los endpoints JSON directos fallaban por restricciones CORS.
* **Solución:** Inyección del script `widgets.js` de SonicPanel en `index.html` (con atributo `data-port="8084"`).
* **Comportamiento en JS:** `app.js` no hace `fetch()` directo a la API; en su lugar, observa el DOM (`.cc_streaminfo[data-type="song"]`) mediante un intervalo/observer para capturar el cambio de metadata y sincronizarlo con `navigator.mediaSession`.

### Corrección 2: Renderizado de Nombre y Artista
* **Implementación:** La etiqueta HTML `<div class="text-xl font-bold text-white cc_streaminfo" data-type="song">Cargando canción...</div>` recibe el stream dinámico del widget directamente bajo la carátula.