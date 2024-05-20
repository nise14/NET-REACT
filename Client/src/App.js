import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import TablaContacto from './Components/TablaContacto';
import { useEffect, useState } from 'react';
import ModalContacto from './Components/ModalContacto';

const App = () => {
  const [contactos, setContactos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editar, setEditar] = useState(null);

  const mostrarContactos = async () => {
    try {
      var url = `${process.env.REACT_APP_BASE_URL}/api/contacto/lista`;
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/contacto/lista`);

      if (response.ok) {
        const data = await response.json();
        setContactos(data);
      }
      else {
        console.log("error en la lista");
      }
    }
    catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    mostrarContactos();
  }, [])

  const guardarContacto = async (contacto) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/contacto/Guardar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;chatset=utf-8'
      },
      body: JSON.stringify(contacto)
    });

    if (response.ok) {
      setMostrarModal(!mostrarModal);
      mostrarContactos();
    }
  };

  const EditarContacto = async (contacto) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/contacto/Editar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;chatset=utf-8'
      },
      body: JSON.stringify(contacto)
    });

    if (response.ok) {
      setMostrarModal(!mostrarModal);
      mostrarContactos();
    }
  };

  const eliminarContacto = async (id) => {
    var respuesta = window.confirm("Desea eliminar el contacto?");

    if (!respuesta) {
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/contacto/Eliminar/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      mostrarContactos();
    }
  };

  return (
    <Container>
      <Row className='mt-5'>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Lista de Contactos</h5>
            </CardHeader>
            <CardBody>
              <Button size='sm' color='success' onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Contacto</Button>
              <hr></hr>
              <TablaContacto data={contactos}
                setEditar={setEditar}
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal} 
                eliminarContacto = {eliminarContacto}/>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ModalContacto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        guardarContacto={guardarContacto}
        editar={editar}
        setEditar={setEditar}
        editarContacto={EditarContacto} />
    </Container>
  );
};

export default App;