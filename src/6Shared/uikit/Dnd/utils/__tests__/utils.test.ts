import {
  toEndinOneCurrent,
  inOneContainer,
  getDataOtherCard,
  toEndAnotherContainer,
} from '../utils'

describe('Функция inOneContainer для сортировки и смены ордеров в одном контейнере ', () => {
  test('Взял первую карту, положил в начало последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: false,
        lastOverCard: {id: '4', order: 4, name: '4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '0', order: 3, name: '0'},
        {id: '4', order: 4, name: '4'},
      ],
      toCard: null,
    })
  })
  test('Взял первую карту,положил в конец последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: true,
        lastOverCard: {id: '4', order: 4, name: '4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
        {id: '0', order: 4, name: '0'},
      ],
      toCard: null,
    })
  })
  test('Взял вторую карту, положил в начало последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: false,
        lastOverCard: {id: '4', order: 4, name: '4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '1', order: 3, name: '1'},
        {id: '4', order: 4, name: '4'},
      ],
      toCard: null,
    })
  })

  test('Взял вторую карту, положил в конец последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: true,
        lastOverCard: {id: '4', order: 4, name: '4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
        {id: '1', order: 4, name: '1'},
      ],
      toCard: null,
    })
  })

  test('Взял первую карту, положил в начало пред последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: false,
        lastOverCard: {id: '3', order: 3, name: '3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '0', order: 2, name: '0'},
        {id: '3', order: 3, name: '3'},
        {id: '4', order: 4, name: '4'},
      ],
      toCard: null,
    })
  })

  test('Взял первую карту, положил в конец пред последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: true,
        lastOverCard: {id: '3', order: 3, name: '3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '0', order: 3, name: '0'},
        {id: '4', order: 4, name: '4'},
      ],
      toCard: null,
    })
  })

  test('Взял вторую карту, положил в начало пред последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: false,
        lastOverCard: {id: '3', order: 3, name: '3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '3', order: 3, name: '3'},
        {id: '4', order: 4, name: '4'},
      ],
      toCard: null,
    })
  })
  test('Взял вторую карту, положил в конец пред последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: true,
        lastOverCard: {id: '3', order: 3, name: '3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '1', order: 3, name: '1'},
        {id: '4', order: 4, name: '4'},
      ],
      toCard: null,
    })
  })

  //   reverse
  test('reverse Взял первую карту, положил в начало последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: false,
        lastOverCard: {id: '0', order: 0, name: '0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 4, name: '3'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '4', order: 1, name: '4'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: null,
    })
  })
  test('reverse Взял первую карту,положил в конец последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: true,
        lastOverCard: {id: '0', order: 0, name: '0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 4, name: '3'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '0', order: 1, name: '0'},
        {id: '4', order: 0, name: '4'},
      ],
      toCard: null,
    })
  })
  test('reverse Взял вторую карту, положил в начало последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: false,
        lastOverCard: {id: '0', order: 0, name: '0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 4, name: '4'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '3', order: 1, name: '3'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: null,
    })
  })

  test('reverse Взял вторую карту, положил в конец последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: true,
        lastOverCard: {id: '0', order: 0, name: '0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 4, name: '4'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '0', order: 1, name: '0'},
        {id: '3', order: 0, name: '3'},
      ],
      toCard: null,
    })
  })

  test('reverse Взял первую карту, положил в начало ПРЕД последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: false,
        lastOverCard: {id: '1', order: 1, name: '1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 4, name: '3'},
        {id: '2', order: 3, name: '2'},
        {id: '4', order: 2, name: '4'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: null,
    })
  })

  test('reverse Взял первую карту, положил в конец ПРЕД последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: true,
        lastOverCard: {id: '1', order: 1, name: '1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 4, name: '3'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '4', order: 1, name: '4'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: null,
    })
  })

  test('reverse Взял вторую карту, положил в начало ПРЕД последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: false,
        lastOverCard: {id: '1', order: 1, name: '1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 4, name: '4'},
        {id: '2', order: 3, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: null,
    })
  })
  test('reverse Взял вторую карту, положил в конец ПРЕД последней карты', () => {
    expect(
      inOneContainer({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: true,
        lastOverCard: {id: '1', order: 1, name: '1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 4, name: '4'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '3', order: 1, name: '3'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: null,
    })
  })

  test('Ордеры всегда должны начинатся от нуля до cards.length', () => {
    // сели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5
    expect(
      inOneContainer({
        cards: [
          {id: 'asd', order: 10, name: 'asd'},
          {id: 'gawga', order: 25, name: 'gawga'},
          {id: 'gwahaw', order: 111, name: 'gwahaw'},
          {id: '3fasf', order: 2133, name: '33fasf'},
          {id: 'gas', order: 41251, name: 'gas'},
        ],
        dragCard: {id: 'gawga', order: 25, name: 'gawga'},
        isNextPosition: true,
        lastOverCard: {id: '3fasf', order: 2133, name: '33fasf'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'asd', order: 0, name: 'asd'},
        {id: 'gwahaw', order: 1, name: 'gwahaw'},
        {id: '3fasf', order: 2, name: '33fasf'},
        {id: 'gawga', order: 3, name: 'gawga'},
        {id: 'gas', order: 4, name: 'gas'},
      ],
      toCard: null,
    })
  })

  test('reverse Ордеры всегда должны начинатся от cards.length до нуля', () => {
    // сели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5
    expect(
      inOneContainer({
        cards: [
          {id: 'gas', order: 41251, name: 'gas'},
          {id: '3fasf', order: 2133, name: '33fasf'},
          {id: 'gwahaw', order: 111, name: 'gwahaw'},
          {id: 'gawga', order: 25, name: 'gawga'},
          {id: 'asd', order: 10, name: 'asd'},
        ],
        dragCard: {id: '3fasf', order: 2133, name: '33fasf'},
        isNextPosition: true,
        lastOverCard: {id: 'gawga', order: 25, name: 'gawga'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'gas', order: 4, name: 'gas'},
        {id: 'gwahaw', order: 3, name: 'gwahaw'},
        {id: 'gawga', order: 2, name: 'gawga'},
        {id: '3fasf', order: 1, name: '33fasf'},
        {id: 'asd', order: 0, name: 'asd'},
      ],
      toCard: null,
    })
  })
})

describe('Функция toEndinOneCurrent для сортировки и смены ордеров в одном контейнере когда сброс происходит в пустое место контейнера', () => {
  test('Взял первую карту', () => {
    expect(
      toEndinOneCurrent({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
        {id: '0', order: 4, name: '0'},
      ],
      toCard: null,
    })
  })
  test('Взял вторую карту', () => {
    expect(
      toEndinOneCurrent({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
        {id: '1', order: 4, name: '1'},
      ],
      toCard: null,
    })
  })
  test('Взял последнюю карту', () => {
    expect(
      toEndinOneCurrent({
        cards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '1', order: 1, name: '1'},
        {id: '2', order: 2, name: '2'},
        {id: '3', order: 3, name: '3'},
        {id: '4', order: 4, name: '4'},
      ],
      toCard: null,
    })
  })
  test('Ордеры всегда должны начинатся от нуля до cards.length', () => {
    // сели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5

    expect(
      toEndinOneCurrent({
        cards: [
          {id: 'afska', order: 12, name: 'afska'},
          {id: 'agaqy', order: 123, name: 'agaqy'},
          {id: 'klgmakmg', order: 4322, name: 'klgmakmg'},
          {id: 'fjkwnakjf', order: 63233, name: 'fjkwnakjf'},
          {id: 'kmgawlogaw', order: 242344, name: 'kmgawlogaw'},
        ],
        dragCard: {id: 'agaqy', order: 123, name: 'agaqy'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'afska', order: 0, name: 'afska'},
        {id: 'klgmakmg', order: 1, name: 'klgmakmg'},
        {id: 'fjkwnakjf', order: 2, name: 'fjkwnakjf'},
        {id: 'kmgawlogaw', order: 3, name: 'kmgawlogaw'},
        {id: 'agaqy', order: 4, name: 'agaqy'},
      ],
      toCard: null,
    })
  })

  test('reverse Взял первую карту', () => {
    expect(
      toEndinOneCurrent({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 4, name: '3'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '0', order: 1, name: '0'},
        {id: '4', order: 0, name: '4'},
      ],
      toCard: null,
    })
  })
  test('reverse Взял вторую карту', () => {
    expect(
      toEndinOneCurrent({
        cards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 4, name: '4'},
        {id: '2', order: 3, name: '2'},
        {id: '1', order: 2, name: '1'},
        {id: '0', order: 1, name: '0'},
        {id: '3', order: 0, name: '3'},
      ],
      toCard: null,
    })
  })
  test('reverse Ордеры всегда должны начинатся от cards.length до нуля', () => {
    // сели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5

    expect(
      toEndinOneCurrent({
        cards: [
          {id: 'kmgawlogaw', order: 242344, name: 'kmgawlogaw'},
          {id: 'fjkwnakjf', order: 63233, name: 'fjkwnakjf'},
          {id: 'klgmakmg', order: 4322, name: 'klgmakmg'},
          {id: 'agaqy', order: 123, name: 'agaqy'},
          {id: 'afska', order: 12, name: 'afska'},
        ],
        dragCard: {id: 'fjkwnakjf', order: 63233, name: 'fjkwnakjf'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'kmgawlogaw', order: 4, name: 'kmgawlogaw'},
        {id: 'klgmakmg', order: 3, name: 'klgmakmg'},
        {id: 'agaqy', order: 2, name: 'agaqy'},
        {id: 'afska', order: 1, name: 'afska'},
        {id: 'fjkwnakjf', order: 0, name: 'fjkwnakjf'},
      ],
      toCard: null,
    })
  })
})

describe('Функция getDataOtherCard для сортировки и смены ордеров в двух разных контейнерах', () => {
  test('Взял первую карту, поместил в начало последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: false,
        lastOverCard: {id: 't4', order: 4, name: 't4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: '0', order: 4, name: '0'},
        {id: 't4', order: 5, name: 't4'},
      ],
    })
  })
  test('Взял первую карту, поместил в конец последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: true,
        lastOverCard: {id: 't4', order: 4, name: 't4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: 't4', order: 4, name: 't4'},
        {id: '0', order: 5, name: '0'},
      ],
    })
  })
  test('Взял первую карту, поместил в начало ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: false,
        lastOverCard: {id: 't3', order: 3, name: 't3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: '0', order: 3, name: '0'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't4', order: 5, name: 't4'},
      ],
    })
  })
  test('Взял первую карту, поместил в конец ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        isNextPosition: true,
        lastOverCard: {id: 't3', order: 3, name: 't3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: '0', order: 4, name: '0'},
        {id: 't4', order: 5, name: 't4'},
      ],
    })
  })
  test('Взял вторую карту, поместил в начало последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: false,
        lastOverCard: {id: 't4', order: 4, name: 't4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: '1', order: 4, name: '1'},
        {id: 't4', order: 5, name: 't4'},
      ],
    })
  })
  test('Взял вторую карту, поместил в конец последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: true,
        lastOverCard: {id: 't4', order: 4, name: 't4'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: 't4', order: 4, name: 't4'},
        {id: '1', order: 5, name: '1'},
      ],
    })
  })
  test('Взял вторую карту, поместил в начало ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: false,
        lastOverCard: {id: 't3', order: 3, name: 't3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: '1', order: 3, name: '1'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't4', order: 5, name: 't4'},
      ],
    })
  })
  test('Взял вторую карту, поместил в конец ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
        isNextPosition: true,
        lastOverCard: {id: 't3', order: 3, name: 't3'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: '1', order: 4, name: '1'},
        {id: 't4', order: 5, name: 't4'},
      ],
    })
  })
  test('Ордеры всегда должны начинатся от нуля до fromCards.length и нуля до toCards.length', () => {
    // eсели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5
    expect(
      getDataOtherCard({
        fromCards: [
          {id: 'hersefs', order: 1, name: 'hersefs'},
          {id: 'hawhawa', order: 22, name: 'hawhawa'},
          {id: 'gwagaw', order: 333, name: 'gwagaw'},
          {id: 'wgagaga', order: 4444, name: 'wgagaga'},
          {id: 'adskgmalk', order: 55555, name: 'adskgmalk'},
        ],
        toCards: [
          {id: 'xczsdasd', order: 22, name: 'xczsdasd'},
          {id: 'ggwwqqewa', order: 333, name: 'ggwwqqewa'},
          {id: 'hrhhddr', order: 444, name: 'hrhhddr'},
          {id: 'gwagadss', order: 5555, name: 'gwagadss'},
          {id: 'gawdwas', order: 66666, name: 'gawdwas'},
        ],
        dragCard: {id: 'hawhawa', order: 22, name: 'hawhawa'},
        isNextPosition: true,
        lastOverCard: {id: 'gwagadss', order: 5555, name: 'gwagadss'},
        reverse: false,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'hersefs', order: 0, name: 'hersefs'},
        {id: 'gwagaw', order: 1, name: 'gwagaw'},
        {id: 'wgagaga', order: 2, name: 'wgagaga'},
        {id: 'adskgmalk', order: 3, name: 'adskgmalk'},
      ],
      toCard: [
        {id: 'xczsdasd', order: 0, name: 'xczsdasd'},
        {id: 'ggwwqqewa', order: 1, name: 'ggwwqqewa'},
        {id: 'hrhhddr', order: 2, name: 'hrhhddr'},
        {id: 'gwagadss', order: 3, name: 'gwagadss'},
        {id: 'hawhawa', order: 4, name: 'hawhawa'},
        {id: 'gawdwas', order: 5, name: 'gawdwas'},
      ],
    })
  })

  // reverse
  test('reverse Взял первую карту, поместил в начало последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: false,
        lastOverCard: {id: 't0', order: 0, name: 't0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 3, name: '3'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: '4', order: 1, name: '4'},
        {id: 't0', order: 0, name: 't0'},
      ],
    })
  })
  test('reverse Взял первую карту, поместил в конец последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: true,
        lastOverCard: {id: 't0', order: 0, name: 't0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 3, name: '3'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: 't0', order: 1, name: 't0'},
        {id: '4', order: 0, name: '4'},
      ],
    })
  })
  test('reverse Взял первую карту, поместил в начало ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: false,
        lastOverCard: {id: 't1', order: 1, name: 't1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 3, name: '3'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: '4', order: 2, name: '4'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't0', order: 0, name: 't0'},
      ],
    })
  })
  test('reverse Взял первую карту, поместил в конец ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        isNextPosition: true,
        lastOverCard: {id: 't1', order: 1, name: 't1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 3, name: '3'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: '4', order: 1, name: '4'},
        {id: 't0', order: 0, name: 't0'},
      ],
    })
  })
  test('reverse Взял вторую карту, поместил в начало последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: false,
        lastOverCard: {id: 't0', order: 0, name: 't0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 3, name: '4'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: '3', order: 1, name: '3'},
        {id: 't0', order: 0, name: 't0'},
      ],
    })
  })
  test('reverse Взял вторую карту, поместил в конец последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: true,
        lastOverCard: {id: 't0', order: 0, name: 't0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 3, name: '4'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: 't0', order: 1, name: 't0'},
        {id: '3', order: 0, name: '3'},
      ],
    })
  })
  test('reverse Взял вторую карту, поместил в начало ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: false,
        lastOverCard: {id: 't1', order: 1, name: 't1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 3, name: '4'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: '3', order: 2, name: '3'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't0', order: 0, name: 't0'},
      ],
    })
  })
  test('reverse Взял вторую карту, поместил в конец ПРЕД последней карты другого контейнера', () => {
    expect(
      getDataOtherCard({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        isNextPosition: true,
        lastOverCard: {id: 't1', order: 1, name: 't1'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 3, name: '4'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: '3', order: 1, name: '3'},
        {id: 't0', order: 0, name: 't0'},
      ],
    })
  })
  test('reverse Ордеры всегда должны начинатся от fromCards.length до нуля и toCards.length до нуля', () => {
    // eсели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5
    expect(
      getDataOtherCard({
        fromCards: [
          {id: 'adskgmalk', order: 55555, name: 'adskgmalk'},
          {id: 'wgagaga', order: 4444, name: 'wgagaga'},
          {id: 'gwagaw', order: 333, name: 'gwagaw'},
          {id: 'hawhawa', order: 22, name: 'hawhawa'},
          {id: 'hersefs', order: 1, name: 'hersefs'},
        ],
        toCards: [
          {id: 'gawdwas', order: 66666, name: 'gawdwas'},
          {id: 'gwagadss', order: 5555, name: 'gwagadss'},
          {id: 'hrhhddr', order: 444, name: 'hrhhddr'},
          {id: 'ggwwqqewa', order: 333, name: 'ggwwqqewa'},
          {id: 'xczsdasd', order: 22, name: 'xczsdasd'},
        ],
        dragCard: {id: 'wgagaga', order: 4444, name: 'wgagaga'},
        isNextPosition: true,
        lastOverCard: {id: 'ggwwqqewa', order: 333, name: 'ggwwqqewa'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'adskgmalk', order: 3, name: 'adskgmalk'},
        {id: 'gwagaw', order: 2, name: 'gwagaw'},
        {id: 'hawhawa', order: 1, name: 'hawhawa'},
        {id: 'hersefs', order: 0, name: 'hersefs'},
      ],
      toCard: [
        {id: 'gawdwas', order: 5, name: 'gawdwas'},
        {id: 'gwagadss', order: 4, name: 'gwagadss'},
        {id: 'hrhhddr', order: 3, name: 'hrhhddr'},
        {id: 'ggwwqqewa', order: 2, name: 'ggwwqqewa'},
        {id: 'wgagaga', order: 1, name: 'wgagaga'},
        {id: 'xczsdasd', order: 0, name: 'xczsdasd'},
      ],
    })
  })
})

describe('Функция toEndAnotherContainer для сортировки и смены ордеров в одном контейнере когда сброс происходит в пустое место в другой контейнер', () => {
  test('Взял первую карту', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: 't4', order: 4, name: 't4'},
        {id: '0', order: 5, name: '0'},
      ],
    })
  })
  test('Взял первую карту , поместил в другой пустой контейнер', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [],
        dragCard: {id: '0', order: 0, name: '0'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '1', order: 0, name: '1'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [{id: '0', order: 0, name: '0'}],
    })
  })

  test('Взял вторую карту', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '1', order: 1, name: '1'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '2', order: 1, name: '2'},
        {id: '3', order: 2, name: '3'},
        {id: '4', order: 3, name: '4'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: 't4', order: 4, name: 't4'},
        {id: '1', order: 5, name: '1'},
      ],
    })
  })
  test('Взял последнюю карту', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '0', order: 0, name: '0'},
          {id: '1', order: 1, name: '1'},
          {id: '2', order: 2, name: '2'},
          {id: '3', order: 3, name: '3'},
          {id: '4', order: 4, name: '4'},
        ],
        toCards: [
          {id: 't0', order: 0, name: 't0'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't4', order: 4, name: 't4'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '0', order: 0, name: '0'},
        {id: '1', order: 1, name: '1'},
        {id: '2', order: 2, name: '2'},
        {id: '3', order: 3, name: '3'},
      ],
      toCard: [
        {id: 't0', order: 0, name: 't0'},
        {id: 't1', order: 1, name: 't1'},
        {id: 't2', order: 2, name: 't2'},
        {id: 't3', order: 3, name: 't3'},
        {id: 't4', order: 4, name: 't4'},
        {id: '4', order: 5, name: '4'},
      ],
    })
  })
  test('Ордеры всегда должны начинатся от нуля до fromCards.length и нуля до toCards.length', () => {
    // eсели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: 'hersefs', order: 1, name: 'hersefs'},
          {id: 'hawhawa', order: 22, name: 'hawhawa'},
          {id: 'gwagaw', order: 333, name: 'gwagaw'},
          {id: 'wgagaga', order: 4444, name: 'wgagaga'},
          {id: 'adskgmalk', order: 55555, name: 'adskgmalk'},
        ],
        toCards: [
          {id: 'xczsdasd', order: 22, name: 'xczsdasd'},
          {id: 'ggwwqqewa', order: 333, name: 'ggwwqqewa'},
          {id: 'hrhhddr', order: 444, name: 'hrhhddr'},
          {id: 'gwagadss', order: 5555, name: 'gwagadss'},
          {id: 'gawdwas', order: 66666, name: 'gawdwas'},
        ],
        dragCard: {id: 'hawhawa', order: 22, name: 'hawhawa'},
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'hersefs', order: 0, name: 'hersefs'},
        {id: 'gwagaw', order: 1, name: 'gwagaw'},
        {id: 'wgagaga', order: 2, name: 'wgagaga'},
        {id: 'adskgmalk', order: 3, name: 'adskgmalk'},
      ],
      toCard: [
        {id: 'xczsdasd', order: 0, name: 'xczsdasd'},
        {id: 'ggwwqqewa', order: 1, name: 'ggwwqqewa'},
        {id: 'hrhhddr', order: 2, name: 'hrhhddr'},
        {id: 'gwagadss', order: 3, name: 'gwagadss'},
        {id: 'gawdwas', order: 4, name: 'gawdwas'},
        {id: 'hawhawa', order: 5, name: 'hawhawa'},
      ],
    })
  })

  //reverse

  test('reverse Взял первую карту', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '4', order: 4, name: '4'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 3, name: '3'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: 't0', order: 1, name: 't0'},
        {id: '4', order: 0, name: '4'},
      ],
    })
  })
  test('reverse Взял вторую карту', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '3', order: 3, name: '3'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 3, name: '4'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: 't0', order: 1, name: 't0'},
        {id: '3', order: 0, name: '3'},
      ],
    })
  })
  test('reverse Взял последнюю карту', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [
          {id: 't4', order: 4, name: 't4'},
          {id: 't3', order: 3, name: 't3'},
          {id: 't2', order: 2, name: 't2'},
          {id: 't1', order: 1, name: 't1'},
          {id: 't0', order: 0, name: 't0'},
        ],
        dragCard: {id: '0', order: 0, name: '0'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '4', order: 3, name: '4'},
        {id: '3', order: 2, name: '3'},
        {id: '2', order: 1, name: '2'},
        {id: '1', order: 0, name: '1'},
      ],
      toCard: [
        {id: 't4', order: 5, name: 't4'},
        {id: 't3', order: 4, name: 't3'},
        {id: 't2', order: 3, name: 't2'},
        {id: 't1', order: 2, name: 't1'},
        {id: 't0', order: 1, name: 't0'},
        {id: '0', order: 0, name: '0'},
      ],
    })
  })
  test('reverse Взял первую карту, поместил в другой пустой контейнер', () => {
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: '4', order: 4, name: '4'},
          {id: '3', order: 3, name: '3'},
          {id: '2', order: 2, name: '2'},
          {id: '1', order: 1, name: '1'},
          {id: '0', order: 0, name: '0'},
        ],
        toCards: [],
        dragCard: {id: '4', order: 4, name: '4'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: '3', order: 3, name: '3'},
        {id: '2', order: 2, name: '2'},
        {id: '1', order: 1, name: '1'},
        {id: '0', order: 0, name: '0'},
      ],
      toCard: [{id: '4', order: 0, name: '4'}],
    })
  })

  test('reverse Ордеры всегда должны начинатся от нуля до fromCards.length и нуля до toCards.length', () => {
    // eсели будут элементы с индексами 0,1,2,3,4,5 и удалить 1,2,3
    // останется 0,4,5 c бека подет новый элемент который равен количеству
    // элементов это 3 тоесть получится 0,4,5,3 и после обнавлени новый
    // элемент будет не в конце/начале списка 0,3,4,5
    expect(
      toEndAnotherContainer({
        fromCards: [
          {id: 'adskgmalk', order: 55555, name: 'adskgmalk'},
          {id: 'wgagaga', order: 4444, name: 'wgagaga'},
          {id: 'gwagaw', order: 333, name: 'gwagaw'},
          {id: 'hawhawa', order: 22, name: 'hawhawa'},
          {id: 'hersefs', order: 1, name: 'hersefs'},
        ],
        toCards: [
          {id: 'gawdwas', order: 66666, name: 'gawdwas'},
          {id: 'gwagadss', order: 5555, name: 'gwagadss'},
          {id: 'hrhhddr', order: 444, name: 'hrhhddr'},
          {id: 'ggwwqqewa', order: 333, name: 'ggwwqqewa'},
          {id: 'xczsdasd', order: 22, name: 'xczsdasd'},
        ],
        dragCard: {id: 'wgagaga', order: 4444, name: 'wgagaga'},
        reverse: true,
      }),
    ).toStrictEqual({
      fromCard: [
        {id: 'adskgmalk', order: 3, name: 'adskgmalk'},
        {id: 'gwagaw', order: 2, name: 'gwagaw'},
        {id: 'hawhawa', order: 1, name: 'hawhawa'},
        {id: 'hersefs', order: 0, name: 'hersefs'},
      ],
      toCard: [
        {id: 'gawdwas', order: 5, name: 'gawdwas'},
        {id: 'gwagadss', order: 4, name: 'gwagadss'},
        {id: 'hrhhddr', order: 3, name: 'hrhhddr'},
        {id: 'ggwwqqewa', order: 2, name: 'ggwwqqewa'},
        {id: 'xczsdasd', order: 1, name: 'xczsdasd'},
        {id: 'wgagaga', order: 0, name: 'wgagaga'},
      ],
    })
  })
})
