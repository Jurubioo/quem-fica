// Regras do formulário de participação. Funções puras: testáveis sem interface.

export const TIPOS_PARTICIPACAO = [
  { valor: 'morador', rotulo: 'Sou morador(a) do bairro' },
  { valor: 'orgao', rotulo: 'Represento um órgão público' },
  { valor: 'organizacao', rotulo: 'Represento uma ONG ou empresa' },
  { valor: 'voluntario', rotulo: 'Quero ser voluntário(a)' },
  { valor: 'outro', rotulo: 'Outro' },
];

export const INTERESSES = [
  { valor: 'testar', rotulo: 'Testar a simulação com dados reais da minha região' },
  { valor: 'dados', rotulo: 'Contribuir com dados de abrigos, rotas e transporte' },
  { valor: 'atualizacoes', rotulo: 'Receber novidades sobre o projeto' },
];

const LIMITE_MENSAGEM = 500;

// Lista só com os valores aceitos (ex.: ['morador', 'orgao', ...]).
const valoresValidos = (lista) => lista.map((item) => item.valor);

// E-mail válido: sem espaços, um único @, algo antes dele e um domínio com ponto,
// terminando em pelo menos 2 letras (ex.: nome@exemplo.com).
export function emailValido(email) {
  if (email.includes(' ')) return false;
  const partes = email.split('@');
  if (partes.length !== 2) return false;
  const [usuario, dominio] = partes;
  if (usuario.length === 0) return false;
  const pedacos = dominio.split('.');
  if (pedacos.length < 2) return false;
  if (pedacos.some((pedaco) => pedaco.length === 0)) return false;
  return pedacos[pedacos.length - 1].length >= 2;
}

// Recebe os valores crus do formulário e devolve { campo: mensagem }.
export function validarParticipacao(valores) {
  const erros = {};
  const nome = (valores.nome || '').trim();
  const email = (valores.email || '').trim();
  const municipio = (valores.municipio || '').trim();
  const mensagem = (valores.mensagem || '').trim();
  const familias = valores.familiasApoio === '' || valores.familiasApoio == null
    ? null
    : Number(valores.familiasApoio);

  if (nome.length < 2) erros.nome = 'Informe seu nome completo, com pelo menos 2 letras.';
  else if (nome.length > 80) erros.nome = 'Use no máximo 80 caracteres no nome.';

  if (!email) erros.email = 'Informe seu e-mail.';
  else if (!emailValido(email) || email.length > 120) erros.email = 'Informe um e-mail válido, como nome@exemplo.com.';

  if (!valoresValidos(TIPOS_PARTICIPACAO).includes(valores.tipo)) erros.tipo = 'Escolha como você quer participar.';

  if (municipio.length > 80) erros.municipio = 'Use no máximo 80 caracteres.';

  if (familias !== null && (!Number.isInteger(familias) || familias < 0 || familias > 9999)) {
    erros.familiasApoio = 'Informe um número inteiro entre 0 e 9999.';
  }

  if (mensagem.length > LIMITE_MENSAGEM) erros.mensagem = `Use no máximo ${LIMITE_MENSAGEM} caracteres.`;

  if (valores.consentimento !== true) erros.consentimento = 'Confirme o consentimento para continuar.';

  return erros;
}

// Converte os valores válidos no registro que será guardado.
export function montarRegistro(valores, agora = new Date()) {
  const familias = valores.familiasApoio === '' || valores.familiasApoio == null
    ? null
    : Number(valores.familiasApoio);
  const interesses = Array.isArray(valores.interesses)
    ? valores.interesses.filter((i) => valoresValidos(INTERESSES).includes(i))
    : [];

  return {
    criadoEm: agora.toISOString(),
    nome: valores.nome.trim(),
    email: valores.email.trim().toLowerCase(),
    tipo: valores.tipo,
    municipio: (valores.municipio || '').trim(),
    familiasApoio: familias,
    interesses,
    mensagem: (valores.mensagem || '').trim(),
  };
}
