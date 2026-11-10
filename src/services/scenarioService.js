// Carrega o cenário inicial (famílias, abrigos e veículos) com a Fetch API.
// O arquivo fica em public/data/cenario.json.
export async function getScenario() {
  const response = await fetch(`${import.meta.env.BASE_URL}data/cenario.json`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar o cenário.');
  }

  return response.json();
}
