// Armazenamento das participações. Hoje grava no navegador de quem preenche
// (localStorage). Para enviar à equipe, troque este módulo por uma chamada à API:
// a página e as regras não precisam mudar.

const CHAVE = 'quem-fica:participacoes';

function memoriaTemporaria() {
  const dados = {};
  return {
    getItem: (k) => (k in dados ? dados[k] : null),
    setItem: (k, v) => {
      dados[k] = String(v);
    },
    removeItem: (k) => {
      delete dados[k];
    },
  };
}

export function criarArmazenamento(storage, chave = CHAVE) {
  function ler() {
    try {
      const lista = JSON.parse(storage.getItem(chave) || '[]');
      return Array.isArray(lista) ? lista : [];
    } catch {
      return [];
    }
  }

  return {
    listar: ler,
    salvar(registro) {
      const novo = {
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        ...registro,
      };
      storage.setItem(chave, JSON.stringify([...ler(), novo]));
      return novo;
    },
    limpar() {
      storage.removeItem(chave);
    },
  };
}

export function armazenamentoPadrao() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.getItem(CHAVE); // falha em navegação privada bloqueada
      return localStorage;
    }
  } catch {
    // cai para memória temporária
  }
  return memoriaTemporaria();
}

export const participacoes = criarArmazenamento(armazenamentoPadrao());

