CREATE OR ALTER PROCEDURE sp_Expedientes_Crear
  @Codigo NVARCHAR(50),
  @Descripcion NVARCHAR(255),
  @TecnicoId INT
AS
BEGIN
    INSERT INTO Expedientes (codigo, descripcion, tecnico_id, estado)
    VALUES (@Codigo, @Descripcion, @TecnicoId, 'pendiente');

    SELECT SCOPE_IDENTITY() AS expediente_id;
END