// src/components/ContractForm.js
import React from 'react';
import styles from './ContractForm.module.css';


const ContractForm = ({ categories, formValues, handleInputChange }) => {
  const renderFields = (fields, labelPrefix) =>
    fields.map((key) => (
      <div className={styles.field} key={key}>
        <label>{key.replace(`${labelPrefix}_`, '')}:</label>
        <input
          className={styles.input_text}
          type="text"
          name={key}
          value={formValues[key]}
          onChange={handleInputChange}
        />
      </div>
    ));

  return (
    <form className={styles.formContainer}>
      <div className={styles.field_comp_vend}>
        {categories.vendedor.length > 0 && (
          <div className={styles.fieldGroup}>
            <h3>Informações do Vendedor</h3>
            {renderFields(categories.vendedor, 'vendedor')}
          </div>
        )}

        {categories.comprador.length > 0 && (
          <div className={styles.fieldGroup}>
            <h3>Informações do Comprador</h3>
            {renderFields(categories.comprador, 'comprador')}
          </div>
        )}
      </div>
      <div className={styles.field_comp_vend}>
        {categories.imovel.length > 0 && (
          <div className={styles.fieldGroup}>
            <h3>Informações do Imóvel</h3>
            {renderFields(categories.imovel, 'imovel')}
          </div>
        )}

        {categories.outros.length > 0 && (
          <div className={styles.fieldGroup}>
            <h3>Outras Informações</h3>
            {renderFields(categories.outros, '')}
          </div>
        )}
      </div>
    </form>
  );
};

export default ContractForm;