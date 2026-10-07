import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  // Validação frontend nativa
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, informe seu nome.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Por favor, informe seu e-mail.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Insira um e-mail válido.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Por favor, informe o assunto.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor, digite a sua mensagem.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "A mensagem deve ter pelo menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) return;

    setLoading(true);

    try {
      // Cole o seu endpoint único do Formspree no lugar de YOUR_FORMSPREE_ID
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: "Mensagem enviada com sucesso! Em breve entrarei em contato.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Erro na resposta do servidor");
      }
    } catch (err) {
      setStatusMessage({
        type: "danger",
        text: "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{ marginTop: "100px", maxWidth: "900px" }}
      className="pb-5"
    >
      <Row className="g-4">
        {/* Lado Esquerdo: Informações Pessoais */}
        <Col md={5}>
          <Card className="h-100 border-0 shadow-sm p-4 bg-light">
            <Card.Body>
              <h2 className="fw-bold mb-3">Alessandro Saldanha</h2>
              <p className="text-muted mb-4">
                Desenvolvedor Frontend & Full Stack. Entre em contato para
                dúvidas, sugestões ou oportunidades de trabalho!
              </p>

              <div className="d-flex flex-column gap-3 fs-5">
                <a
                  href="https://github.com/alessandrosaldanha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark fw-semibold"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/alessandrosaldanha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  LinkedIn
                </a>

                <div className="text-secondary fs-6 mt-3">
                  <strong>E-mail direto:</strong>
                  <br />
                  alessandrosaldanha.as@gmail.com
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Lado Direito: Formulário de Contato */}
        <Col md={7}>
          <Card className="border-0 shadow-sm p-4">
            <Card.Body>
              <h3 className="fw-bold mb-4">Envie uma mensagem</h3>

              {statusMessage && (
                <Alert variant={statusMessage.type}>{statusMessage.text}</Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="contactName">
                  <Form.Label className="fw-semibold">Nome completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactEmail">
                  <Form.Label className="fw-semibold">E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="seu.email@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactSubject">
                  <Form.Label className="fw-semibold">Assunto</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Assunto da mensagem"
                    value={formData.subject}
                    onChange={handleChange}
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactMessage">
                  <Form.Label className="fw-semibold">Mensagem</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Escreva sua mensagem aqui..."
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
