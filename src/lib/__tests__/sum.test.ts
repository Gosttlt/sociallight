import sum from '../sum'

describe('функция sum', () => {
  test('Возвращает правильное число', () => {
    expect(sum(1, 1)).toBe(2)
    expect(sum(1, 10)).toBe(11)
    expect(sum(3, 9)).toBe(12)
  })
})
