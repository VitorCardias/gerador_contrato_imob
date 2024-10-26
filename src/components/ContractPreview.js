// src/components/ContractPreview.js
import React from 'react';

const ContractPreview = ({ previewContract }) => {
  if (!previewContract) return null;

  return (
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
