CREATE TABLE IF NOT EXISTS cliente (
    codigo SERIAL PRIMARY KEY,
    nome varchar(128) NOT NULL,
    cpf varchar(11) NOT NULL,
    nascimento date NOT NULL,
    email varchar(128) DEFAULT NULL,
    telefone varchar(32) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS UsuarioInterno (
    codigo SERIAL PRIMARY KEY,
    usuario varchar(16) NOT NULL,
    senha varchar(129) NOT NULL,
    nome varchar(128) NOT NULL,
    administrador boolean NOT NULL DEFAULT false,
    ativo boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS Pedido (
    codigo SERIAL PRIMARY KEY,
    data_pedido date NOT NULL DEFAULT now(),
    codigo_cliente int NOT NULL,
    codigo_vendedor int NOT NULL,
    FOREIGN KEY (codigo_cliente) REFERENCES cliente (codigo),
    FOREIGN KEY (codigo_vendedor) REFERENCES UsuarioInterno (codigo)
);

CREATE TABLE IF NOT EXISTS Produto (
    codigo varchar(13) PRIMARY KEY,
    titulo varchar(128) NOT NULL,
    valor int NOT NULL,
    estoque int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ProdutoPedido (
    codigo_pedido int NOT NULL,
    codigo_produto varchar(13) NOT NULL,
    quantidade int NOT NULL,
    valorun int NOT NULL,
    desconto int NOT NULL DEFAULT 0,
    devolvido int NOT NULL DEFAULT 0,
    PRIMARY KEY (codigo_pedido, codigo_produto),
    FOREIGN KEY (codigo_pedido) REFERENCES Pedido (codigo),
    FOREIGN KEY (codigo_produto) REFERENCES Produto (codigo)
);