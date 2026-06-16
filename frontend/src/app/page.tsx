"use client";

import { Button, Container, Alert } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="mt-5 text-center">
      <Alert variant="success">
        🚀 Next.js + Bootstrap успешно состыкованы и работают!
      </Alert>
      <Button variant="primary" size="lg">
        Проверка кнопки Bootstrap
      </Button>
    </Container>
  );
}
