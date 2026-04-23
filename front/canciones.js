/* =====================================================
   canciones.js
   Lista de canciones / playlists de Spotify para Sol.

   --------  CÓMO AÑADIR UNA CANCIÓN  -------------------
   1. En Spotify (web o app), abre la canción, álbum o playlist.
   2. Menú "..." -> Compartir -> Copiar enlace de la canción.
      Te dará algo como:
        https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp?si=...
                                ^^^^^  ^^^^^^^^^^^^^^^^^^^^^^
                                 tipo   id (lo que nos interesa)
   3. Añade un objeto aquí con:
        tipo   : 'track' | 'album' | 'playlist' | 'episode'
        id     : el id de la URL
        titulo : cómo quieres que aparezca en la lista

   Ejemplos: cámbialos por las canciones reales que tú
   quieres dedicarle a Sol.
   ===================================================== */

/* eslint-disable */
window.CANCIONES = [
  {
    tipo:   'track',
    id:     '3n3Ppam7vgaVa1iaRUc9Lp',       // Mr. Brightside — placeholder, reemplaza
    titulo: '♡ Nuestra canción (cámbiame)'
  },
  {
    tipo:   'track',
    id:     '0tgVpDi06FyKpA1z0VMD4v',       // Perfect — placeholder, reemplaza
    titulo: 'La que bailamos'
  },
  {
    tipo:   'playlist',
    id:     '37i9dQZF1DX50QitC6Oqtn',       // "Love Pop" de Spotify — funciona por defecto
    titulo: 'Playlist romántica'
  },
  {
    tipo:   'playlist',
    id:     '37i9dQZF1DWYp5ynvrh2hV',       // "Boleros Románticos" — funciona por defecto
    titulo: 'Boleros para ti'
  }
];