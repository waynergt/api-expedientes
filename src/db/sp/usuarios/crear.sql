CREATE OR ALTER PROCEDURE sp_Usuarios_Crear
  @Nombre NVARCHAR(100),
  @Email NVARCHAR(200),
  @PasswordHash NVARCHAR(255),
  @Rol NVARCHAR(20)
AS
BEGIN
    INSERT INTO Usuarios (nombre, email, password_hash, rol)
    VALUES (@Nombre, @Email, @PasswordHash, @Rol);

    SELECT SCOPE_IDENTITY() AS usuario_id;
END