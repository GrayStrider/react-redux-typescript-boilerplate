class Queue<T> {
  private data = [] as any
  push(item: T) { this.data.push(item); }
  pop(): T | undefined { return this.data.shift(); }
}

/** Sample usage */
const queue = new Queue<number>();
queue.push(0);
// queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: GenericIdentityFn = identity;


class GenericNumber<T> {
  zeroValue!: T
  add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };


let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "null_";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));


interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}


function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.


function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
function prop2<T>(obj: T, key: keyof T) {
  return obj[key];
}

let o = {
  p1: 0,
  p2: '',
  p3: []
}

let v = prop(o, 'p1') // is number, K is of type 'p1'
let v2 = prop2(o, 'p1') // is number | string | any[], no extra info is captured
console.log(v)
console.log(v2)


function reverse<T>(items: T[]): T[] {
  const toreturn: T[] = [] // god
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3]
let reversed = reverse(sample)
console.log(reversed); // 3,2,1

// Safety!
// reversed[0] = '1';     // Error!
// reversed = ['1', '2']; // Error!

reversed[0] = 1;       // Okay
reversed = [1, 2];     // Okay


// const getJSON = <T>(config: {
//   url: string,
//   headers?: { [key: string]: string },
// }): Promise<T> => {
//   const fetchConfig = ({
//     method: 'GET',
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     ...(config.headers || {})
//   });
//   return fetch(config.url, fetchConfig)
//     .then<T>(response => response.json()); // use node-fetch
// }
//
// type LoadUsersResponse = {
//   users: {
//     name: string;
//     email: string;
//   }[];  // array of user objects
// }
// function loadUsers() {
//   return getJSON<LoadUsersResponse>({ url: 'https://example.com/users' });
// }
//
// loadUsers()


class Car {
  label: string = 'Generic Car'
  numWheels: Number = 4
  static horn() {
    return "beep beep!"
  }
}

class Truck extends Car {
  label = 'Truck'
  numWheels = 18
}

class Vespa extends Car {
  label = 'Vespa'
  numWheels = 2
}


const washCar = <T extends Car>(car: T): T => {
  console.log(`Received a ${car.label} in the car wash.`)
  console.log(`Cleaning all ${car.numWheels} tires.`)
  console.log('Beeping horn -', Car.horn())
  console.log('Returning your car now')
  return car
}

const myVespa = new Vespa()
const myTruck = new Truck()
const car = new Car()

washCar(myVespa)
washCar(myTruck)
washCar(car)
