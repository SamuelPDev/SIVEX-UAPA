import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Row, Col, Card, CardBody,
  Form, FormGroup, Label, Input, Button
} from "reactstrap";
import { createStudent, StudentData } from "services/studentsService";

const semesterOptions = Array.from({ length: 15 }, (_, i) => `${i + 1}º Semestre`);

const AddStudent: React.FC = () => {
  const [form, setForm] = useState<StudentData>({
    id: "",
    nombre: "",
    carrera: "",
    email: "",
    semestre: "",
    estado: true,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.endsWith("@p.uapa.edu.do")) {
      return alert("El correo debe terminar en @p.uapa.edu.do");
    }
    if (!form.id.trim()) {
      return alert("El ID es requerido.");
    }
    await createStudent(form);
    navigate("/gestionar-estudiantes");
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row><Col lg={12}><h5 className="mb-4">AGREGAR ESTUDIANTE</h5></Col></Row>
        <Row><Col lg={8} className="mx-auto">
          <Card><CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="id">
                  ID<span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="id"
                  id="id"
                  value={form.id}
                  onChange={handleChange}
                  placeholder="Ej: 2024-001"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="nombre">
                  Nombre<span className="text-danger">*</span>
                </Label>
                <Input
                  name="nombre"
                  id="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="carrera">
                  Carrera<span className="text-danger">*</span>
                </Label>
                <Input
                  name="carrera"
                  id="carrera"
                  value={form.carrera}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">
                  Email<span className="text-danger">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="semestre">
                  Semestre<span className="text-danger">*</span>
                </Label>
                <Input
                  type="select"
                  name="semestre"
                  id="semestre"
                  value={form.semestre}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  {semesterOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="estado"
                    checked={form.estado}
                    onChange={handleChange}
                  />{' '}
                  Activo
                </Label>
              </FormGroup>
              <div className="d-flex justify-content-end mt-3">
                <Button color="success" type="submit">Guardar</Button>
              </div>
            </Form>
          </CardBody></Card>
        </Col></Row>
      </Container>
    </div>
  );
};

export default AddStudent;