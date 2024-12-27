export interface PathologicCard {
  layer: string;
  symptom: string[];
  id: string;
}

export const symptomsList = ['А (4)', 'Б (4)', 'В (4)', 'Г (3)', 'Д (5)', 'E (5)', 'Ж (5)'];
export const layersList = ['1', '2', '3'];
//symptom.match(/\((\d+)\)/)
export const getRandomPatyhologicCard = () => {
  const layer = layersList[Math.floor(Math.random() * layersList.length)];
  const symptom = symptomsList[Math.floor(Math.random() * symptomsList.length)].match('/^[A-Za-zА-Яа-яЁё]+/');
  const cardNumber = Math.floor(Math.random() * 30) + 1;

  return `${layer}${symptom}${cardNumber}`;
};
