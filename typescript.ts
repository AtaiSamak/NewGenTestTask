type Price = [number | null, number | null];

type Course = {
    name: string;
    prices: Price;
};

// Список курсов
let courses: Course[] = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1: Price = [null, 200];
let requiredRange2: Price = [100, 350];
let requiredRange3: Price = [200, null];

const isRangeToInfinity = (num: number, [from, until]: Price) =>
    until === null ? true : until >= num;

const isRange = ([reqFrom, reqUntil]: number[], [from, until]: Price) => {
    if (from === null && until === null) return true;
    if (until === null) return from <= reqUntil;
    if (from === null) return until >= reqFrom;
    return (
        (from >= reqFrom && from <= reqUntil) ||
        (until >= reqFrom && until <= reqUntil)
    );
};

const filterByPrice = (courses: Course[], [from, until]: Price) => {
    if (from === null && until === null) return courses; // Первый случай
    if (until === null)
        return courses.filter(({ prices }) => isRangeToInfinity(from, prices)); // Второй случай
    return courses.filter(({ prices }) => isRange([from, until], prices)); // Третий случай
};

console.log(filterByPrice(courses, requiredRange1));
console.log(filterByPrice(courses, requiredRange2));
console.log(filterByPrice(courses, requiredRange3));

// У на есть три случая исхода событий:

// Первый случай - когда у нас диапазон пользователя от нуля до бесконечности [null, null]
// В этом случае мы возвращаем массив со всеми данными без фильтрации.

// Второй случай - у диапазона пользователя есть начало и нет конца [100, null]
// В этом случае я использую функцию isRangeToInfinity для фильтрации:
// Возвращает true:
// 1) если диапазон курса не имеет конца [500, null](т.к. пользователь указал что нет ограничения)
// 2) диапазон курса имеет конец тогда начало,
// которое указал пользователь должен быть в диапазоне курса
// [50, 99] = [100, null] => false

// Третий случай - диапазон(пользователя) указан точно [100, 200] т.е. есть начало и конец
// Тут я использую функция isRange для фильтрации:
// Возвращает true:
// 1) если диапазон курса не имеет начало и конца [null, null]
// 2) диапазон курса имеет начало и не имеет конца [100, null] тогда начало(100),
// должен входить в диапазон пользователя
// 3) диапазон курса не имеет начало, но имеет конец [null, 300] тогда конец(300),
// должен входить в диапазон пользователя
// !!! Можно было без этой проверки, так как начало есть(ее можно поменять на 0)
// 4) И последний - просто проверка начала и конца диапазона курса, что один из них
// входит в диапазон пользователя
