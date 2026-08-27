# MyRadio - Progressive Web App (PWA) de Radio en Vivo

Reproductor de streaming de audio ultraligero y moderno para **myradio.net.ar**.

## ✨ Características Principales
- 📱 **PWA Instalable**: Funciona como aplicación nativa en iOS, Android, Windows y macOS.
- 🎨 **Diseño Moderno & Glassmorphism**: Interfaz oscura con Tailwind CSS, carátula dinámica en alta resolución y halos de neón reactivos.
- 🔄 **Metadata en Vivo cada 12s**: Parser polimórfico compatible con AzuraCast, SonicPanel, Centova Cast e Icecast sin parpadeos.
- 🔒 **MediaSession API**: Muestra artista, canción y carátula en la pantalla de bloqueo y controles Bluetooth.
- ⏱ **Sleep Timer (Temporizador de Apagado)**: Presets de 15, 30 y 60 minutos con cuenta regresiva en vivo y **corte automático de audio y socket HTTP para 0% consumo de datos móviles**.
- 📶 **Control de Estado de Red**: Banner automático cuando se pierde la conexión a internet.
- 🚀 **Service Worker Optimizado**: Precaché del App Shell y bypass estricto del streaming de audio para cero latencia.

## 📁 Estructura de Archivos
```
├── index.html               # Interfaz responsiva moderna con Tailwind CSS
├── app.js                   # Motor de audio, API metadata, MediaSession, Sleep Timer y PWA
├── manifest.json            # Configuración de instalación PWA
├── sw.js                    # Service Worker (Caché inteligente)
├── favicon.svg              # Favicon del navegador
├── logo.png                 # Logo por defecto / fallback de carátula
├── myradio-net-ar-logo.webp # Logo oficial
└── icons/                   # Íconos PWA
    ├── icon-192.svg
    ├── icon-512.svg
    └── icon-maskable.svg
```

## 🌐 Despliegue en Servidor
Sube todos los archivos a la carpeta `public_html` de tu servidor web en **myradio.net.ar**. Requiere HTTPS activo para habilitar las capacidades PWA y el Service Worker.
