// src/components/ContractPreview.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './ContractPreview.module.css';
import InputTextarea from '../InputTextarea/InputTextarea';

const ContractPreview = ({ previewContract, onUpdateContract }) => {
  const [editableContract, setEditableContract] = useState(previewContract);

  useEffect(() => {
    if (previewContract) {
      setEditableContract(previewContract);
    }
  }, [previewContract]);

  const textareaRefs = useRef({});

  const handleContentChange = (type, secaoIndex, clausulaIndex, index, newValue) => {
    const updatedContract = { ...editableContract };

    if (type === "clausula") {
      const [newTitle, ...newContentArr] = newValue.split(': ');
      updatedContract.secoes[secaoIndex].clausulas[clausulaIndex].titulo = newTitle;
      updatedContract.secoes[secaoIndex].clausulas[clausulaIndex].content = newContentArr.join(': ');
    } else if (type === "paragrafo") {
      const [newTitle, ...newContentArr] = newValue.split(': ');
      updatedContract.secoes[secaoIndex].clausulas[clausulaIndex].paragrafos[index].titulo = newTitle;
      updatedContract.secoes[secaoIndex].clausulas[clausulaIndex].paragrafos[index].content = newContentArr.join(': ');
    }

    setEditableContract(updatedContract);
    onUpdateContract(updatedContract); // Atualiza o contrato no componente Gerador
  };

  const autoResize = (index) => {
    const textarea = textareaRefs.current[index];
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (editableContract) {
      editableContract.secoes.forEach((secao, secaoIndex) => {
        secao.clausulas.forEach((clausula, clausulaIndex) => {
          const clausulaIndexKey = `clausula-${secaoIndex}-${clausulaIndex}`;
          autoResize(clausulaIndexKey);

          clausula.paragrafos.forEach((paragrafo, paragrafoIndex) => {
            const paragrafoIndexKey = `paragrafo-${secaoIndex}-${clausulaIndex}-${paragrafoIndex}`;
            autoResize(paragrafoIndexKey);
          });
        });
      });
    }
  }, [editableContract]);

  return (
    <div className={styles.preview_container}>
      <h2>Esboço do Contrato:</h2>
      <h3 className={styles.preview_titulo}>{editableContract?.titulo}</h3>
      <p>{editableContract?.texto_inicial}</p>
      {editableContract?.secoes.map((secao, secaoIndex) => (
        <div key={secaoIndex}>
          <h4>{secao.titulo}</h4>
          {secao.clausulas.map((clausula, clausulaIndex) => {
            const clausulaIndexKey = `clausula-${secaoIndex}-${clausulaIndex}`;
            const clausulaValue = `${clausula.titulo}: ${clausula.content}`;
            return (
              <div key={clausulaIndex}>
                <InputTextarea />
                <textarea
                  wrap="soft"
                  ref={(el) => (textareaRefs.current[clausulaIndexKey] = el)}
                  value={clausulaValue}
                  className={styles.textarea}
                  onInput={() => autoResize(clausulaIndexKey)}
                  onChange={(e) =>
                    handleContentChange("clausula", secaoIndex, clausulaIndex, null, e.target.value)
                  }
                />
                {clausula.paragrafos.filter((paragrafo) => paragrafo.titulo || paragrafo.content).map((paragrafo, paragrafoIndex) => {
                  const paragrafoIndexKey = `paragrafo-${secaoIndex}-${clausulaIndex}-${paragrafoIndex}`;
                  const paragrafoValue = `${paragrafo.titulo}: ${paragrafo.content}`;
                  return (
                    <textarea
                      key={paragrafoIndexKey}
                      wrap="soft"
                      ref={(el) => (textareaRefs.current[paragrafoIndexKey] = el)}
                      value={paragrafoValue}
                      className={styles.textarea}
                      onInput={() => autoResize(paragrafoIndexKey)}
                      onChange={(e) =>
                        handleContentChange("paragrafo", secaoIndex, clausulaIndex, paragrafoIndex, e.target.value)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
      <p>{editableContract?.texto_final}</p>
    </div>
  );
};

export default ContractPreview;
