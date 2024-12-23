/* eslint-disable max-len */
export class Disease {
  name: string;
  image: string;
  code: string;
  description: string;

  constructor(name: string, image: string, code: string, description: string) {
    this.name = name;
    this.image = image;
    this.code = code;
    this.description = description;
  }
}

export const testDisiases = [
  new Disease(
    'Корововирус',
    'corovovirus.jpg',
    'A',
    'Пациента необходимо поместить в темное и теплое место, обеспечить обильное питье и покой'
  ),
  new Disease(
    'Кровь королей',
    'blood_of_kings.jpg',
    'B',
    'Лечится переливанием крови от здорового донора. Говорят, у гномов есть технологии, которые могут сделать фильтр, способный очистить кровь от заразы.'
  ),
  new Disease(
    'Скверные черви',
    'bad_worms.jpg',
    'C',
    'Болезнь вызвана паразитами, поражающими пищевод и печень больного. На ранних стадиях паразитов можно вывести обильными крепкими отварами из целебных трав. На поздних стадиях требуется операция по удалению паразитов и их следов в организме.'
  ),
];
