export {}

interface Part {
  id: number;
  name: string;
  subparts?: Part[];
  updatePart(newName: string): void;
}

const Options: Record<number, number> = { '33': 4, 10_10: 54.3 /*test: 'str'*/ }
// coerces string number to number
const Options2: Record<string, number> = { 3: 4, 10_10: 54.3 }
// coerces number to string
const Options3: Record<string, number[]> = { 10: [1, 2], 'string': [1, 2, 3] }

/**
 * add or remove modifier of a mapped type,
 * that's how Required and Partial works
 */
// const required: Required<Part> = {}
// all are required

const partial: Partial<Part> = { name: 'namestr' }
// all are optional

type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] };  // Remove readonly and ?
type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] };  // Add readonly and ?
type Foo = { a?: string };  // Same as { a?: string | undefined }
type Bar = Required<Foo>;  // Same as { a: string }

type T44 = Pick<Part, 'id' | 'name'>
const t44: T44 = { id: 30, name: 'namestr' }

type T45 = Omit<Part, 'updatePart'>
const t45: T45 = { name: 'names', id: 40, subparts: [] }

const readonlyvar: Partial<Readonly<Part>> = { name: 'namestr' }
// readonlyvar.name = ''
// readonlyvar.id = 10 // errors

type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;
// same as T, but with all U values removed
// "b" | "d"
type T02 = Exclude<string | number | (() => void), Function>;
// string | number

type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;
// "a" | "c"
// return those types included in T that are assignable to U
type T03 = Extract<string | number | (() => void), Function>;
// () => void

type T04 = NonNullable<string | number | undefined>;
// string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;

// (() => string) | string[]

function f1(s: string) {
  return { a: 1, b: s }
}

class C {
  x = 0
  y = 0
}

type T10 = ReturnType<() => string>;
// string
type T11 = ReturnType<(s: string) => void>;
// void
type T12 = ReturnType<(<T>() => T)>;
// {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;
// number[]
type T14 = ReturnType<typeof f1>;
// { a: number, b: string }
type T15 = ReturnType<any>;
// any
type T16 = ReturnType<never>;
// any
// type T17 = ReturnType<string>;
// Error
// type T18 = ReturnType<Function>;
// Error

type T20 = InstanceType<typeof C>;
// C
type T21 = InstanceType<any>;
// any
type T22 = InstanceType<never>;
// any
// type T23 = InstanceType<string>;
// Error
// type T24 = InstanceType<Function>;
// Error

// tuple of types of parameters of given function
type FetchDataParams = Parameters<typeof fetchData>; // [number, string]
type IdType = FetchDataParams[0]; // number
function fetchData(id: number, filter: string) {}

function fetchDataLogged(...params: Parameters<typeof fetchData>) {
  console.log('calling fetchData')
  fetchData(...params)
}

const foo = (arg: number, arg2: string) => arg
const params: Parameters<typeof foo> =
  [20, 'strparam']

// const constrParams: ConstructorParameters = // for constructor parameters
