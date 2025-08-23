CREATE OR ALTER PROCEDURE sp_Indicios_Actualizar
  @IndicioId INT,
  @Descripcion NVARCHAR(255),
  @Peso DECIMAL(10,2),
  @Color NVARCHAR(50),
  @Tamano NVARCHAR(50)
AS
BEGIN
    UPDATE Indicios
    SET descripcion = @Descripcion,
        peso = @Peso,
        color = @Color,
        tamano = @Tamano
    WHERE indicio_id = @IndicioId AND activo = 1;
END