// Список курсов
var courses = [
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
var requiredRange1 = [null, 200];
var requiredRange2 = [100, 350];
var requiredRange3 = [200, null];
var isRangeToInfinity = function (num, _a) {
    var from = _a[0], until = _a[1];
    return until === null ? true : until >= num;
};
var isRange = function (_a, _b) {
    var reqFrom = _a[0], reqUntil = _a[1];
    var from = _b[0], until = _b[1];
    if (from === null && until === null)
        return true;
    if (until === null)
        return (from ? from : 0) <= reqUntil;
    if (from === null)
        return until >= reqFrom;
    return ((from >= reqFrom && from <= reqUntil) ||
        (until >= reqFrom && until <= reqUntil));
};
var filterByPrice = function (courses, _a) {
    var from = _a[0], until = _a[1];
    if (from === null && until === null)
        return courses; // Первый случай
    return until === null
        ? courses.filter(function (_a) {
            var prices = _a.prices;
            return isRangeToInfinity(from ? from : 0, prices);
        }) // Второй случай
        : courses.filter(function (_a) {
            var prices = _a.prices;
            return isRange([from ? from : 0, until], prices);
        }); // Третий случай
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
