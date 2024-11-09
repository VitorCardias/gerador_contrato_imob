import styles from "./InputTextarea.module.css"

const InputTextarea = () => {

    return (
        <div className={styles.containerGenerate}>
            <div className={styles.inputGenerate}>
                <input placeholder='Digite seu prompt aqui...'/> 
                <button className={styles.SendButton}>Enviar</button>
            </div>
            <div className={styles.informationButtons}>
                <button className={styles.GenerateButton}>Auto Gerar</button>
            </div>
        </div>
    );
}
export default InputTextarea;