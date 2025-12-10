import { AngularAppEngine } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';
import { join } from 'node:path';

const distFolder = join(process.cwd(), 'dist/pokemon-ssr/browser');
const angularApp = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Sirve archivos estáticos
  if (/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif)$/i.test(pathname)) {
    const filePath = join(distFolder, pathname.slice(1));
    try {
      const response = await fetch(`file://${filePath}`);
      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return new Response(response.body, { status: 200, headers });
      }
    } catch {
      // Ignora y sigue
    }
  }

  // Renderiza con Angular SSR
  const response = await angularApp.handle(request, { context });
  return response ?? new Response('Not Found', { status: 404 });
}

// Para desarrollo local (node dist/... o ng serve --ssr)
export default {
  async fetch(request: Request) {
    return netlifyAppEngineHandler(request);
  },
};
