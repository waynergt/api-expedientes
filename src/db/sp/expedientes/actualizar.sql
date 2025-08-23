CREATE OR ALTER PROCEDURE sp_Expedientes_Actualizar
  @ExpedienteId INT,
  @Descripcion NVARCHAR(255)
AS
BEGIN
    UPDATE Expedientes
    SET descripcion = @Descripcion
    WHERE expediente_id = @ExpedienteId AND activo = 1;
END