// src/components/SelecionarContrato.js
import React from 'react';

const SelecionarContrato = ({ contracts, onSelectContract }) => {
  return (
    <select onChange={(e) => onSelectContract(e.target.value)}>
      <option value="">Selecione um contrato</option>
      {contracts.map((contract) => (
        <option key={contract.id} value={contract.id}>
          {contract.titulo}
        </option>
      ))}
    </select>
  );
};

export default SelecionarContrato;
