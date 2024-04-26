import { useState, useEffect } from "react";
import styles from "./Form.module.css";

function Form() {
    //Categorias
    let categorias = ["Ortopedia", "Cardiologia", "Psiquiatria"];

   
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [consultas, setConsultas] = useState([]);
    const [pacientesAtendimento, setPacientesAtendimento] = useState({ Ortopedia: null, Cardiologia: null, Psiquiatria: null }); // 

    // Pegar as cnsultas salvas no localStore após o refresh
    useEffect(() => {
        const consultasSalvas = JSON.parse(localStorage.getItem('consultas'));
        if (consultasSalvas) {
            setConsultas(consultasSalvas);
        }
    }, []);

    // Salvar Consulta
    function Salvar(e) {
        e.preventDefault();
        const novaConsulta = { nome, categoria };
        setConsultas([...consultas, novaConsulta]);
        localStorage.setItem('consultas', JSON.stringify([...consultas, novaConsulta]));
        setNome("");
        setCategoria("");
    }

    // Paciente em atendimento
    function avancarConsulta(categoria) {
        const proximoPaciente = consultas.find(consulta => consulta.categoria === categoria);
        if (proximoPaciente) {
            setPacientesAtendimento({ ...pacientesAtendimento, [categoria]: proximoPaciente });
            const consultasRestantes = consultas.filter(consulta => consulta !== proximoPaciente);
            setConsultas(consultasRestantes);
            localStorage.setItem('consultas', JSON.stringify(consultasRestantes));
        } else {
            setPacientesAtendimento({ ...pacientesAtendimento, [categoria]: null });
        }
    }

    return (
        <div className={styles.dados}>
            <h2 className={styles.titulo}>Sistema de Atendimento</h2>

            {/*Formulario*/}
            <form onSubmit={Salvar}>
                <label>Nome</label>
                <input type="text" placeholder="Nome" required="required" value={nome} onChange={e => setNome(e.target.value)}></input>
                <label>Especialidade:</label>
                <select id="especialidade" value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="">Selecione uma especialidade</option>
                    {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>
                <button>Cadastrar</button>
            </form>

            {/*Categorias e Lista de consultas*/}
            <div>
                {categorias.map(categoria => (
                    <div key={categoria}>
                       <div className={styles.categoria}>
                            <h3>{categoria}</h3>
                            <div className={styles.atendimento}>
                                <h4>Em atendimento:</h4>
                                <p>{pacientesAtendimento[categoria] && pacientesAtendimento[categoria].nome}</p>
                            </div>
                       </div>
                            <div className={styles.listaConsulta}>
                                {consultas.map((consulta, index) => (
                                    consulta.categoria === categoria && <p key={index}>{consulta.nome}</p>
                                ))}
                            </div>

                        <button className={styles.btnProximo} onClick={() => avancarConsulta(categoria)}>Proximo</button>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Form;
