const cal = require('./cal.js');

test('1 + 2 = 3', () => {
    expect(cal(1, 2, 0)).toBe(3);
});
test('5 - 2 = 3', () => {
    expect(cal(5, 2, 1)).toBe(3);
});
test('1 * 2 = 2', () => {
    expect(cal(1, 2, 2)).toBe(2);
});
test('4 / 2 = 2', () => {
    expect(cal(4, 2, 3)).toBe(2);
});