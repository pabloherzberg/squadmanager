PGDMP  
                    |            squad_manager    16.3    16.3    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    squad_manager    DATABASE     �   CREATE DATABASE squad_manager WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE squad_manager;
                postgres    false            c           1247    20435    enum_squadmembers_role    TYPE     Y   CREATE TYPE public.enum_squadmembers_role AS ENUM (
    'Gerente',
    'Funcionário'
);
 )   DROP TYPE public.enum_squadmembers_role;
       public          postgres    false            f           1247    21212    enum_tasks_status    TYPE     Y   CREATE TYPE public.enum_tasks_status AS ENUM (
    'pending',
    'doing',
    'done'
);
 $   DROP TYPE public.enum_tasks_status;
       public          postgres    false            `           1247    16480    enum_users_role    TYPE     R   CREATE TYPE public.enum_users_role AS ENUM (
    'Gerente',
    'Funcionário'
);
 "   DROP TYPE public.enum_users_role;
       public          postgres    false            �            1259    16427    squadmembers    TABLE     S  CREATE TABLE public.squadmembers (
    squadmemberid integer NOT NULL,
    squadid integer NOT NULL,
    userid integer NOT NULL,
    role public.enum_squadmembers_role NOT NULL,
    CONSTRAINT squadmembers_role_check CHECK (((role)::text = ANY (ARRAY[('Gerente'::character varying)::text, ('Funcionário'::character varying)::text])))
);
     DROP TABLE public.squadmembers;
       public         heap    postgres    false    867            �            1259    16426    squadmembers_squadmemberid_seq    SEQUENCE     �   CREATE SEQUENCE public.squadmembers_squadmemberid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.squadmembers_squadmemberid_seq;
       public          postgres    false    220            �           0    0    squadmembers_squadmemberid_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.squadmembers_squadmemberid_seq OWNED BY public.squadmembers.squadmemberid;
          public          postgres    false    219            �            1259    16412    squads    TABLE     �   CREATE TABLE public.squads (
    squadid integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    createdby integer NOT NULL,
    createdat timestamp with time zone
);
    DROP TABLE public.squads;
       public         heap    postgres    false            �            1259    16411    squads_squadid_seq    SEQUENCE     �   CREATE SEQUENCE public.squads_squadid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.squads_squadid_seq;
       public          postgres    false    218            �           0    0    squads_squadid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.squads_squadid_seq OWNED BY public.squads.squadid;
          public          postgres    false    217            �            1259    16467    taskevidence    TABLE     
  CREATE TABLE public.taskevidence (
    evidenceid integer NOT NULL,
    taskid integer NOT NULL,
    evidencepath character varying(255),
    uploadedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description text,
    status character varying(20)
);
     DROP TABLE public.taskevidence;
       public         heap    postgres    false            �            1259    16466    taskevidence_evidenceid_seq    SEQUENCE     �   CREATE SEQUENCE public.taskevidence_evidenceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.taskevidence_evidenceid_seq;
       public          postgres    false    224            �           0    0    taskevidence_evidenceid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.taskevidence_evidenceid_seq OWNED BY public.taskevidence.evidenceid;
          public          postgres    false    223            �            1259    16445    tasks    TABLE     �  CREATE TABLE public.tasks (
    taskid integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    duedate timestamp with time zone NOT NULL,
    assignedto integer NOT NULL,
    squadid integer NOT NULL,
    status character varying(20) DEFAULT 'todo'::character varying,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    16444    tasks_taskid_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_taskid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.tasks_taskid_seq;
       public          postgres    false    222            �           0    0    tasks_taskid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.tasks_taskid_seq OWNED BY public.tasks.taskid;
          public          postgres    false    221            �            1259    16399    users    TABLE     �  CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    passwordhash character varying(255) NOT NULL,
    role public.enum_users_role NOT NULL,
    createdat timestamp with time zone,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY (ARRAY[('Gerente'::character varying)::text, ('Funcionário'::character varying)::text])))
);
    DROP TABLE public.users;
       public         heap    postgres    false    864            �            1259    16398    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    216            �           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    215            o           2604    16430    squadmembers squadmemberid    DEFAULT     �   ALTER TABLE ONLY public.squadmembers ALTER COLUMN squadmemberid SET DEFAULT nextval('public.squadmembers_squadmemberid_seq'::regclass);
 I   ALTER TABLE public.squadmembers ALTER COLUMN squadmemberid DROP DEFAULT;
       public          postgres    false    220    219    220            n           2604    16415    squads squadid    DEFAULT     p   ALTER TABLE ONLY public.squads ALTER COLUMN squadid SET DEFAULT nextval('public.squads_squadid_seq'::regclass);
 =   ALTER TABLE public.squads ALTER COLUMN squadid DROP DEFAULT;
       public          postgres    false    217    218    218            s           2604    16470    taskevidence evidenceid    DEFAULT     �   ALTER TABLE ONLY public.taskevidence ALTER COLUMN evidenceid SET DEFAULT nextval('public.taskevidence_evidenceid_seq'::regclass);
 F   ALTER TABLE public.taskevidence ALTER COLUMN evidenceid DROP DEFAULT;
       public          postgres    false    224    223    224            p           2604    16448    tasks taskid    DEFAULT     l   ALTER TABLE ONLY public.tasks ALTER COLUMN taskid SET DEFAULT nextval('public.tasks_taskid_seq'::regclass);
 ;   ALTER TABLE public.tasks ALTER COLUMN taskid DROP DEFAULT;
       public          postgres    false    222    221    222            m           2604    16402    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    16427    squadmembers 
   TABLE DATA           L   COPY public.squadmembers (squadmemberid, squadid, userid, role) FROM stdin;
    public          postgres    false    220   LK      �          0    16412    squads 
   TABLE DATA           R   COPY public.squads (squadid, name, description, createdby, createdat) FROM stdin;
    public          postgres    false    218   iK      �          0    16467    taskevidence 
   TABLE DATA           i   COPY public.taskevidence (evidenceid, taskid, evidencepath, uploadedat, description, status) FROM stdin;
    public          postgres    false    224   �K      �          0    16445    tasks 
   TABLE DATA           l   COPY public.tasks (taskid, title, description, duedate, assignedto, squadid, status, createdat) FROM stdin;
    public          postgres    false    222   �K      �          0    16399    users 
   TABLE DATA           W   COPY public.users (userid, username, email, passwordhash, role, createdat) FROM stdin;
    public          postgres    false    216   �K      �           0    0    squadmembers_squadmemberid_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.squadmembers_squadmemberid_seq', 1, false);
          public          postgres    false    219            �           0    0    squads_squadid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.squads_squadid_seq', 1, false);
          public          postgres    false    217            �           0    0    taskevidence_evidenceid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.taskevidence_evidenceid_seq', 1, false);
          public          postgres    false    223            �           0    0    tasks_taskid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tasks_taskid_seq', 1, false);
          public          postgres    false    221            �           0    0    users_userid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_userid_seq', 1, false);
          public          postgres    false    215            <           2606    16433    squadmembers squadmembers_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.squadmembers
    ADD CONSTRAINT squadmembers_pkey PRIMARY KEY (squadmemberid);
 H   ALTER TABLE ONLY public.squadmembers DROP CONSTRAINT squadmembers_pkey;
       public            postgres    false    220            :           2606    16420    squads squads_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.squads
    ADD CONSTRAINT squads_pkey PRIMARY KEY (squadid);
 <   ALTER TABLE ONLY public.squads DROP CONSTRAINT squads_pkey;
       public            postgres    false    218            @           2606    16473    taskevidence taskevidence_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.taskevidence
    ADD CONSTRAINT taskevidence_pkey PRIMARY KEY (evidenceid);
 H   ALTER TABLE ONLY public.taskevidence DROP CONSTRAINT taskevidence_pkey;
       public            postgres    false    224            >           2606    16455    tasks tasks_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (taskid);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    222            x           2606    44135    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            z           2606    44137    users users_email_key1 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key1;
       public            postgres    false    216            |           2606    44203    users users_email_key10 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key10;
       public            postgres    false    216            ~           2606    44241    users users_email_key100 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key100 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key100;
       public            postgres    false    216            �           2606    44235    users users_email_key101 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key101 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key101;
       public            postgres    false    216            �           2606    44239    users users_email_key102 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key102 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key102;
       public            postgres    false    216            �           2606    44237    users users_email_key103 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key103 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key103;
       public            postgres    false    216            �           2606    44335    users users_email_key104 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key104 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key104;
       public            postgres    false    216            �           2606    44125    users users_email_key105 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key105 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key105;
       public            postgres    false    216            �           2606    44337    users users_email_key106 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key106 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key106;
       public            postgres    false    216            �           2606    44123    users users_email_key107 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key107 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key107;
       public            postgres    false    216            �           2606    44339    users users_email_key108 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key108 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key108;
       public            postgres    false    216            �           2606    44341    users users_email_key109 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key109 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key109;
       public            postgres    false    216            �           2606    44205    users users_email_key11 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key11 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key11;
       public            postgres    false    216            �           2606    44121    users users_email_key110 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key110 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key110;
       public            postgres    false    216            �           2606    44343    users users_email_key111 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key111 UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key111;
       public            postgres    false    216            �           2606    44207    users users_email_key12 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key12 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key12;
       public            postgres    false    216            �           2606    44209    users users_email_key13 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key13 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key13;
       public            postgres    false    216            �           2606    44211    users users_email_key14 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key14 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key14;
       public            postgres    false    216            �           2606    44133    users users_email_key15 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key15 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key15;
       public            postgres    false    216            �           2606    44333    users users_email_key16 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key16 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key16;
       public            postgres    false    216            �           2606    44127    users users_email_key17 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key17 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key17;
       public            postgres    false    216            �           2606    44129    users users_email_key18 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key18 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key18;
       public            postgres    false    216            �           2606    44131    users users_email_key19 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key19 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key19;
       public            postgres    false    216            �           2606    44139    users users_email_key2 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key2;
       public            postgres    false    216            �           2606    44331    users users_email_key20 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key20 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key20;
       public            postgres    false    216            �           2606    44213    users users_email_key21 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key21 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key21;
       public            postgres    false    216            �           2606    44215    users users_email_key22 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key22 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key22;
       public            postgres    false    216            �           2606    44217    users users_email_key23 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key23 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key23;
       public            postgres    false    216            �           2606    44281    users users_email_key24 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key24 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key24;
       public            postgres    false    216            �           2606    44283    users users_email_key25 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key25 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key25;
       public            postgres    false    216            �           2606    44329    users users_email_key26 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key26 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key26;
       public            postgres    false    216            �           2606    44305    users users_email_key27 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key27 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key27;
       public            postgres    false    216            �           2606    44327    users users_email_key28 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key28 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key28;
       public            postgres    false    216            �           2606    44315    users users_email_key29 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key29 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key29;
       public            postgres    false    216            �           2606    44141    users users_email_key3 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key3;
       public            postgres    false    216            �           2606    44313    users users_email_key30 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key30 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key30;
       public            postgres    false    216            �           2606    44309    users users_email_key31 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key31 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key31;
       public            postgres    false    216            �           2606    44311    users users_email_key32 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key32 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key32;
       public            postgres    false    216            �           2606    44307    users users_email_key33 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key33 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key33;
       public            postgres    false    216            �           2606    44243    users users_email_key34 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key34 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key34;
       public            postgres    false    216            �           2606    44219    users users_email_key35 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key35 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key35;
       public            postgres    false    216            �           2606    44189    users users_email_key36 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key36 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key36;
       public            postgres    false    216            �           2606    44187    users users_email_key37 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key37 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key37;
       public            postgres    false    216            �           2606    44221    users users_email_key38 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key38 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key38;
       public            postgres    false    216            �           2606    44185    users users_email_key39 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key39 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key39;
       public            postgres    false    216            �           2606    44191    users users_email_key4 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key4;
       public            postgres    false    216            �           2606    44183    users users_email_key40 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key40 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key40;
       public            postgres    false    216            �           2606    44171    users users_email_key41 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key41 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key41;
       public            postgres    false    216            �           2606    44181    users users_email_key42 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key42 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key42;
       public            postgres    false    216            �           2606    44173    users users_email_key43 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key43 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key43;
       public            postgres    false    216            �           2606    44179    users users_email_key44 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key44 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key44;
       public            postgres    false    216            �           2606    44175    users users_email_key45 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key45 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key45;
       public            postgres    false    216            �           2606    44279    users users_email_key46 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key46 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key46;
       public            postgres    false    216            �           2606    44245    users users_email_key47 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key47 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key47;
       public            postgres    false    216            �           2606    44247    users users_email_key48 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key48 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key48;
       public            postgres    false    216            �           2606    44249    users users_email_key49 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key49 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key49;
       public            postgres    false    216            �           2606    44193    users users_email_key5 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key5;
       public            postgres    false    216            �           2606    44263    users users_email_key50 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key50 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key50;
       public            postgres    false    216            �           2606    44251    users users_email_key51 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key51 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key51;
       public            postgres    false    216            �           2606    44261    users users_email_key52 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key52 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key52;
       public            postgres    false    216            �           2606    44253    users users_email_key53 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key53 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key53;
       public            postgres    false    216            �           2606    44259    users users_email_key54 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key54 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key54;
       public            postgres    false    216            �           2606    44255    users users_email_key55 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key55 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key55;
       public            postgres    false    216            �           2606    44257    users users_email_key56 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key56 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key56;
       public            postgres    false    216            �           2606    44325    users users_email_key57 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key57 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key57;
       public            postgres    false    216            �           2606    44317    users users_email_key58 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key58 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key58;
       public            postgres    false    216            �           2606    44323    users users_email_key59 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key59 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key59;
       public            postgres    false    216                        2606    44195    users users_email_key6 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key6;
       public            postgres    false    216                       2606    44319    users users_email_key60 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key60 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key60;
       public            postgres    false    216                       2606    44321    users users_email_key61 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key61 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key61;
       public            postgres    false    216                       2606    44285    users users_email_key62 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key62 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key62;
       public            postgres    false    216                       2606    44287    users users_email_key63 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key63 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key63;
       public            postgres    false    216            
           2606    44303    users users_email_key64 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key64 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key64;
       public            postgres    false    216                       2606    44289    users users_email_key65 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key65 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key65;
       public            postgres    false    216                       2606    44301    users users_email_key66 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key66 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key66;
       public            postgres    false    216                       2606    44291    users users_email_key67 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key67 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key67;
       public            postgres    false    216                       2606    44299    users users_email_key68 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key68 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key68;
       public            postgres    false    216                       2606    44293    users users_email_key69 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key69 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key69;
       public            postgres    false    216                       2606    44197    users users_email_key7 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key7;
       public            postgres    false    216                       2606    44297    users users_email_key70 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key70 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key70;
       public            postgres    false    216                       2606    44295    users users_email_key71 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key71 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key71;
       public            postgres    false    216                       2606    44177    users users_email_key72 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key72 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key72;
       public            postgres    false    216                       2606    44223    users users_email_key73 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key73 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key73;
       public            postgres    false    216                        2606    44153    users users_email_key74 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key74 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key74;
       public            postgres    false    216            "           2606    44169    users users_email_key75 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key75 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key75;
       public            postgres    false    216            $           2606    44155    users users_email_key76 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key76 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key76;
       public            postgres    false    216            &           2606    44167    users users_email_key77 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key77 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key77;
       public            postgres    false    216            (           2606    44163    users users_email_key78 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key78 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key78;
       public            postgres    false    216            *           2606    44165    users users_email_key79 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key79 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key79;
       public            postgres    false    216            ,           2606    44199    users users_email_key8 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key8;
       public            postgres    false    216            .           2606    44157    users users_email_key80 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key80 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key80;
       public            postgres    false    216            0           2606    44161    users users_email_key81 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key81 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key81;
       public            postgres    false    216            2           2606    44159    users users_email_key82 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key82 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key82;
       public            postgres    false    216            4           2606    44277    users users_email_key83 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key83 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key83;
       public            postgres    false    216            6           2606    44265    users users_email_key84 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key84 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key84;
       public            postgres    false    216            8           2606    44267    users users_email_key85 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key85 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key85;
       public            postgres    false    216            :           2606    44275    users users_email_key86 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key86 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key86;
       public            postgres    false    216            <           2606    44269    users users_email_key87 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key87 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key87;
       public            postgres    false    216            >           2606    44273    users users_email_key88 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key88 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key88;
       public            postgres    false    216            @           2606    44271    users users_email_key89 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key89 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key89;
       public            postgres    false    216            B           2606    44201    users users_email_key9 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key9;
       public            postgres    false    216            D           2606    44151    users users_email_key90 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key90 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key90;
       public            postgres    false    216            F           2606    44225    users users_email_key91 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key91 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key91;
       public            postgres    false    216            H           2606    44149    users users_email_key92 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key92 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key92;
       public            postgres    false    216            J           2606    44227    users users_email_key93 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key93 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key93;
       public            postgres    false    216            L           2606    44147    users users_email_key94 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key94 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key94;
       public            postgres    false    216            N           2606    44145    users users_email_key95 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key95 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key95;
       public            postgres    false    216            P           2606    44229    users users_email_key96 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key96 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key96;
       public            postgres    false    216            R           2606    44143    users users_email_key97 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key97 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key97;
       public            postgres    false    216            T           2606    44231    users users_email_key98 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key98 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key98;
       public            postgres    false    216            V           2606    44233    users users_email_key99 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key99 UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key99;
       public            postgres    false    216            X           2606    16406    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            Z           2606    43997    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            \           2606    43999    users users_username_key1 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key1 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key1;
       public            postgres    false    216            ^           2606    44035    users users_username_key10 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key10 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key10;
       public            postgres    false    216            `           2606    43907    users users_username_key100 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key100 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key100;
       public            postgres    false    216            b           2606    44109    users users_username_key101 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key101 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key101;
       public            postgres    false    216            d           2606    43905    users users_username_key102 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key102 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key102;
       public            postgres    false    216            f           2606    44111    users users_username_key103 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key103 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key103;
       public            postgres    false    216            h           2606    43903    users users_username_key104 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key104 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key104;
       public            postgres    false    216            j           2606    43901    users users_username_key105 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key105 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key105;
       public            postgres    false    216            l           2606    44113    users users_username_key106 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key106 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key106;
       public            postgres    false    216            n           2606    43899    users users_username_key107 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key107 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key107;
       public            postgres    false    216            p           2606    44115    users users_username_key108 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key108 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key108;
       public            postgres    false    216            r           2606    43897    users users_username_key109 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key109 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key109;
       public            postgres    false    216            t           2606    44037    users users_username_key11 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key11 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key11;
       public            postgres    false    216            v           2606    43895    users users_username_key110 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key110 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key110;
       public            postgres    false    216            x           2606    44117    users users_username_key111 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key111 UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key111;
       public            postgres    false    216            z           2606    44039    users users_username_key12 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key12 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key12;
       public            postgres    false    216            |           2606    43981    users users_username_key13 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key13 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key13;
       public            postgres    false    216            ~           2606    43983    users users_username_key14 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key14 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key14;
       public            postgres    false    216            �           2606    43995    users users_username_key15 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key15 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key15;
       public            postgres    false    216            �           2606    43985    users users_username_key16 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key16 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key16;
       public            postgres    false    216            �           2606    43987    users users_username_key17 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key17 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key17;
       public            postgres    false    216            �           2606    43989    users users_username_key18 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key18 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key18;
       public            postgres    false    216            �           2606    43993    users users_username_key19 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key19 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key19;
       public            postgres    false    216            �           2606    44001    users users_username_key2 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key2 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key2;
       public            postgres    false    216            �           2606    43991    users users_username_key20 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key20 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key20;
       public            postgres    false    216            �           2606    43979    users users_username_key21 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key21 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key21;
       public            postgres    false    216            �           2606    43977    users users_username_key22 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key22 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key22;
       public            postgres    false    216            �           2606    44041    users users_username_key23 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key23 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key23;
       public            postgres    false    216            �           2606    44043    users users_username_key24 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key24 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key24;
       public            postgres    false    216            �           2606    44045    users users_username_key25 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key25 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key25;
       public            postgres    false    216            �           2606    43975    users users_username_key26 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key26 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key26;
       public            postgres    false    216            �           2606    44063    users users_username_key27 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key27 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key27;
       public            postgres    false    216            �           2606    43973    users users_username_key28 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key28 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key28;
       public            postgres    false    216            �           2606    43971    users users_username_key29 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key29 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key29;
       public            postgres    false    216            �           2606    44003    users users_username_key3 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key3 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key3;
       public            postgres    false    216            �           2606    43969    users users_username_key30 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key30 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key30;
       public            postgres    false    216            �           2606    44065    users users_username_key31 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key31 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key31;
       public            postgres    false    216            �           2606    43967    users users_username_key32 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key32 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key32;
       public            postgres    false    216            �           2606    43943    users users_username_key33 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key33 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key33;
       public            postgres    false    216            �           2606    43939    users users_username_key34 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key34 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key34;
       public            postgres    false    216            �           2606    44067    users users_username_key35 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key35 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key35;
       public            postgres    false    216            �           2606    43937    users users_username_key36 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key36 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key36;
       public            postgres    false    216            �           2606    43941    users users_username_key37 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key37 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key37;
       public            postgres    false    216            �           2606    44069    users users_username_key38 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key38 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key38;
       public            postgres    false    216            �           2606    43935    users users_username_key39 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key39 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key39;
       public            postgres    false    216            �           2606    44005    users users_username_key4 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key4 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key4;
       public            postgres    false    216            �           2606    43933    users users_username_key40 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key40 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key40;
       public            postgres    false    216            �           2606    44071    users users_username_key41 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key41 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key41;
       public            postgres    false    216            �           2606    43931    users users_username_key42 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key42 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key42;
       public            postgres    false    216            �           2606    44073    users users_username_key43 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key43 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key43;
       public            postgres    false    216            �           2606    43929    users users_username_key44 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key44 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key44;
       public            postgres    false    216            �           2606    44075    users users_username_key45 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key45 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key45;
       public            postgres    false    216            �           2606    43927    users users_username_key46 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key46 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key46;
       public            postgres    false    216            �           2606    44077    users users_username_key47 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key47 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key47;
       public            postgres    false    216            �           2606    43925    users users_username_key48 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key48 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key48;
       public            postgres    false    216            �           2606    44079    users users_username_key49 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key49 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key49;
       public            postgres    false    216            �           2606    44007    users users_username_key5 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key5 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key5;
       public            postgres    false    216            �           2606    43923    users users_username_key50 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key50 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key50;
       public            postgres    false    216            �           2606    44081    users users_username_key51 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key51 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key51;
       public            postgres    false    216            �           2606    43921    users users_username_key52 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key52 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key52;
       public            postgres    false    216            �           2606    44083    users users_username_key53 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key53 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key53;
       public            postgres    false    216            �           2606    43919    users users_username_key54 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key54 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key54;
       public            postgres    false    216            �           2606    44085    users users_username_key55 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key55 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key55;
       public            postgres    false    216            �           2606    43917    users users_username_key56 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key56 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key56;
       public            postgres    false    216            �           2606    43915    users users_username_key57 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key57 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key57;
       public            postgres    false    216            �           2606    44087    users users_username_key58 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key58 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key58;
       public            postgres    false    216            �           2606    44103    users users_username_key59 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key59 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key59;
       public            postgres    false    216            �           2606    44009    users users_username_key6 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key6 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key6;
       public            postgres    false    216            �           2606    44089    users users_username_key60 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key60 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key60;
       public            postgres    false    216            �           2606    44101    users users_username_key61 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key61 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key61;
       public            postgres    false    216            �           2606    44091    users users_username_key62 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key62 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key62;
       public            postgres    false    216            �           2606    44093    users users_username_key63 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key63 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key63;
       public            postgres    false    216            �           2606    44099    users users_username_key64 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key64 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key64;
       public            postgres    false    216            �           2606    44095    users users_username_key65 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key65 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key65;
       public            postgres    false    216            �           2606    44097    users users_username_key66 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key66 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key66;
       public            postgres    false    216            �           2606    44047    users users_username_key67 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key67 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key67;
       public            postgres    false    216            �           2606    44061    users users_username_key68 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key68 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key68;
       public            postgres    false    216            �           2606    44049    users users_username_key69 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key69 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key69;
       public            postgres    false    216            �           2606    44011    users users_username_key7 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key7 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key7;
       public            postgres    false    216            �           2606    44059    users users_username_key70 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key70 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key70;
       public            postgres    false    216            �           2606    44051    users users_username_key71 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key71 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key71;
       public            postgres    false    216            �           2606    44057    users users_username_key72 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key72 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key72;
       public            postgres    false    216                        2606    44053    users users_username_key73 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key73 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key73;
       public            postgres    false    216                       2606    44055    users users_username_key74 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key74 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key74;
       public            postgres    false    216                       2606    44025    users users_username_key75 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key75 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key75;
       public            postgres    false    216                       2606    44015    users users_username_key76 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key76 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key76;
       public            postgres    false    216                       2606    44023    users users_username_key77 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key77 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key77;
       public            postgres    false    216            
           2606    44017    users users_username_key78 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key78 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key78;
       public            postgres    false    216                       2606    44021    users users_username_key79 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key79 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key79;
       public            postgres    false    216                       2606    44013    users users_username_key8 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key8 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key8;
       public            postgres    false    216                       2606    44019    users users_username_key80 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key80 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key80;
       public            postgres    false    216                       2606    43965    users users_username_key81 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key81 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key81;
       public            postgres    false    216                       2606    43945    users users_username_key82 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key82 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key82;
       public            postgres    false    216                       2606    43963    users users_username_key83 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key83 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key83;
       public            postgres    false    216                       2606    43947    users users_username_key84 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key84 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key84;
       public            postgres    false    216                       2606    43949    users users_username_key85 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key85 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key85;
       public            postgres    false    216                       2606    43961    users users_username_key86 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key86 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key86;
       public            postgres    false    216                       2606    43951    users users_username_key87 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key87 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key87;
       public            postgres    false    216                        2606    43959    users users_username_key88 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key88 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key88;
       public            postgres    false    216            "           2606    43953    users users_username_key89 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key89 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key89;
       public            postgres    false    216            $           2606    44027    users users_username_key9 
   CONSTRAINT     X   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key9 UNIQUE (username);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key9;
       public            postgres    false    216            &           2606    43957    users users_username_key90 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key90 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key90;
       public            postgres    false    216            (           2606    43955    users users_username_key91 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key91 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key91;
       public            postgres    false    216            *           2606    44033    users users_username_key92 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key92 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key92;
       public            postgres    false    216            ,           2606    44029    users users_username_key93 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key93 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key93;
       public            postgres    false    216            .           2606    44031    users users_username_key94 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key94 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key94;
       public            postgres    false    216            0           2606    43913    users users_username_key95 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key95 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key95;
       public            postgres    false    216            2           2606    44105    users users_username_key96 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key96 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key96;
       public            postgres    false    216            4           2606    43911    users users_username_key97 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key97 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key97;
       public            postgres    false    216            6           2606    44107    users users_username_key98 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key98 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key98;
       public            postgres    false    216            8           2606    43909    users users_username_key99 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key99 UNIQUE (username);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key99;
       public            postgres    false    216            B           2606    43881 &   squadmembers squadmembers_squadid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.squadmembers
    ADD CONSTRAINT squadmembers_squadid_fkey FOREIGN KEY (squadid) REFERENCES public.squads(squadid);
 P   ALTER TABLE ONLY public.squadmembers DROP CONSTRAINT squadmembers_squadid_fkey;
       public          postgres    false    5178    220    218            C           2606    43886 %   squadmembers squadmembers_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.squadmembers
    ADD CONSTRAINT squadmembers_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 O   ALTER TABLE ONLY public.squadmembers DROP CONSTRAINT squadmembers_userid_fkey;
       public          postgres    false    4952    220    216            A           2606    43876    squads squads_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.squads
    ADD CONSTRAINT squads_createdby_fkey FOREIGN KEY (createdby) REFERENCES public.users(userid) ON UPDATE CASCADE;
 F   ALTER TABLE ONLY public.squads DROP CONSTRAINT squads_createdby_fkey;
       public          postgres    false    4952    218    216            F           2606    16474 %   taskevidence taskevidence_taskid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.taskevidence
    ADD CONSTRAINT taskevidence_taskid_fkey FOREIGN KEY (taskid) REFERENCES public.tasks(taskid);
 O   ALTER TABLE ONLY public.taskevidence DROP CONSTRAINT taskevidence_taskid_fkey;
       public          postgres    false    222    224    5182            D           2606    44345    tasks tasks_assignedto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assignedto_fkey FOREIGN KEY (assignedto) REFERENCES public.users(userid);
 E   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assignedto_fkey;
       public          postgres    false    216    4952    222            E           2606    44350    tasks tasks_squadid_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_squadid_fkey FOREIGN KEY (squadid) REFERENCES public.squads(squadid);
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_squadid_fkey;
       public          postgres    false    218    222    5178            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     