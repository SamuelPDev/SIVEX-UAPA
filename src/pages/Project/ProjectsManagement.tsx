
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

interface Proyecto { id: string; title: string; category: string; description: string; }

interface Props { category: "Extensionista" | "Voluntariado"; }

const ProjectsManagement: React.FC<Props> = ({ category }) => {
  const [items, setItems] = useState<Proyecto[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => { fetch(); }, []);
  const fetch = async () => {
    try {
      const res = await getProyectos();
      setItems(res.data);
    } catch (e) {
      console.error(e);
      alert("Error cargando proyectos.");
    }
  };

  const filtered = useMemo(() => 
    items
      .filter((p) => p.category === category)
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase())),
    [items, category, search]
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="mb-3">
          <Col xl="6">
            <h5>Gestión de Proyectos: {category}</h5>
          </Col>
          <Col xl="6" className="text-end">
            <Input
              type="search"
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              placeholder="Buscar por título..."
              style={{ maxWidth: 300, display: "inline-block", marginRight: 10 }}
            />
            <Link to="/agregar-proyectos">
              <Button color="primary">+ Añadir Proyecto</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Acción</th>
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
                        to={`/editar-proyectos/${category.toLowerCase()}/${p.id}`}
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

            {/* Paginación */}
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

export default ProjectsManagement;