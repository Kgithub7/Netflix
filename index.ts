let age: number = 25;
let hobby: string = "soccer";
let isAdult: boolean = true;
let fruit: any = 4;
fruit = "fe";

let fruits: any[] = [4, "vd"];
let numArray: number[][];

let employee: [number, string] = [3, "d"];
let employees: [number, string][] = [
  [2, "ds"],
  [3, "edw3"],
];

let object: { name: string; type: number } = { name: "dd", type: 4 };

type car = { brand: string; year: number };

let car1: car = { brand: "dsa", year: 3 };

interface car2 {
  brand: string;
  year: number;
}

let newCar: car2 = {
  brand: "ds",
  year: 4,
};

let x: string | number = ""

type occupation = "employed" | "student"
let occ: occupation = "employed"

let y: any = "r"
y = <number>33
y = "fd"

function add(x: number, y: number) {
    return x+y
}
add(3,5)