USE [expedientes_db];
GO

-- Usuarios
CREATE TABLE Usuarios (
    usuario_id      INT IDENTITY(1,1) PRIMARY KEY,
    nombre          NVARCHAR(100) NOT NULL,
    email           NVARCHAR(200) NOT NULL UNIQUE,
    password_hash   NVARCHAR(255) NOT NULL,
    rol             NVARCHAR(20) NOT NULL, -- 'tecnico' o 'coordinador'
    activo          BIT NOT NULL DEFAULT 1
);

-- Expedientes
CREATE TABLE Expedientes (
    expediente_id   INT IDENTITY(1,1) PRIMARY KEY,
    codigo          NVARCHAR(50) NOT NULL UNIQUE,
    descripcion     NVARCHAR(255) NOT NULL,
    tecnico_id      INT NOT NULL,
    estado          NVARCHAR(20) NOT NULL DEFAULT 'pendiente', -- 'pendiente', 'aprobado', 'rechazado'
    justificacion   NVARCHAR(255),
    aprobador_id    INT,
    fecha_estado    DATETIME2,
    activo          BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Expedientes_Usuario FOREIGN KEY (tecnico_id) REFERENCES Usuarios(usuario_id),
    CONSTRAINT FK_Expedientes_Aprobador FOREIGN KEY (aprobador_id) REFERENCES Usuarios(usuario_id)
);

-- Indicios
CREATE TABLE Indicios (
    indicio_id      INT IDENTITY(1,1) PRIMARY KEY,
    expediente_id   INT NOT NULL,
    codigo          NVARCHAR(50) NOT NULL,
    descripcion     NVARCHAR(255) NOT NULL,
    peso            DECIMAL(10,2) NOT NULL CHECK (peso >= 0),
    color           NVARCHAR(50) NOT NULL,
    tamano          NVARCHAR(50) NOT NULL,
    activo          BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Indicios_Expediente FOREIGN KEY (expediente_id) REFERENCES Expedientes(expediente_id)
);

-- Unicidad de codigo de indicio por expediente
CREATE UNIQUE INDEX UQ_Indicios_Codigo_Expediente ON Indicios(expediente_id, codigo);