-- Database set up required in CLI

CREATE SCHEMA product_schema;

CREATE TABLE product_schema.products (
    table_id SERIAL,
    id integer PRIMARY KEY,
    name character(100) NOT NULL,
    slogan character(100) NOT NULL,
    description character(300) NOT NULL,
    category character(30) NOT NULL,
    default_price character(10) NOT NULL
);

CREATE TABLE product_schema.product_id (
    table_id SERIAL,
    id integer,
    name character(50) NOT NULL,
    slogan character(100) NOT NULL,
    description character(300) NOT NULL,
    category character(50) NOT NULL,
    features json,
    CONSTRAINT fk_product_id
        FOREIGN KEY(id) REFERENCES product_schema.products(id)
);

--INSERT INTO product_schema.product_id (id, name, slogan, description, category, features) VALUES (1, 'hello', 'the best you can get!', 'only the best shoes are sold at this store', 'shoes', '{"hello":true}');

CREATE TABLE product_schema.styles (
    table_id SERIAL,
    id integer,
    results json,
    CONSTRAINT fk_id
        FOREIGN KEY(id) REFERENCES product_schema.products(id)
);

CREATE TABLE product_schema.related (
    table_id SERIAL,
    product_id integer,
    related json,
     CONSTRAINT fk_id
        FOREIGN KEY(product_id) REFERENCES product_schema.products(id)
)
