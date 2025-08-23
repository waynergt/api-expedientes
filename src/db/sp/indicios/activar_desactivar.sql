CREATE OR ALTER PROCEDURE sp_Indicios_ActivarDesactivar
  @IndicioId INT,
  @Activo BIT
AS
BEGIN
    UPDATE Indicios
    SET activo = @Activo
    WHERE indicio_id = @IndicioId;
END