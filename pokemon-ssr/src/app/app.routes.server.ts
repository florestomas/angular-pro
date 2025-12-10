import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Provide explicit server routes for prerendering.
 * The `pokemons/:id` route includes a `getPrerenderParams` function
 * so the SSG/prerenderer knows which `id` values to generate.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    // return an array of parameter objects { id: string }
    // adjust the range or source as needed for your dataset
    getPrerenderParams: async () => {
      const max = 151; // prerender first 151 pokemons by default
      const params = Array.from({ length: max }, (_, i) => ({ id: String(i + 1) }));
      return params;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
