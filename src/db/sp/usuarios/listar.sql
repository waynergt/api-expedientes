CREATE PROCEDURE sp_Usuarios_Listar
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Obtener el total de registros
    SELECT COUNT(*) as total
    FROM Usuarios
    WHERE activo = 1;

    -- Obtener los usuarios paginados
    SELECT 
        usuario_id as id,
        nombre,
        email,
        rol,
        activo
    FROM Usuarios
    WHERE activo = 1
    ORDER BY nombre
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
