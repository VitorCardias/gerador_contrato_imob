// src/utils/contractHelpers.js
export const replacePlaceholders = (contract, values) => {
    const replaceInText = (text) => {
      return text.replace(/\{\{(.*?)\}\}/g, (_, key) => values[key.trim()] || '');
    };
  
    return {
        ...contract,
        texto_inicial: replaceInText(contract.texto_inicial),
        texto_final: replaceInText(contract.texto_final),
        data: replaceInText(contract.data),
        secoes: contract.secoes.map((secao) => ({
            ...secao,
            clausulas: secao.clausulas.map((clausula) => ({
            ...clausula,
            content: replaceInText(clausula.content),
            paragrafos: clausula.paragrafos.map((paragrafo) => ({
                ...paragrafo,
                content: replaceInText(paragrafo.content),
            })),
            })),
        })),
    };
};
  
  export const extractPlaceholders = (contract) => {
    const placeholderRegex = /\{\{(.*?)\}\}/g;
    let matches = [];
    const extractFromText = (text) => {
      let match;
      while ((match = placeholderRegex.exec(text)) !== null) {
        matches.push(match[1].trim());
      }
    };
  
    extractFromText(contract.texto_inicial);
    extractFromText(contract.texto_final);
    extractFromText(contract.data);
    contract.secoes.forEach((secao) => {
      secao.clausulas.forEach((clausula) => {
        extractFromText(clausula.content);
        clausula.paragrafos.forEach((paragrafo) => {
          extractFromText(paragrafo.content);
        });
      });
    });
  
    return [...new Set(matches)];
  };
  
  export const categorizePlaceholders = (placeholders) => {
    const categories = {
      vendedor: [],
      comprador: [],
      imovel: [],
      outros: [],
    };
  
    placeholders.forEach((placeholder) => {
      if (placeholder.startsWith('vendedor_')) {
        categories.vendedor.push(placeholder);
      } else if (placeholder.startsWith('comprador_')) {
        categories.comprador.push(placeholder);
      } else if (placeholder.startsWith('imovel_')) {
        categories.imovel.push(placeholder);
      } else {
        categories.outros.push(placeholder);
      }
    });
  
    return categories;
  };
  