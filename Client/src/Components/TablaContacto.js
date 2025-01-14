import { Table } from 'reactstrap';

const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) => {

    const enviarDatos = (contacto)=>{
        setEditar(contacto);
        setMostrarModal(!mostrarModal);
    };

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Id Contacto</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ):(
                        data.map((item)=>(
                            <tr key={item.idContacto}>
                                <td>{item.idContacto}</td>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <button color="primary" size="sm" className='me-2'
                                        onClick={()=>enviarDatos(item)}>Editar</button>
                                    <button color="danger" size="sm" onClick={()=>eliminarContacto(item.idContacto)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    );
};

export default TablaContacto;