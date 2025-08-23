CREATE OR ALTER PROCEDURE sp_Indicios_ListarPorExpediente
  @ExpedienteId INT
AS
BEGIN
    SELECT indicio_id, expediente_id, codigo, descripcion, peso, color, tamano, activo
    FROM Indicios
    WHERE expediente_id = @ExpedienteId;
END