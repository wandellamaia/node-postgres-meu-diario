-- Table: public.pessoa

-- DROP TABLE public.pessoa;

CREATE TABLE public.pessoa
(
    id integer NOT NULL DEFAULT nextval('pessoa_id_seq'::regclass),
    nome character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    senha character varying(50) COLLATE pg_catalog."default" NOT NULL,
    genero character varying(1) COLLATE pg_catalog."default",
    data_nascimento date NOT NULL,
    estado_civil character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT pessoa_pkey PRIMARY KEY (id),
    CONSTRAINT pessoa_email_key UNIQUE (email),
    CONSTRAINT pessoa_nome_key UNIQUE (nome)
)

TABLESPACE pg_default;

ALTER TABLE public.pessoa
    OWNER to postgres;