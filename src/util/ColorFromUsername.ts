import {
  rajah,
  spaceCadet,
  policeBlue,
  blueJeans,
  richBlack,
  calPolyPomonaGreen,
  lincolnGreen,
} from "@/styles/colors";

const colorFromUsername = (username: string) => {
  const secondPart = username.split('.')[1].toUpperCase();
  const alphabet: Record<string, number> = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
    'I': 9,
    'J': 10,
    'K': 11,
    'L': 12,
    'M': 13,
    'N': 14,
    'O': 15,
    'P': 16,
    'Q': 17,
    'R': 18,
    'S': 19,
    'T': 20,
    'U': 21,
    'V': 22,
    'W': 23,
    'X': 24,
    'Y': 25,
    'Z': 26,
  };

  let sum = secondPart;
  do {
    sum = sum.split('')
      .reduce(
        (accumulator: number, currentValue: string) => {
          return accumulator + (alphabet[currentValue] ?? 0);
        },
        0
      ).toString();
  } while (Number(sum) > 9);

  let color = '';

  switch(Number(secondPart.replace(/\D+/, '')[0]) % 7) {
    case 0:
      color = policeBlue[Number(sum) * 100];
      break;
    case 1:
      color = spaceCadet[Number(sum) * 100];
      break;
    case 2:
      color = rajah[Number(sum) * 100];
      break;
    case 3:
      color = blueJeans[Number(sum) * 100];
      break;
    case 4:
      color = richBlack[Number(sum) * 100];
      break;
    case 5:
      color = calPolyPomonaGreen[Number(sum) * 100];
      break;
    case 6:
      color = lincolnGreen[Number(sum) * 100];
      break;
  }

  return color;
}

export default colorFromUsername;
