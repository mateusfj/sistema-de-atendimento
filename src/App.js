import './App.css';
import Form from './Form';


/*Desenvolva um sistema para organizar os atendimentos em uma clínica.
Quando um paciente chega, a atendente pergunta o nome do paciente e qual especialidade médica ele precisa:
Ortopedia, Cardiologia ou Psiquiatria.
Os pacientes são adicionados a uma fila de espera visível.
O atendente pode clicar em um botão para chamar o próximo paciente da fila de Ortopedia, Cardiologia ou Psiquiatria para atendimento, fazendo com que os outros pacientes na fila avancem uma posição.*/


function App() {
  return (
    <div className="App">
      <Form/>
    </div>
  );
}

export default App;
