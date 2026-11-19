import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O site precisa abrir com dois cliques no index.html, sem instalar nada.
// Por isso o build:
// - usa caminhos relativos (base './');
// - gera um único arquivo de script comum, sem "type=module", que o navegador
//   bloqueia quando a página é aberta como arquivo;
// - separa os arquivos nas pastas css, js e img.
function scriptComum() {
  return {
    name: 'script-comum',
    enforce: 'post',
    transformIndexHtml(html) {
      return html
        .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, '')
        .replace(
          '</body>',
          `  <script src="./js/app.js"></script>\n  </body>`,
        )
        .replace(/ crossorigin/g, '');
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), scriptComum()],
  build: {
    assetsDir: '',
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'js/app.js',
        assetFileNames: (arquivo) => {
          const nome = arquivo.names?.[0] ?? arquivo.name ?? '';
          if (nome.endsWith('.css')) return 'css/estilos.css';
          return 'img/[name][extname]';
        },
      },
    },
  },
});
