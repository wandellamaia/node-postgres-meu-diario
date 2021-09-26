-- Table: public.relatos

-- DROP TABLE public.relatos;

CREATE TABLE public.relatos
(
    id integer NOT NULL DEFAULT nextval('relatos_id_seq'::regclass),
    data_relato date,
    humor character varying(15) COLLATE pg_catalog."default",
    titulo character varying(40) COLLATE pg_catalog."default",
    descricao text COLLATE pg_catalog."default",
    pessoa_id integer NOT NULL,
    CONSTRAINT relatos_pkey PRIMARY KEY (id),
    CONSTRAINT relatos_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.relatos
    OWNER to postgres;