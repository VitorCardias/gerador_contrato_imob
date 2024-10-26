import React, { useState, useEffect } from 'react';
import { generateDocx } from '../../utils/docGenerator';
import loadContracts from '../../utils/loadjson';

const Gerador = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [previewContract, setPreviewContract] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      const data = await loadContracts();
      setContracts(data);
    };

    fetchContracts();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const replacePlaceholders = (contract, values) => {
    const replaceInText = (text) => {
      return text.replace(/\{\{(.*?)\}\}/g, (_, key) => values[key.trim()] || '');
    };

    return {
      ...contract,
      texto_inicial: replaceInText(contract.texto_inicial),
      texto_final: replaceInText(contract.texto_final),
      data: replaceInText(contract.data),
      secoes: contract.secoes.map(secao => ({
        ...secao,
        clausulas: secao.clausulas.map(clausula => ({
          ...clausula,
          content: replaceInText(clausula.content),
          paragrafos: clausula.paragrafos.map(paragrafo => ({
            ...paragrafo,
            content:replaceInText(paragrafo.content),
          }))
        }))
      }))
    };
  };

  const handlePreview = () => {
    if (selectedContract) {
      const contractWithValues = replacePlaceholders(selectedContract, formValues);
      setPreviewContract(contractWithValues);
    }
  };

  const handleGenerate = () => {
    if (selectedContract) {
      const contractWithValues = replacePlaceholders(selectedContract, formValues);
      generateDocx(contractWithValues);
    }
  };

  const extractPlaceholders = (contract) => {
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
    contract.secoes.forEach(secao => {
      secao.clausulas.forEach(clausula => {
        extractFromText(clausula.content);
        clausula.paragrafos.forEach(paragrafo => {
          extractFromText(paragrafo.content);
        });
      });
    });

    return [...new Set(matches)];
  };

  const categorizePlaceholders = (placeholders) => {
    const categories = {
      vendedor: [],
      comprador: [],
      imovel: [],
      outros: []
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

  return (
    <div>
      <h1>Gerador de Contratos</h1>

      <select onChange={(e) => {
        const contract = contracts.find(c => c.id === e.target.value);
        setSelectedContract(contract);
        if (contract) {
          const placeholders = extractPlaceholders(contract);
          setFormValues(placeholders.reduce((acc, key) => ({ ...acc, [key]: '' }), {}));
        }
      }}>
        <option value="">Selecione um contrato</option>
        {contracts.map((contract) => (
          <option key={contract.id} value={contract.id}>
            {contract.titulo}
          </option>
        ))}
      </select>

      {selectedContract && (
        <>
          <h2>Preencha os detalhes do contrato:</h2>
          <form>
            {(() => {
              const categories = categorizePlaceholders(Object.keys(formValues));

              return (
                <>
                  {categories.vendedor.length > 0 && (
                    <div>
                      <h3>Informações do Vendedor</h3>
                      {categories.vendedor.map((key) => (
                        <div key={key}>
                          <label>{key.replace('vendedor_', '')}:</label>
                          <input
                            type="text"
                            name={key}
                            value={formValues[key]}
                            onChange={handleInputChange}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {categories.comprador.length > 0 && (
                    <div>
                      <h3>Informações do Comprador</h3>
                      {categories.comprador.map((key) => (
                        <div key={key}>
                          <label>{key.replace('comprador_', '')}:</label>
                          <input
                            type="text"
                            name={key}
                            value={formValues[key]}
                            onChange={handleInputChange}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {categories.imovel.length > 0 && (
                    <div>
                      <h3>Informações do Imóvel</h3>
                      {categories.imovel.map((key) => (
                        <div key={key}>
                          <label>{key.replace('imovel_', '')}:</label>
                          <input
                            type="text"
                            name={key}
                            value={formValues[key]}
                            onChange={handleInputChange}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {categories.outros.length > 0 && (
                    <div>
                      <h3>Outras Informações</h3>
                      {categories.outros.map((key) => (
                        <div key={key}>
                          <label>{key}:</label>
                          <input
                            type="text"
                            name={key}
                            value={formValues[key]}
                            onChange={handleInputChange}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </form>

          <button onClick={handlePreview}>Visualizar Esboço</button>
          <button onClick={handleGenerate}>Gerar Documento</button>
        </>
      )}

      {previewContract && (
        <div>
          <h2>Esboço do Contrato:</h2>
          <h3>{previewContract.titulo}</h3>
          <p>{previewContract.texto_inicial}</p>
          {previewContract.secoes.map((secao, index) => (
            <div key={index}>
              <h4>{secao.titulo}</h4>
              {secao.clausulas.map((clausula, idx) => (
                <div key={idx}>
                  <p>
                    {clausula.titulo}: {clausula.content}
                  </p>
                  {clausula.paragrafos.map((paragrafo, id) => (
                    <p key={id}>
                      {paragrafo.titulo}: {paragrafo.content}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <p>{previewContract.texto_final}</p>
        </div>
      )}
    </div>
  );
};

export default Gerador;
