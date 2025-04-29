import Cadastro from '../Cadastro/Cadastro';  // Importação do componente Cadastro
import styles from './index.module.scss';


export default function Inicio() {
  return (
    <section>
      <h3 className={styles.titulo}>
          Bem-vindo ao Aplicativo Carango Bom.
      </h3>
      <div>
        {/* Usando o componente Cadastro */}
       {/* <Cadastro /> */}
      </div>
    </section>
  );
}
