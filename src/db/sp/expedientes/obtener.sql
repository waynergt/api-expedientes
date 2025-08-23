CREATE OR ALTER PROCEDURE sp_Expedientes_Obtener
  @ExpedienteId INT
AS
BEGIN
    SELECT expediente_id, codigo, descripcion, tecnico_id, estado, justificacion, aprobador_id, fecha_estado, activo
    FROM Expedientes
    WHERE expediente_id = @ExpedienteId;
END