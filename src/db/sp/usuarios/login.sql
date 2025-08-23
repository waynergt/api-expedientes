CREATE OR ALTER PROCEDURE sp_Usuarios_Login
  @Email NVARCHAR(200)
AS
BEGIN
    SELECT usuario_id, nombre, email, password_hash, rol, activo
    FROM Usuarios
    WHERE email = @Email AND activo = 1
END