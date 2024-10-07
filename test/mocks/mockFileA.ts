import { functionB } from "./test/mocks/mockFileB";

const functionA = (x: number, y: string) => {
  console.log('Hello there');

  const response =  functionB(x, 3);
  return response;
}
