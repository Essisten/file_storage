-- public.building_number definition
-- Drop table
-- DROP TABLE public.building_number;

CREATE TABLE public.building_number (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT building_number_pk PRIMARY KEY (id)
);


-- public.city_name definition
-- Drop table
-- DROP TABLE public.city_name;

CREATE TABLE public.city_name (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT city_name_pk PRIMARY KEY (id)
);


-- public.city_type definition
-- Drop table
-- DROP TABLE public.city_type;

CREATE TABLE public.city_type (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT city_type_pk PRIMARY KEY (id)
);


-- public.constructive_element_group definition
-- Drop table
-- DROP TABLE public.constructive_element_group;

CREATE TABLE public.constructive_element_group (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT constructive_element_group_pk PRIMARY KEY (id)
);


-- public.file_status definition
-- Drop table
-- DROP TABLE public.file_status;

CREATE TABLE public.file_status (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT file_status_pk PRIMARY KEY (id)
);


-- public.founded_address definition
-- Drop table
-- DROP TABLE public.founded_address;

CREATE TABLE public.founded_address (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT founded_address_pk PRIMARY KEY (id)
);


-- public.municipal_knowledge definition
-- Drop table
-- DROP TABLE public.municipal_knowledge;

CREATE TABLE public.municipal_knowledge (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT municipal_knowledge_pk PRIMARY KEY (id)
);


-- public.street_name definition
-- Drop table
-- DROP TABLE public.street_name;

CREATE TABLE public.street_name (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT street_name_pk PRIMARY KEY (id)
);


-- public.street_type definition
-- Drop table
-- DROP TABLE public.street_type;

CREATE TABLE public.street_type (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT street_type_pk PRIMARY KEY (id)
);


-- public."data" definition
-- Drop table
-- DROP TABLE public."data";

CREATE TABLE public."data" (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	municipal_area varchar NULL,
	municipal_knowledge int4 NULL,
	city_type int4 NULL,
	city_name int4 NULL,
	street_type int4 NULL,
	street_name int4 NULL,
	founded_address int4 NULL,
	building_number int4 NOT NULL,
	constructive_element_group int4 NOT NULL,
	capital_repair_year int4 NULL,
	repair_cost_preview numeric NULL DEFAULT 0,
	repair_end_year int4 NULL,
	federal_budget numeric NULL DEFAULT 0,
	regional_budget numeric NULL DEFAULT 0,
	local_budget numeric NULL DEFAULT 0,
	CONSTRAINT data_pk PRIMARY KEY (id),
	CONSTRAINT data_bn_fk FOREIGN KEY (building_number) REFERENCES public.building_number(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT data_ceg_fk FOREIGN KEY (constructive_element_group) REFERENCES public.constructive_element_group(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT data_cn_fk FOREIGN KEY (city_name) REFERENCES public.city_name(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT data_ct_fk FOREIGN KEY (city_type) REFERENCES public.city_type(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT data_fa_fk FOREIGN KEY (founded_address) REFERENCES public.founded_address(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT data_mk_fk FOREIGN KEY (municipal_knowledge) REFERENCES public.municipal_knowledge(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT data_sn_fk FOREIGN KEY (street_name) REFERENCES public.street_name(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT data_st_fk FOREIGN KEY (street_type) REFERENCES public.street_type(id) ON DELETE SET NULL ON UPDATE CASCADE
);


-- public.files definition
-- Drop table
-- DROP TABLE public.files;

CREATE TABLE public.files (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	upload_time time NULL,
	"name" varchar NOT NULL,
	"path" varchar NOT NULL,
	status int4 NOT NULL DEFAULT 1,
	CONSTRAINT files_pk PRIMARY KEY (id),
	CONSTRAINT files_fk FOREIGN KEY (status) REFERENCES public.file_status(id)
);