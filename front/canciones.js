/* =====================================================
   canciones.js
   Lista de canciones de YouTube para Sol.
   
   COMO AGREGAR CANCIONES:
   1. Ve a YouTube y busca la cancion
   2. Copia la URL (ej: https://www.youtube.com/watch?v=ABC123xyz)
   3. El ID es la parte despues de "watch?v=" (ABC123xyz)
   4. Agregalo abajo siguiendo el formato
   
   EJEMPLO:
   { titulo: 'Nombre -- Artista', videoId: 'ABC123xyz' },
   ===================================================== */

/* eslint-disable */
window.CANCIONES = [
  // Gustavo Cerati
  { titulo: 'Cactus -- Gustavo Cerati', videoId: 'YLdD0W1eSZk' },
  { titulo: 'Lago en el Cielo -- Gustavo Cerati', videoId: 'MEHn16TE-_s' },
  
  // Soda Stereo
  { titulo: 'Persiana Americana -- Soda Stereo', videoId: 'HGQsHjRB7Qs' },
  { titulo: 'En la Ciudad de la Furia -- Soda Stereo', videoId: 'xAZH28KpK1E' },
  
  // Ariana Grande
  { titulo: '7 rings -- Ariana Grande', videoId: 'QYh6mYIJG2Y' },
  { titulo: 'thank u, next -- Ariana Grande', videoId: 'gl1aHhXnN1k' },
  
  // Agrega mas canciones aqui:
  // { titulo: 'Nombre de la cancion -- Artista', videoId: 'ID_DEL_VIDEO' },
];
