const loadContracts = async () => {
    try {
      const response = await fetch('/contratos.json'); // Certifique-se de que o caminho está correto.
      const data = await response.json();
      return data.contratos; // Acessa diretamente o array "contratos" dentro do JSON.
    } catch (error) {
      console.error('Erro ao carregar os contratos:', error);
      return [];
    }
  };
  
  export default loadContracts;
  