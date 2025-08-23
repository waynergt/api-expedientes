CREATE OR ALTER PROCEDURE sp_Indicios_Crear
  @ExpedienteId INT,
  @Codigo NVARCHAR(50),
  @Descripcion NVARCHAR(255),
  @Peso DECIMAL(10,2),
  @Color NVARCHAR(50),
  @Tamano NVARCHAR(50)
AS
BEGIN
    INSERT INTO Indicios (expediente_id, codigo, descripcion, peso, color, tamano)
    VALUES (@ExpedienteId, @Codigo, @Descripcion, @Peso, @Color, @Tamano);

    SELECT SCOPE_IDENTITY() AS indicio_id;
END