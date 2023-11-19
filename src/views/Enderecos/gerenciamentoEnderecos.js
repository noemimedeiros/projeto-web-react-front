import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoEnderecos = props => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("https://demo6247081.mockable.io/enderecos")
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
        setData(enderecos);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("https://demo6247081.mockable.io/create-enderecos", {
        "id": newData.id,
        "bairro": newData.bairro,
        "rua": newData.rua,
        "cidade": newData.cidade,
        "estado": newData.estado,
        "numero": newData.numero,
        "complemento": newData.complemento,
      })
      .then(function (response) {
        console.log('Salvo com sucesso.')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("https://demo6247081.mockable.io/update-enderecos", {
        "id": newData.id,
        "bairro": newData.bairro,
        "rua": newData.rua,
        "cidade": newData.cidade,
        "estado": newData.estado,
        "numero": newData.numero,
        "complemento": newData.complemento,
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://demo6247081.mockable.io/delete-endereco", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  return (
    [

      <MaterialTable
        title="Gerenciamento de Endereços"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Bairro', field: 'bairro', type: 'numeric' },
          { title: 'Rua', field: 'rua' },
          { title: 'Cidade', field: 'cidade' },
          { title: 'Estado', field: 'estado' },
          { title: 'Número', field: 'numero' },
          { title: 'Complemento', field: 'complemento' }
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

export default GerenciamentoEnderecos;