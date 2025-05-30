-- Script para crear la tabla activity_log para auditoría de cambios de roles
-- Ejecutar en Supabase SQL Editor

-- Crear la tabla activity_log
CREATE TABLE IF NOT EXISTS activity_log (
    id SERIAL PRIMARY KEY,
    admin_id UUID REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    user_id UUID REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índices para optimizar las consultas
CREATE INDEX IF NOT EXISTS idx_activity_log_admin_id ON activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_timestamp ON activity_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_activity_log_action ON activity_log(action);

-- Habilitar RLS (Row Level Security)
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Política para que solo administradores puedan leer los logs
CREATE POLICY "Admins can read activity logs" ON activity_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM usuario u 
            JOIN rol r ON u.rol = r.id_rol 
            WHERE u.id_usuario = auth.uid() 
            AND r.nombre_rol = 'admin'
        )
    );

-- Política para que solo administradores puedan insertar logs
CREATE POLICY "Admins can insert activity logs" ON activity_log
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuario u 
            JOIN rol r ON u.rol = r.id_rol 
            WHERE u.id_usuario = auth.uid() 
            AND r.nombre_rol = 'admin'
        )
    );

-- Comentarios en la tabla
COMMENT ON TABLE activity_log IS 'Registro de actividades administrativas para auditoría';
COMMENT ON COLUMN activity_log.admin_id IS 'ID del administrador que realizó la acción';
COMMENT ON COLUMN activity_log.user_id IS 'ID del usuario afectado (si aplica)';
COMMENT ON COLUMN activity_log.action IS 'Tipo de acción realizada (role_change, user_delete, etc.)';
COMMENT ON COLUMN activity_log.description IS 'Descripción detallada de la acción';
COMMENT ON COLUMN activity_log.timestamp IS 'Fecha y hora cuando se realizó la acción';
