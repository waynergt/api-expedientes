CREATE OR ALTER PROCEDURE sp_Expedientes_CambiarEstado
  @ExpedienteId INT,
  @NuevoEstado NVARCHAR(20),
  @Justificacion NVARCHAR(255),
  @AprobadorId INT
AS
BEGIN
    UPDATE Expedientes
    SET estado = @NuevoEstado,
        justificacion = @Justificacion,
        aprobador_id = @AprobadorId,
        fecha_estado = SYSDATETIME()
    WHERE expediente_id = @ExpedienteId AND activo = 1;
END