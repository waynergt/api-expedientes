CREATE OR ALTER PROCEDURE sp_Expedientes_ActivarDesactivar
  @ExpedienteId INT,
  @Activo BIT
AS
BEGIN
    UPDATE Expedientes
    SET activo = @Activo
    WHERE expediente_id = @ExpedienteId;
END