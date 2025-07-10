import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  createProyecto,
  ProyectoData,
} from "services/proyectosService";

// Nuevo proyecto no necesita id
type NewProyecto = Omit<ProyectoData, "id">;

const Projects: React.FC = () => {
  const [formData, setFormData] = useState<NewProyecto>({
    title: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ title: "", category: "", description: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Guarda el proyecto
      await createProyecto(formData);

      // Redirige a la gestión según categoría
      if (formData.category === "Extensionista") {
        navigate("/gestionar-proyectos/extensionista");
      } else {
        navigate("/gestionar-proyectos/voluntariado");
      }
    } catch (err) {
      console.error("Error guardando proyecto:", err);
      alert("No se pudo guardar el proyecto. Revisa la consola.");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <h5 className="mb-4">AGREGAR PROYECTO</h5>
            <Card>
              <CardBody>
                <h6 className="mb-3 text-muted">Información del proyecto</h6>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="title">
                      Título del proyecto
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ingrese el título"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="category">
                      Tipo de proyecto
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="select"
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione tipo</option>
                      <option value="Extensionista">Extensionista</option>
                      <option value="Voluntariado">Voluntariado</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="description">
                      Descripción
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Descripción del proyecto"
                      required
                    />
                  </FormGroup>

                  <div className="d-flex justify-content-end">
                    <Button
                      type="button"
                      color="info"
                      onClick={handleReset}
                      className="me-2"
                    >
                      Limpiar
                    </Button>
                    <Button type="submit" color="success">
                      Guardar
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Projects;