import { ArtisanProfile } from '../models/artisan-profile.model';
import { Artwork } from '../models/artwork.model';

const portrait = (folder: string): string =>
  `/images/PRUEBA DE APTITUD CARROZA/${folder}/1 RETRATO.JPG`;

const carrozaFolders: Record<number, string> = {
  1: '1 OSCAR YOVANNY ACUNTAR TOVAR',
  2: '2 JORGE HERNANDO FREYRE ANDRADE',
  3: '3 ANTHONY MATEO ZARAMA  SANTACRUZ',
  4: '4 JAIRO ANDRES DIAZ YARPAZ',
  5: '5 GERARDO LEONARDO RAMOS MENA',
  6: '6 CARLOS RIBERT INSUASTY RUIZ',
  7: '7 FABIAN ARTURO RUANO',
  9: '9 MIACHEL STHEPHAN DELGADO PAZ',
  10: '10 NEYDER MUSS INSUASTY OJEDA',
  11: '11 JORGE ARTURO DIAZ OBANDO',
  12: '12 HARVEY NICOLAS BASTIDAS PATIÑO',
  13: '13 CARLOS ALBERTO MENA RODRIGUEZ',
  14: '14 LUIS FERNANDO VILLAREAL BASTIDAS',
  15: '15 HOLMAN DARIO CABRERA PASPUR',
  16: '16 LEONARD AUGUSTO ZARAMA CARDONA',
  18: '18 LUIS ALBERTO ERASO ARGOTI',
  19: '19 JOSE ALIRIO OBANDO MARMOL',
  20: '20 ALBERT RAHOMIR TORO CORONEL',
  21: '21 OSCAR FERNANDO RUANO LUNA',
  22: '22 CARLOS ALBERTO CHICAIZA CHICAIZA',
};

const carrozaPhotos = (id: number): string[] => {
  const folder = carrozaFolders[id];

  return [1, 2, 3].map(
    (photoNumber) => `/images/Carroza/${folder}/${photoNumber}.JPG`,
  );
};

const createProfile = (
  id: number,
  name: string,
  proposal: string,
  description: string,
  folder: string,
  works: string[],
): ArtisanProfile => {
  return {
    id,
    name,
    proposal,
    description,
    image: portrait(folder),
    photos: carrozaPhotos(id),
    works,
    year: 2027,
  };
};

export const ARTISAN_PROFILES: ArtisanProfile[] = [
  createProfile(1, 'Oscar Yovanny Ascuntar Tobar', 'Resilientes', 'Homenaje a los maestros que han mantenido vivo el Carnaval de Negros y Blancos, al barniz de Pasto y a las nuevas generaciones de artesanos.', '1 OSCAR YOVANNY ASCUNTAR TOBAR -  RESILIENTES', ['Alfonso Zambrano', 'José Eduardo Ordoñez', 'Guerreros de los bastidores', 'Mujeres guerreras', 'Niña con tocado de lobo']),
  createProfile(2, 'Jorge Hernando Freyre Andrade', 'Invasión', 'Reflexiona sobre cómo la tecnología y las máquinas transforman la Tierra, mientras la inteligencia artificial puede convertirse en una amenaza cuando se usa sin responsabilidad.', '2 JORGE HERNANDO FREYRE ANDRADE - INVACION', ['Mujer robótica con casco', 'Mascarones robóticos', 'Indígenas', 'Osos andinos', 'Jabalíes salvajes', 'Árbol con rostro']),
  createProfile(3, 'Anthony Mateo Zarama Santacruz', 'Epicentro', 'Exalta la conexión natural y social de los volcanes del sur de Colombia como parte de la identidad, la memoria y la interculturalidad de Nariño.', '3 ANTHONY MATEO ZARAMA SANTACRUZ - EPICENTRO', ['Taita Galeras', 'Doña Juana', 'Volcán Chiles', 'Cerro Negro', 'Taita Azufral', 'Mamá Cumbal']),
  createProfile(4, 'Jairo Andres Diaz Yarpaz', 'Lo que el pueblo canta y baila', 'Homenaje a la música nariñense como expresión de memoria, identidad y diversidad cultural. La carroza reúne canciones, autores y agrupaciones de distintas épocas.', '4 JAIRO ANDRES DIAZ YARPAZ - LO QUE EL PUEBLO CANTA Y BAILA', ['Máscara de calavera', 'Medio cuerpo de mujer', 'Bastidores con cuyes', 'Ipolito Jojoa', 'Chato Guerrero', 'Enrique Peña Nieto']),
  createProfile(5, 'Gerardo Leonardo Ramos Mena', 'Abrazo de la Pachamama', 'Reflexiona sobre la relación entre el ser humano y la naturaleza frente a la crisis ambiental, usando el jaguar, el dragón, los ecosistemas marinos y la Pachamama como símbolos.', '5 GERARDO LEONARDO RAMOS MENA - ABRAZO DE LA PACHA MAMA', ['Jaguar con tocado de dragón', 'Máscara en forma de árbol', 'Ecosistema marino', 'Delfín y tortuga', 'Eclipse andino']),
  createProfile(6, 'Carlos Ribert Insuasty Ruiz', 'Hecho a mano', 'Celebra el oficio artesanal y la memoria del Carnaval mediante máscaras, música, barniz de Pasto, caminos ancestrales y escenas de la vida tradicional.', '6 CARLOS RIBERT INSUASTY RUIZ - HECHO A MANO', ['Máscaras del Carnaval', 'Grupo musical de marimba', 'Instrumentos musicales', 'Puentes del camino del Inca', 'Chiva tradicional', 'Brazo biónico']),
  createProfile(7, 'Fabian Arturo Ruano', 'Esencia', 'Una composición fantástica que reúne imaginarios indígenas, animales, danza y color para representar la fuerza de las raíces culturales del Carnaval.', '7 FABIAN ARTURO RUANO - ESENCIA', ['Cabeza de dragón', 'Duende', 'Rostros de mujeres indígenas', 'Pareja de danzantes', 'Mujer campesina', 'Músicos campesinos']),
  createProfile(9, 'Miachel Sthephan Delgado Paz', 'Escalera al Cielo', 'Recorrido simbólico entre lo espiritual, la historia y la arquitectura andina, con referencias a Las Lajas, personajes históricos y criaturas fantásticas.', '9 MICHAEL STHEPHAN DELGADO PAZ - ESCALERA AL CIELO', ['Caballos', 'Ángeles con escalinatas', 'Pasaje Corazón de Jesús', 'Iglesia de Las Lajas', 'Personajes históricos', 'Dragones campanarios']),
  createProfile(10, 'Neyder Muss Insuasty Ojeda', 'Despierta', 'Invita a despertar frente a la riqueza natural y cultural de Nariño, representada a través de fauna, personajes y símbolos de la región.', '10 NEYDER MUSS INSUASTY OJEDA - DESPIERTA', ['Rostro de mujer', 'Serpiente principal', 'Iglesias', 'Zorro', 'Armadillo', 'Fauna andina']),
  createProfile(11, 'Jorge Arturo Diaz Obando', '¡Somos Fuerza, Juntos Renacemos!', 'Representa la fuerza colectiva, la memoria familiar y la capacidad de renacer a través de una composición de guerreros, animales, música y escenas sociales.', '11 JORGE ARTURO DIAZ OBANDO - SOMOS FUERZA, JUNTOS RENACEMOS', ['Rostro guerrero', 'Caballos', 'Ruinas arquitectónicas', 'Ángeles y diablos', 'Escena familiar', 'Árbol de la vida']),
  createProfile(12, 'Harvey Nicolas Bastidas Patiño', 'Espíritu Africano', 'Reconoce la herencia afrodescendiente y su aporte cultural mediante animales, personajes y símbolos de identidad, encuentro y diversidad.', '12 HARVEY NICOLAS BASTIDAS PATIÑO ESPIRITU AFRICANO', ['Elefante principal', 'Niña afrodescendiente', 'Niño blanco', 'Leonas y antílopes', 'Brujo con tocado de gorila', 'Rinoceronte y máscaras']),
  createProfile(13, 'Carlos Alberto Mena Rodriguez', 'ReyMundo', 'Construye un mundo fantástico donde conviven la fauna, la Pachamama y personajes mitológicos para hablar de equilibrio y biodiversidad.', '13 CARLOS ALBERTO MENA RODRIGUEZ - REYMUNDO', ['Lobo principal', 'Lobos laterales', 'Duende Reymundo', 'Pachamama', 'Fauna marina', 'Fauna terrestre']),
  createProfile(14, 'Luis Fernando Villarreal Bastidas', 'Aroma', 'Homenaje a la cultura cafetera y campesina, sus oficios, paisajes, personajes y elementos de abundancia que forman parte de la identidad regional.', '14 LUIS FERNANDO VILLAREAL BASTIDAS - AROMA', ['Pareja campesina', 'Planta del café', 'Arriero y mula', 'Vivienda campesina', 'Personajes de distintas culturas', 'Jeep cargado de café']),
  createProfile(15, 'Holman Dario Cabrera Paspur', 'Colombia, Tierra Querida', 'Celebración de la diversidad colombiana a través de símbolos naturales, culturales y regionales que conectan el campo, la memoria y el Carnaval.', '15 HOLMAN DARIO CABRERA PASPUR - COLOMBIA, TIERRA QUERIDA', ['Niño en un jaguar', 'Máscaras', 'Cabeza de oso andino', 'Relieve cafetero', 'Silletero colombiano', 'Danzante del Pacífico']),
  createProfile(16, 'Leonard Augusto Zarama Cardona', 'Paraiso de Colores', 'Una propuesta llena de color que mezcla personajes fantásticos, imaginarios indígenas, animales y composiciones de gran formato.', '16 LEONARD AUGUSTO ZARAMA CARDONA - PARAISO DE COLORES', ['Mujer jaguar', 'Genio de los colores', 'Madona', 'Composiciones de personajes', 'Bastidores laterales', 'Relieves coloridos']),
  createProfile(18, 'Luis Alberto Erazo Argoti', 'De la Mancha al Sur', 'Traslada el universo de Don Quijote al sur de Colombia, mezclando sus personajes con la vida, los oficios y la imaginación del pueblo nariñense.', '18 LUIS ALBERTO ERAZO ARGOTI -DE LA MANCHA AL SUR', ['Sancho Panza', 'Don Quijote de la Mancha', 'Rocinante', 'Figuras del pueblo', 'Dulcinea', 'Cuyes y aves decorativas']),
  createProfile(19, 'Jose Alirio Obando Marmol', 'Sonsureño', 'Homenaje a la música del sur y a sus protagonistas, con campesinos, instrumentos, danzas y escenas que celebran la memoria musical de Nariño.', '19 JOSE ALIRIO OBANDO MARMOL - SONSUREÑO', ['Campesino con guitarra', 'Templo de Santiago', 'Calle del Colorado', 'Piano', 'Músicos con saxofón y congas', 'Mujeres afro con marimba']),
  createProfile(20, 'Albert Rahomir Toro Coronel', 'Legado', 'Recupera símbolos ancestrales y naturales para hablar de la memoria, la biodiversidad y la transmisión del conocimiento entre generaciones.', '20 ALBERT RAHOMIR TORO CORONEL - LEGADO', ['Árbol ancestral', 'Calavera', 'Jaguar', 'Rostros indígenas', 'Monos y tucanes', 'Pachamama y colibríes']),
  createProfile(21, 'Oscar Fernando Ruano Luna', 'La máquina del tiempo - Un viaje de sueños', 'Una aventura fantástica sobre el viaje en el tiempo, representada por una máquina llena de engranajes, viajeros, genios y criaturas aladas.', '21 OSCAR FERNANDO RUANO LUNA - LAMAQUINA DEL TIEMPO UN VIAJE DE SUEÑOS', ['Niño piloto', 'Genio masculino', 'Genio femenino', 'Niño sobre tigre', 'Figura femenina con brújula', 'Niño viajero sobre colibrí']),
  createProfile(22, 'Carlos Alberto Chicaiza Chicaiza', 'Alquimia (cien años de Carnaval)', 'Evoca cien años de Carnaval mediante alquimistas, magia, memoria y personajes que transforman la tradición en una celebración del futuro.', '22 CARLOS ALBERTO CHICAIZA CHICAIZA - ALQUIMIA (CIEN AÑOS DE CARNAVAL)', ['Alquimista mayor', 'Cronista del grimorio', 'Hadas pequeñas', 'Serpientes', 'Cacique del origen', 'Mago Merlín y hechicera']),
];

export const CARROZAS: Artwork[] = ARTISAN_PROFILES.map((profile) => ({
  id: profile.id,
  title: profile.proposal,
  author: profile.name,
  category: 'carroza',
  image: profile.photos[0],
  likes: 0,
  description: profile.description,
}));

export const ARTISTS: Artwork[] = ARTISAN_PROFILES.map((profile) => ({
  id: profile.id,
  title: profile.name,
  author: profile.proposal,
  category: 'artist',
  image: profile.image,
  likes: 0,
}));
