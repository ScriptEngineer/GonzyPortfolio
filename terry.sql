--
-- PostgreSQL database dump
--

\restrict stKTuyfaaQoRFji2MUFTvvhJe108I4uw0bpqRfgadkedyRtjNolsNngjYfItCG0

-- Dumped from database version 16.11 (Homebrew)
-- Dumped by pg_dump version 16.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO gerardogonzalez;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardogonzalez
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO gerardogonzalez;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardogonzalez
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    phone text
);


ALTER TABLE public.customers OWNER TO gerardogonzalez;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardogonzalez
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO gerardogonzalez;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardogonzalez
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.inventory (
    product_id integer NOT NULL,
    warehouse_id integer NOT NULL,
    qty_on_hand integer DEFAULT 0 NOT NULL,
    qty_reserved integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.inventory OWNER TO gerardogonzalez;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.order_items (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    CONSTRAINT order_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.order_items OWNER TO gerardogonzalez;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    order_date date DEFAULT CURRENT_DATE NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL
);


ALTER TABLE public.orders OWNER TO gerardogonzalez;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardogonzalez
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO gerardogonzalez;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardogonzalez
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.products (
    id integer NOT NULL,
    sku text NOT NULL,
    name text NOT NULL,
    category_id integer,
    supplier_id integer,
    material text,
    finish text,
    unit_price numeric(10,2) NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.products OWNER TO gerardogonzalez;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardogonzalez
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO gerardogonzalez;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardogonzalez
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    name text NOT NULL,
    phone text,
    email text
);


ALTER TABLE public.suppliers OWNER TO gerardogonzalez;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardogonzalez
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_id_seq OWNER TO gerardogonzalez;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardogonzalez
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: warehouses; Type: TABLE; Schema: public; Owner: gerardogonzalez
--

CREATE TABLE public.warehouses (
    id integer NOT NULL,
    name text NOT NULL,
    city text,
    state text
);


ALTER TABLE public.warehouses OWNER TO gerardogonzalez;

--
-- Name: warehouses_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardogonzalez
--

CREATE SEQUENCE public.warehouses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.warehouses_id_seq OWNER TO gerardogonzalez;

--
-- Name: warehouses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardogonzalez
--

ALTER SEQUENCE public.warehouses_id_seq OWNED BY public.warehouses.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Name: warehouses id; Type: DEFAULT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.warehouses ALTER COLUMN id SET DEFAULT nextval('public.warehouses_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.categories (id, name) FROM stdin;
1	Living Room
2	Bedroom
3	Dining
4	Office
5	Outdoor
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.customers (id, name, email, phone) FROM stdin;
1	Ava Thompson	ava.thompson@example.com	555-222-3001
2	Liam Rivera	liam.rivera@example.com	555-222-3002
3	Mia Patel	mia.patel@example.com	555-222-3003
4	Noah Kim	noah.kim@example.com	555-222-3004
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.inventory (product_id, warehouse_id, qty_on_hand, qty_reserved) FROM stdin;
1	1	12	2
1	2	6	1
2	1	8	0
3	1	10	3
3	3	4	0
4	2	7	1
5	1	5	0
5	2	3	1
6	2	24	4
7	3	9	2
8	3	14	3
9	2	6	1
10	3	5	0
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.order_items (order_id, product_id, quantity, unit_price) FROM stdin;
1	1	1	899.00
1	6	4	169.00
2	3	1	749.00
2	4	1	679.00
3	7	1	399.00
3	8	1	249.00
4	5	1	1099.00
4	6	6	169.00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.orders (id, customer_id, order_date, status) FROM stdin;
1	1	2026-01-20	shipped
2	2	2026-01-25	processing
3	3	2026-02-01	pending
4	4	2026-02-03	delivered
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.products (id, sku, name, category_id, supplier_id, material, finish, unit_price, active) FROM stdin;
1	SOFA-001	Luna 3-Seat Sofa	1	1	Hardwood + Fabric	Walnut / Gray	899.00	t
2	CHAI-002	Solstice Chaise	1	2	Hardwood + Fabric	Natural / Beige	599.00	t
3	BED-003	Alder Queen Bed Frame	2	1	Solid Wood	Espresso	749.00	t
4	DRWR-004	Willow 6-Drawer Dresser	2	2	Solid Wood	Oak	679.00	t
5	TABL-005	Cascade Dining Table	3	1	Solid Wood	Natural	1099.00	t
6	CHIR-006	Haven Dining Chair	3	3	Wood + Upholstery	Black / Charcoal	169.00	t
7	DESK-007	Metro Writing Desk	4	3	Metal + Wood	Matte Black / Walnut	399.00	t
8	CHIR-008	Arc Task Chair	4	3	Mesh + Metal	Black	249.00	t
9	PATI-009	Breeze Outdoor Bench	5	2	Teak	Natural	429.00	t
10	PATI-010	Harbor Patio Table	5	2	Teak	Natural	529.00	t
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.suppliers (id, name, phone, email) FROM stdin;
1	Oak & Co Supply	555-111-2001	orders@oakco.com
2	Maple Ridge Mills	555-111-2002	sales@mapleridge.com
3	Urban Fabricators	555-111-2003	hello@urbanfab.com
\.


--
-- Data for Name: warehouses; Type: TABLE DATA; Schema: public; Owner: gerardogonzalez
--

COPY public.warehouses (id, name, city, state) FROM stdin;
1	Central DC	Dallas	TX
2	East DC	Atlanta	GA
3	West DC	Phoenix	AZ
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardogonzalez
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardogonzalez
--

SELECT pg_catalog.setval('public.customers_id_seq', 4, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardogonzalez
--

SELECT pg_catalog.setval('public.orders_id_seq', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardogonzalez
--

SELECT pg_catalog.setval('public.products_id_seq', 10, true);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardogonzalez
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 3, true);


--
-- Name: warehouses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardogonzalez
--

SELECT pg_catalog.setval('public.warehouses_id_seq', 3, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (product_id, warehouse_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_id, product_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_sku_key; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: inventory inventory_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: products products_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardogonzalez
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);


--
-- PostgreSQL database dump complete
--

\unrestrict stKTuyfaaQoRFji2MUFTvvhJe108I4uw0bpqRfgadkedyRtjNolsNngjYfItCG0

