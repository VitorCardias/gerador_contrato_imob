// src/pages/Gerador.js
import React, { useState, useEffect } from 'react';
import { generateDocx } from '../../utils/docGenerator';
import loadContracts from '../../utils/loadjson';
import { replacePlaceholders, extractPlaceholders, categorizePlaceholders } from '../../utils/contractHelpers';
import SelecionarContrato from '../../components/SelecionarContrato';
import ContractForm from '../../components/ContractForm';
import ContractPreview from '../../components/ContractPreview';

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
      [e.target.name]: e.target.value,
    });
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

  const handleSelectContract = (contractId) => {
    const contract = contracts.find((c) => c.id === contractId);
    setSelectedContract(contract);
    if (contract) {
      const placeholders = extractPlaceholders(contract);
      setFormValues(placeholders.reduce((acc, key) => ({ ...acc, [key]: '' }), {}));
    }
  };

  return (
    <div>
      <h1>Gerador de Contratos</h1>
      <SelecionarContrato contracts={contracts} onSelectContract={handleSelectContract} />
      {selectedContract && (
        <>
          <h2>Preencha os detalhes do contrato:</h2>
          <ContractForm
            categories={categorizePlaceholders(Object.keys(formValues))}
            formValues={formValues}
            handleInputChange={handleInputChange}
          />
          <button onClick={handlePreview}>Visualizar Esboço</button>
          <button onClick={handleGenerate}>Gerar Documento</button>
          <ContractPreview previewContract={previewContract} />
        </>
      )}
    </div>
  );
};

export default Gerador;
