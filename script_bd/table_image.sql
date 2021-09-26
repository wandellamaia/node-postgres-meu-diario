-- Table: public.image

-- DROP TABLE public.image;

CREATE TABLE public.image
(
    id integer NOT NULL DEFAULT nextval('image_id_seq'::regclass),
    contenttype text COLLATE pg_catalog."default",
    filebase64 text COLLATE pg_catalog."default",
    filename text COLLATE pg_catalog."default",
    relatos_id integer NOT NULL,
    CONSTRAINT image_pkey PRIMARY KEY (id),
    CONSTRAINT image_relatos_id_fkey FOREIGN KEY (relatos_id)
        REFERENCES public.relatos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.image
    OWNER to postgres;