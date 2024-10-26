import React from 'react';

const ContractSection = ({ secao }) => {
  return (
    <div>
      <h2>{secao.titulo}</h2>
      {secao.clausulas.map((clausula, index) => (
        <div key={index}>
          <h3>{clausula.titulo}</h3>
          <p>{clausula.content}</p>
          {clausula.paragrafos.map((paragrafo, pIndex) => (
            <p key={pIndex}>
              <strong>{paragrafo.titulo}:</strong> {paragrafo.content}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContractSection;
