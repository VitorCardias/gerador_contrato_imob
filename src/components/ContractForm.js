// src/components/ContractForm.js
import React from 'react';

const ContractForm = ({ categories, formValues, handleInputChange }) => {
  const renderFields = (fields, labelPrefix) =>
    fields.map((key) => (
      <div key={key}>
        <label>{key.replace(`${labelPrefix}_`, '')}:</label>
        <input
          type="text"
          name={key}
          value={formValues[key]}
          onChange={handleInputChange}
        />
      </div>
    ));

  return (
    <form>
      {categories.vendedor.length > 0 && (
        <div>
          <h3>Informações do Vendedor</h3>
          {renderFields(categories.vendedor, 'vendedor')}
        </div>
      )}

      {categories.comprador.length > 0 && (
        <div>
          <h3>Informações do Comprador</h3>
          {renderFields(categories.comprador, 'comprador')}
        </div>
      )}

      {categories.imovel.length > 0 && (
        <div>
          <h3>Informações do Imóvel</h3>
          {renderFields(categories.imovel, 'imovel')}
        </div>
      )}

      {categories.outros.length > 0 && (
        <div>
          <h3>Outras Informações</h3>
          {renderFields(categories.outros, '')}
        </div>
      )}
    </form>
  );
};

export default ContractForm;
