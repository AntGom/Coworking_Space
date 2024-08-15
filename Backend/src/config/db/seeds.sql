-- Insertar categorías de espacios
INSERT INTO categorias_espacios (nombre, descripcion)
VALUES
    ('Oficinas privadas', 'Espacios para trabajo individual o pequeños equipos'),
    ('Salas de reuniones', 'Espacios equipados para reuniones y presentaciones'),
    ('Espacios compartidos', 'Áreas abiertas para coworking');

-- Insertar categorías de incidencias
INSERT INTO categorias_incidencias (nombre, descripcion)
VALUES
    ('Electricidad', 'Problemas relacionados con instalaciones eléctricas'),
    ('Mobiliario', 'Incidencias relacionadas con muebles y equipamientos'),
    ('Limpieza', 'Problemas de limpieza y mantenimiento'),
    ('Otros', 'Incidencias que no se ajustan a las anteriores'),
    ('Incidencias', 'Incidencias sobre la reserva');

-- Insertar espacios
INSERT INTO espacios (nombre, descripcion, categoria_id, capacidad, precio_por_persona, precio_espacio_completo, direccion, estado,)
VALUES
    ('Oficina A1', 'Oficina privada con escritorio y silla ergonómica', 1, 1, 100.00, 400.00, 'Calle Principal 123', 'libre', ),
    ('Sala de Reuniones B', 'Sala equipada con proyector y pizarra', 2, 10, 20.00, 150.00, 'Avenida Central 456', 'libre', ),
    ('Espacio Compartido C', 'Área abierta con mesas compartidas', 3, 20, 10.00, 150.00, 'Plaza Mayor 789', 'libre', );

-- Insertar reservas
INSERT INTO reservas (usuario_id, espacio_id, tipo, fecha_inicio, fecha_fin, estado, observaciones)
VALUES
    ('71d2abfd-24c2-4335-8c0a-dbed788dbffb', 1, 'por_persona', '2024-07-01', '2024-07-01', 'reservado', 'Reserva para entrevista de trabajo'),
    ('2ef328f7-1257-4be4-baf0-bd4702af8239', 2, 'espacio_completo', '2024-07-02', '2024-07-02', 'reservado', 'Reunión mensual de equipo');

-- Insertar incidencias
INSERT INTO incidencias (espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo)
VALUES
    (1, 1, '71d2abfd-24c2-4335-8c0a-dbed788dbffb', 3, 'Suelo sucio y polvoriento'),
    (2, 2, '2ef328f7-1257-4be4-baf0-bd4702af8239', 1, 'Fallo en la iluminación');

INSERT INTO mensajes_incidencias (incidencia_id, mensaje, espacio_id, reserva_id, usuario_id)
VALUES
    (1, 'Se requiere limpieza urgente del suelo.', 1, 1, '71d2abfd-24c2-4335-8c0a-dbed788dbffb'),
    (2, 'Necesitamos revisión eléctrica lo antes posible.', 2, 2, '2ef328f7-1257-4be4-baf0-bd4702af8239');


-- Insertar valoraciones de espacios
INSERT INTO espacios_votos (value, usuario_id, espacio_id, reserva_id)
VALUES
    (4, '71d2abfd-24c2-4335-8c0a-dbed788dbffb', 1, 5),
    (5, '2ef328f7-1257-4be4-baf0-bd4702af8239', 2, 6);

-- Insertar fotos de espacios
INSERT INTO espacios_fotos (name, espacio_id)
VALUES
    ('oficina_a1_1.jpg', 1),
    ('sala_reuniones_b_1.jpg', 2),
    ('espacio_compartido_c_1.jpg', 3);

-- Insertar equipamientos
INSERT INTO equipamientos (nombre, descripcion)
VALUES
    ('Proyector', 'Proyector HD para presentaciones'),
    ('Impresora', 'Impresora láser multifuncional');

-- Insertar relación espacios_equipamientos
INSERT INTO espacios_equipamientos (espacio_id, equipamiento_id)
VALUES
    (2, 1),
    (1, 2);

-- Insertar pagos
INSERT INTO pagos (reserva_id, a_pagar, fecha_pago, metodo_pago, observaciones)
VALUES
    (1, 100.00, '2024-07-01', 'tarjeta', 'Pago por reserva de oficina privada'),
    (2, 150.00, '2024-07-02', 'efectivo', 'Pago por reserva de sala de reuniones');
