
import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { getProyectos, deleteProyecto } from "services/proyectosService";

interface Proyecto {
  id: string;
  title: string;
  category: string;
  description: string;
}

const ManageExtensionista: React.FC = () => {
  const [items, setItems] = useState<Proyecto[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetch = async () => {
    try {
      const res = await getProyectos();
      setItems(res.data);
    } catch (e) {
      console.error(e);
      alert("Error cargando proyectos.");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = useMemo(
    () =>
      items
        .filter((p) => p.category === "Extensionista")
        .filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        ),
    [items, search]
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="page-content">
      <Container fluid>
        {/* Top bar: busqueda + añadir */}
        <Row className="align-items-center mb-3">
          <Col>
            <Input
              type="search"
              placeholder="Buscar proyecto..."
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              style={{ maxWidth: 300 }}
            />
          </Col>
          <Col className="text-end">
            <Link to="/agregar-proyectos">
              <Button color="primary">+ Añadir Proyecto</Button>
            </Link>
          </Col>
        </Row>

        {/* Tabla */}
        <Row>
          <Col>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th style={{ width: 120 }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{p.description}</td>
                    <td>
                      <Link
                        to={`/editar-proyectos/extensionista/${p.id}`}
                        className="btn btn-sm btn-secondary me-2"
                      >
                        ✏️
                      </Link>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={async () => {
                          if (window.confirm("¿Eliminar proyecto?")) {
                            await deleteProyecto(p.id);
                            fetch();
                          }
                        }}
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Paginación */}
        <Row>
          <Col>
            <Pagination>
              <PaginationItem disabled={page <= 1}>
                <PaginationLink
                  previous
                  onClick={() => page > 1 && setPage(page - 1)}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem active={i + 1 === page} key={i}>
                  <PaginationLink onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={page >= totalPages}>
                <PaginationLink
                  next
                  onClick={() => page < totalPages && setPage(page + 1)}
                />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageExtensionista;