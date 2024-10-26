import { saveAs } from 'file-saver';
import * as docx from 'docx';

export const generateDocx = (contract) => {
  const doc = new docx.Document({
    sections: [
      {
        children: [
          new docx.Paragraph({
            alignment: docx.AlignmentType.CENTER,
            spacing: { line: 360 }, // Espaçamento de 1.5x (360 twips)
            children: [
              new docx.TextRun({
                text: contract.titulo,
                font: 'Arial',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.JUSTIFIED,
            
            spacing: { before: 200, after: 200, line: 360 },
            children: [
              new docx.TextRun({
                text: contract.texto_inicial,
                font: 'Arial',
                size: 24,
              }),
            ],
          }),

          // Mapeia as seções e clausulas corretamente
          ...contract.secoes.flatMap((secao) => [
            new docx.Paragraph({
              spacing: { before: 300, after: 300, line: 360 },
              children: [
                new docx.TextRun({
                  text: secao.titulo,
                  font: 'Arial',
                  size: 24,
                  bold: true,
                }),
              ],
            }),

            ...secao.clausulas.flatMap((clausula) => [
              new docx.Paragraph({
                spacing: { before: 300, after: 300, line: 370 },
                alignment: docx.AlignmentType.JUSTIFIED,
                children: [
                  new docx.TextRun({
                    text: clausula.titulo,
                    font: 'Arial',
                    size: 24,
                    bold: true,
                  }),
                  new docx.TextRun({
                    text: `: ${clausula.content}`,
                    font: 'Arial',
                    size: 24,
                  }),
                ],
              }),
              ...clausula.paragrafos.filter((paragrafo) => paragrafo.titulo || paragrafo.content).map((paragrafo) => 
                new docx.Paragraph({
                  spacing: { before: 200, after: 200, line: 360 },
                  alignment: docx.AlignmentType.JUSTIFIED,
                  children: [
                    paragrafo.titulo
                    ? new docx.TextRun({
                        text: `${paragrafo.titulo + ': '}`,
                        font: 'Arial',
                        size: 24,
                        bold: true,
                      })
                    : null,

                    paragrafo.content
                    ? new docx.TextRun({
                        text: `${paragrafo.content}`,
                        font: 'Arial',
                        size: 24,
                      })
                    : null,
                  ].filter(Boolean),
                })
              ),
            ]),
          ]),
          new docx.Paragraph({
            alignment: docx.AlignmentType.JUSTIFIED,
            spacing: { before: 200, after: 200, line: 360 },
            children: [
              new docx.TextRun({
                text: contract.texto_final,
                font: 'Arial',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.END,
            spacing: { before: 300, after: 1000},
            children: [
              new docx.TextRun({
                text: `${contract.data}`,
                font: 'Arial',
                size: 24,
              }),
            ],
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.END,
            spacing: { before: 300, after: 300, line: 900},
            children: [
              new docx.TextRun({
                text: "PROMITENTES VENDEDORES: ____________________________________",
                font: 'Arial',
                size: 24,
                break: true,
              }),
              new docx.TextRun({
                spacing: {before: 600},
                text: "____________________________________",
                font: 'Arial',
                size: 24,
                break: true,
            }),
            ],
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.END,
            spacing: { before: 300, after: 300, line: 900},
            children: [
              new docx.TextRun({
                  text: "PROMITENTES COMPRADORES: ____________________________________",
                  font: 'Arial',
                  size: 24,
                  break: true,
              }),
              new docx.TextRun({
                text: "____________________________________",
                font: 'Arial',
                size: 24,
                break:true,
              }),
            ],
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.START,
            spacing: { before: 300, after: 500 },
            children: [
              new docx.TextRun({
                  text: "TESTEMUNHA:",
                  font: 'Arial',
                  size: 24,
                  break: true,
              }),
            ],
          }),
          new docx.Paragraph({
            spacing: { before: 200, after: 500,line: 450 },
            children: [
              new docx.TextRun({
                text: "1. ____________________________________",
                font: 'Arial',
                size: 24,
                break:true,
              }),
              new docx.TextRun({
                text: "   Nome:",
                font: 'Arial',
                size: 24,
                break:true,
              }),
              new docx.TextRun({
                text: "   CPF:",
                font: 'Arial',
                size: 24,
                break:true,
              }),
            ],
          }),
          new docx.Paragraph({
            spacing: { before: 200, after: 500,line: 450 },
            children: [
              new docx.TextRun({
                text: "2. ____________________________________",
                font: 'Arial',
                size: 24,
                break:true,
              }),
              new docx.TextRun({
                text: "   Nome:",
                font: 'Arial',
                size: 24,
                break:true,
              }),
              new docx.TextRun({
                text: "   CPF:",
                font: 'Arial',
                size: 24,
                break:true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${contract.titulo}.docx`);
  });
};
