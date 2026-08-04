import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://swapi.py4e.com/api/people/', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    if (page === '1' || !page) {
      return HttpResponse.json({
        count: 82,
        next: 'https://swapi.py4e.com/api/people/?page=2',
        previous: null,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            birth_year: '19BBY',
            created: '2014-12-09T13:50:51.644000Z',
            films: ['https://swapi.py4e.com/api/films/1/'],
            species: [],
            homeworld: 'https://swapi.py4e.com/api/planets/1/',
            url: 'https://swapi.py4e.com/api/people/1/'
          }
        ]
      });
    }

    return HttpResponse.json({
      count: 82,
      next: null,
      previous: 'https://swapi.py4e.com/api/people/?page=1',
      results: []
    });
  }),

  http.get('https://swapi.py4e.com/api/planets/1/', () => {
    return HttpResponse.json({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
      population: '200000',
      url: 'https://swapi.py4e.com/api/planets/1/'
    });
  }),

  http.get('https://swapi.py4e.com/api/planets/', () => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'Tatooine', url: 'https://swapi.py4e.com/api/planets/1/' }
      ]
    });
  }),

  http.get('https://swapi.py4e.com/api/species/', () => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'Human', url: 'https://swapi.py4e.com/api/species/1/' }
      ]
    });
  }),

  http.get('https://swapi.py4e.com/api/films/', () => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        { title: 'A New Hope', url: 'https://swapi.py4e.com/api/films/1/' }
      ]
    });
  }),
];
