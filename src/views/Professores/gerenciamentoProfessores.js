import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoProfessores = props => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

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

        axios.get("https://demo4838524.mockable.io/professores")
          .then(response => {
            const professores = response.data.lista.map(c => {
              return {
                id: c.id,
                matricula: c.matricula,
                nome: c.nome,
                curso: c.curso,
                idEndereco: c.idEndereco
              };
            });
            const professoresComEndereco = professores.map(professor => {
              const endereco = enderecos.find(end => end.id == professor.idEndereco);
              return { ...professor, idEndereco: `${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - N° ${endereco.numero}` };
            });
            setData(professoresComEndereco);
          })
        .catch(error => console.log(error));
      })
    .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("https://demo4838524.mockable.io/create-professores", {
        "id": newData.id,
        "matricula": newData.matricula,
        "nome": newData.nome,
        "curso": newData.curso,
        "idEndereco": newData.idEndereco,
      })
      .then(function (response) {
        console.log('Salvo com sucesso.')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("https://demo4838524.mockable.io/update-professores", {
        "id": newData.id,
        "matricula": newData.matricula,
        "nome": newData.nome,
        "curso": newData.curso,
        "idEndereco": newData.idEndereco
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://demo4838524.mockable.io/delete-professor", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  return (
    [

      <MaterialTable
        title="Gerenciamento de Professores"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Matrícula', field: 'matricula', type: 'numeric' },
          { title: 'Nome', field: 'nome' },
          { title: 'Curso', field: 'curso' },
          { title: 'Endereço', field: 'idEndereco' },
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

export default GerenciamentoProfessores;