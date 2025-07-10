import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
import {
  getStudents,
  deleteStudent,
  StudentData,
} from "services/studentsService";

const ManageStudents: React.FC = () => {
  const [data, setData] = useState<StudentData[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetch = async () => {
    const res = await getStudents();
    setData(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = useMemo(
    () =>
      data.filter((s) =>
        s.nombre.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="align-items-center mb-3">
          <Col>
            <Input
              placeholder="Buscar estudiante..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              style={{ maxWidth: 300 }}
            />
          </Col>
          <Col className="text-end">
            <Link to="/agregar-estudiante">
              <Button color="primary">+ Añadir Estudiante</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Email</th>
                  <th>Semestre</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {current.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.nombre}</td>
                    <td>{s.carrera}</td>
                    <td>{s.email}</td>
                    <td>{s.semestre}</td>
                    <td>{s.estado ? "Activo" : "Inactivo"}</td>
                    <td>
                      <Link
                        to={`/editar-estudiante/${s.id}`}
                        className="btn btn-sm btn-secondary me-2"
                      >
                        ✏️
                      </Link>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={async () => {
                          if (window.confirm("¿Eliminar estudiante?")) {
                            await deleteStudent(s.id);
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

export default ManageStudents;