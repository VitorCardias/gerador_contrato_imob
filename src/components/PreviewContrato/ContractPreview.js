// src/components/ContractPreview.js
import React from 'react';
import styles from './ContractPreview.module.css'

const ContractPreview = ({ previewContract }) => {
  if (!previewContract) return null;

  return (
    <div className={styles.preview_container}>
      <h2>Esboço do Contrato:</h2>
      <h3 className={styles.preview_titulo}>{previewContract.titulo}</h3>
      <p>{previewContract.texto_inicial}</p>
      {previewContract.secoes.map((secao, index) => (
        <div key={index}>
          <h4>{secao.titulo}</h4>
          {secao.clausulas.map((clausula, idx) => (
            <div key={idx}>
              <p>
                <strong>{clausula.titulo}:</strong> {clausula.content}
              </p>
              {clausula.paragrafos.filter((paragrafo) => paragrafo.titulo || paragrafo.content).map((paragrafo, id) => (
                <p key={id}>
                  {paragrafo.titulo === "" ? false : `${paragrafo.titulo}: ${paragrafo.content}`}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
      <p>{previewContract.texto_final}</p>
    </div>
  );
};

export default ContractPreview;
