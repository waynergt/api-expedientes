CREATE OR ALTER PROCEDURE sp_Expedientes_Listar
  @TecnicoId INT = NULL,
  @Estado NVARCHAR(20) = NULL,
  @Buscar NVARCHAR(100) = NULL,
  @Offset INT = 0,
  @Limit INT = 20
AS
BEGIN
    SELECT expediente_id, codigo, descripcion, tecnico_id, estado, justificacion, aprobador_id, fecha_estado, activo
    FROM Expedientes
    WHERE (COALESCE(@TecnicoId, 0) = 0 OR tecnico_id = @TecnicoId)
      AND (COALESCE(@Estado, '') = '' OR estado = @Estado)
      AND (COALESCE(@Buscar, '') = '' OR codigo LIKE '%' + @Buscar + '%' OR descripcion LIKE '%' + @Buscar + '%')
    ORDER BY expediente_id DESC
    OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY;
END