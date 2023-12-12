INSERT INTO usuariointerno(usuario, senha, nome, administrador) VALUES 
('admin', '95d23ba5a256375acfef4a75548b541c671a3d6361179603ccf66cb6328f84e2.4cec293704619345f5f5c0aeff24a9c72a4d628975e766ace808624b4625b210', 'Conta de administrador', true),
('vendedor', '5ba56285d84266b3afc64e4283a1ee0af948855f81151dccebf510a0fd5bbe72.40014d5a0b7f5c695aaed1b6837779ed915c8327435f02b7b807a850b99d029b', 'Conta de vendedor', false);

INSERT INTO cliente(cpf, nome, nascimento, endereco, telefone, email) VALUES
('87627451623', 'Pedro Augusto', '11-04-2003', 'Rua das Pitangas', '49991142212', NULL),
('12312837221', 'Carla Geovana', '10-09-2003', 'Rua Getúlio', NULL, NULL),
('92382347231', 'Gabriel Vargas', '01-12-2001', 'Avenida Fostfalen', NULL, '2004briel@gmail'),
('03945349483', 'Jardesson Parrera', '13-02-2003', 'Rua Batman da Silva', '11911273622', 'jardesson.parera@outlook.com'),
('02930943203', 'Joao Pedro', '08-01-2003', 'A única de nonoai', '84112039231', 'jaokanivete@gmail.com');

INSERT INTO produto(codigo, titulo, valor, estoque) VALUES
('3771564368856', 'Adubo Premium', 9990, 923),
('3471993274340', 'Fertilizante', 990, 12),
('6894759866883', 'Semente de soja', 99, 2938),
('8030305819308', 'Semente de milho', 79, 94),
('3048056312941', 'Enxada', 3995, 3),
('4922083519227', 'Machado', 7980, 2);

INSERT INTO pedido(codigo_cliente, codigo_vendedor) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

INSERT INTO produtopedido(codigo_pedido, codigo_produto, quantidade, valorun, desconto, devolvido) VALUES
(1, 1, 10, 1000, 0, 0),
(2, 1, 2, 9990, 0, 0),
(3, 2, 4, 1293, 0, 0),
(1, 3, 9, 1121, 0, 0),
(1, 4, 12, 1111, 0, 0),
(4, 5, 1, 1111, 0, 0);