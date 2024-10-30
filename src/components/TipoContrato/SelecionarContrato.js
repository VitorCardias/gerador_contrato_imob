// src/components/SelecionarContrato.js
import React from 'react';
import styles from './SelecionarContrato.module.css'

const SelecionarContrato = ({ contracts, onSelectContract }) => {
  return (
    <select className={styles.select_gerador} onChange={(e) => onSelectContract(e.target.value)}>
      <option className={styles.select} value="">Selecione um contrato</option>
      {contracts.map((contract) => (
        <option key={contract.id} value={contract.id}>
          {contract.titulo}
        </option>
      ))}
    </select>
  );
};

export default SelecionarContrato;
