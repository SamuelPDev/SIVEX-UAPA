import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import {
  getProyectos,
  updateProyecto,
  ProyectoData,
} from "services/proyectosService";

type EditData = Omit<ProyectoData, "id">;

const EditProject: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EditData>({
    title: "",
    category: category || "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProyectos().then((res) => {
      const project = res.data.find((p) => p.id === id);
      if (project) {
        setFormData({
          title: project.title,
          category: project.category,
          description: project.description,
        });
      } else {
        alert("Proyecto no encontrado");
        navigate(`/gestionar-proyectos/${category}`);
      }
      setLoading(false);
    });
  }, [id, category, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    // Reset to original
    getProyectos().then((res) => {
      const project = res.data.find((p) => p.id === id);
      if (project) {
        setFormData({
          title: project.title,
          category: project.category,
          description: project.description,
        });
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProyecto(id!, formData);
      navigate(`/gestionar-proyectos/${formData.category.toLowerCase()}`);
    } catch (err) {
      console.error("Error actualizando proyecto:", err);
      alert("No se pudo actualizar el proyecto.");
    }
  };

  if (loading) {
    return (
      <div className="page-content">
        <Container fluid>
          <p>Cargando proyecto...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <h5 className="mb-4">EDITAR PROYECTO</h5>
            <Card>
              <CardBody>
                <h6 className="mb-3 text-muted">Información del proyecto</h6>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="title">
                      Título del proyecto<span className="text-danger">*</span>
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
                      Tipo de proyecto<span className="text-danger">*</span>
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
                      Descripción<span className="text-danger">*</span>
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
                    <Button type="submit" color="primary">
                      Actualizar
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

export default EditProject;
