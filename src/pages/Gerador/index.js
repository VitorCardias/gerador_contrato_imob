// src/pages/Gerador.js
import React, { useState, useEffect } from 'react';
import styles from "./Gerador.module.css"
import { generateDocx } from '../../utils/docGenerator';
import loadContracts from '../../utils/loadjson';
import { replacePlaceholders, extractPlaceholders, categorizePlaceholders } from '../../utils/contractHelpers';
import SelecionarContrato from '../../components/TipoContrato/SelecionarContrato';
import ContractForm from '../../components/FormContrato/ContractForm';
import ContractPreview from '../../components/PreviewContrato/ContractPreview';

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
    } else {
      console.warn("No contract selected.");
    }
  };

  const handleGenerate = () => {
    if (previewContract) {
      generateDocx(previewContract); // Gera o arquivo com o estado mais recente
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

  const handleUpdateContract = (updatedContract) => {
    setPreviewContract(updatedContract); // Atualiza o contrato no estado de Gerador
  };

  return (
    <div>
      <h1 className={styles.titulo}>Gerador de Contratos</h1>
      <SelecionarContrato contracts={contracts} onSelectContract={handleSelectContract} />
      {selectedContract && (
        <>
          <h2>Preencha os detalhes do contrato:</h2>
          <ContractForm
            categories={categorizePlaceholders(Object.keys(formValues))}
            formValues={formValues}
            handleInputChange={handleInputChange}
          />
          <div className={styles.classBotao}>
            <button className={styles.botao} onClick={handlePreview}>Visualizar Esboço</button>
            <button className={styles.botao} onClick={handleGenerate}>Gerar Documento</button>
          </div>
          <ContractPreview
            previewContract={previewContract}
            onUpdateContract={handleUpdateContract} // Passa a função para receber atualizações
          />
        </>
      )}
    </div>
  );
};

export default Gerador;
