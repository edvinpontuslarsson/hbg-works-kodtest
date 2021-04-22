const courses = [
  {
    id: 1,
    name: 'Yoga 101',
    dates: ['2021-01-01', '2021-10-31'],
  },
  {
    id: 2,
    name: 'Surdegsbakning från scratch',
    dates: ['2021-05-25', '2021-05-26', '2021-05-27'],
  },
  {
    id: 3,
    name: 'Öppna burkar med lock som sitter fast',
    dates: [
      '2021-01-01',
      '2021-12-10',
      '2021-04-01',
      '2021-03-12',
    ],
  },
  {
    id: 4,
    name: 'Tabbar i firefox',
    dates: ['2021-12-24', '2021-12-24', '2021-12-24'],
  },
  {
    id: 5,
    name: 'Olika typer av moln',
    dates: ['2021-06-30'],
  },
];

export const coursesUniqueDates = courses.map((course) => {
  return {
    ...course,
    dates: [...new Set(course.dates)],
  };
});
