/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '💀',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
  };
  
  const maps = [];

  
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    XXXXXXX--O
    X--XXX--XX
    XX-----XXX
    X--XXX-XXX
    X-XXX--XXX
    X--XXX-XXX
    XX--XX--XX
    XXI-XX--XX
    XXX----XX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
  XXXXXXXXXX
  XX-IXXXXXX
  XX-XXXXXXX
  XX--XXXXXX
  XXX--XXXXX
  XXXX--XXXX
  XXXXX--XXX
  XXXXXX--XX
  XXXXXXX--X
  XXXXXXXX-O
`);
maps.push(`
  XXXXXXXXXX
  XIXXXXXXIX
  X-XXXXXX-X
  X-XXXXXX-X
  X-XXXXXX-X
  X--------X
  XXXX-XXXXX
  XXXX-XXXXX
  XXXX-XXXXX
  XXXXOXXXXX
`);maps.push(`
  XXXXXXXXXX
  XXXXXXXXIX
  XXXXXXXX-X
  XXXX---X-X
  XXXXOX-X-X
  XXXXXX-X-X
  XX-----X-X
  XX-XXXXX-X
  XX-------X
  XXXXXXXXXX
`);