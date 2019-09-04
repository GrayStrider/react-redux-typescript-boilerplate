const sum = (numbers: number[]): number =>
  numbers.reduce((prev, current) => prev + current)

const range = (length: number): number[] =>
  [...Array(length + 1).keys()]

console.log(sum(range(12)))

interface Student {
  name: string
  grade: number
}

const students: Student[] = [
  { name: 'Nick', grade: 10 },
  { name: 'John', grade: 15 },
  { name: 'Julia', grade: 19 },
  { name: 'Nathalie', grade: 9 }
]

const aboveTenSum = students
  .map(student => student.grade)
  .filter(grade => grade >= 10)
  .reduce((acc, curr) => acc + curr, 0)

console.log(aboveTenSum)