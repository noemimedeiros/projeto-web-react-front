import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoAlunos = props => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios.get("https://demo6247081.mockable.io/enderecos")
      .then(response => {
        const enderecos = response.data.lista.map(c => {
          return {
            id: c.id,
            bairro: c.bairro,
            rua: c.rua,
            cidade: c.cidade,
            estado: c.estado,
            numero: c.numero,
            complemento: c.complemento
          };
        });

        axios.get("https://demo4838524.mockable.io/alunos")
          .then(response => {
            const alunos = response.data.lista.map(c => {
              return {
                id: c.id,
                cpf: c.cpf,
                matricula: c.matricula,
                nome: c.nome,
                idEndereco: c.idEndereco,
                curso: c.curso
              };
            });
            const alunosComEndereco = alunos.map(aluno => {
              const endereco = enderecos.find(end => end.id == aluno.idEndereco);
              return { ...aluno, idEndereco: `${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - N° ${endereco.numero}` };
            });
            setData(alunosComEndereco);
          })
        .catch(error => console.log(error));
      })
    .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("https://demo4838524.mockable.io/create-alunos", {
        "id": newData.id,
        "cpf": newData.cpf,
        "matricula": newData.matricula,
        "nome": newData.nome,
        "idEndereco": newData.idEndereco,
        "curso": newData.curso
      })
      .then(function (response) {
        console.log('Salvo com sucesso.')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("https://demo4838524.mockable.io/update-alunos", {
        "id": newData.id,
        "cpf": newData.cpf,
        "matricula": newData.matricula,
        "nome": newData.nome,
        "idEndereco": newData.idEndereco,
        "curso": newData.curso
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://demo4838524.mockable.io/delete-aluno", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  return (
    [

      <MaterialTable
        title="Gerenciamento de Alunos"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'CPF', field: 'cpf' },
          { title: 'Matrícula', field: 'matricula', type: 'numeric' },
          { title: 'Nome', field: 'nome' },
          { title: 'Endereço', field: 'idEndereco' },
          { title: 'Curso', field: 'curso' }
        ]}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreate(newData)

                const dataCreate = [...data];

                setData([...dataCreate, newData]);

                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleDelete(oldData)
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }}
      />]
  )
}

export default GerenciamentoAlunos;
