USE [expedientes_db];
GO

-- Usuario técnico
INSERT INTO Usuarios (nombre, email, password_hash, rol)
VALUES ('Tecnico Demo', 'tecnico@demo.com', '$2b$10$hashfalsoTecnico', 'tecnico');

-- Usuario coordinador
INSERT INTO Usuarios (nombre, email, password_hash, rol)
VALUES ('Coordinador Demo', 'coordinador@demo.com', '$2b$10$hashfalsoCoord', 'coordinador');