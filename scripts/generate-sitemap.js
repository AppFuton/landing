import fs from 'fs';
import path from 'path';

const domain = 'https://futon.wtf';
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/fdroid', priority: '0.8', changefreq: 'weekly' },
  { path: '/logs', priority: '0.5', changefreq: 'monthly' },
  { path: '/unsubscribe', priority: '0.1', changefreq: 'never' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const publicPath = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
console.log('Sitemap generated in public/sitemap.xml');
