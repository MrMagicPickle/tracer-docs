import { functionB } from "./mockFileB";

const functionA = (x: number, y: string) => {
  console.log('Hello there');

  const response =  functionB(x, 3);
  return response;
}