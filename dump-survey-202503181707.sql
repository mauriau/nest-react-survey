PGDMP                       }            survey    14.17    17.0     d           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            e           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            f           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            g           1262    16384    survey    DATABASE     q   CREATE DATABASE survey WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE survey;
                     root    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     root    false            h           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        root    false    5            i           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                        root    false    5            M           1247    16422    user_roles_enum    TYPE     H   CREATE TYPE public.user_roles_enum AS ENUM (
    'user',
    'admin'
);
 "   DROP TYPE public.user_roles_enum;
       public               root    false    5            �            1259    16396    choice    TABLE     �   CREATE TABLE public.choice (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    survey_id uuid
);
    DROP TABLE public.choice;
       public         heap r       root    false    5    5    5            �            1259    16404    survey    TABLE     �   CREATE TABLE public.survey (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    "singleResponse" boolean NOT NULL
);
    DROP TABLE public.survey;
       public         heap r       root    false    5    5    5            �            1259    16412    survey_response    TABLE     �   CREATE TABLE public.survey_response (
    user_id uuid NOT NULL,
    survey_id uuid NOT NULL,
    "respondedAt" timestamp without time zone DEFAULT now() NOT NULL,
    choices json NOT NULL
);
 #   DROP TABLE public.survey_response;
       public         heap r       root    false    5            �            1259    16427    user    TABLE     d  CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    roles public.user_roles_enum DEFAULT 'user'::public.user_roles_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."user";
       public         heap r       root    false    5    5    845    5    845            ^          0    16396    choice 
   TABLE DATA           6   COPY public.choice (id, title, survey_id) FROM stdin;
    public               root    false    210   �        _          0    16404    survey 
   TABLE DATA           J   COPY public.survey (id, title, description, "singleResponse") FROM stdin;
    public               root    false    211   #       `          0    16412    survey_response 
   TABLE DATA           U   COPY public.survey_response (user_id, survey_id, "respondedAt", choices) FROM stdin;
    public               root    false    212   $$       a          0    16427    user 
   TABLE DATA           R   COPY public."user" (id, username, email, password, roles, created_at) FROM stdin;
    public               root    false    213   o%       �           2606    16418 .   survey_response PK_5823832c9a98fe0e56ab1954a39 
   CONSTRAINT     ~   ALTER TABLE ONLY public.survey_response
    ADD CONSTRAINT "PK_5823832c9a98fe0e56ab1954a39" PRIMARY KEY (user_id, survey_id);
 Z   ALTER TABLE ONLY public.survey_response DROP CONSTRAINT "PK_5823832c9a98fe0e56ab1954a39";
       public                 root    false    212    212            �           2606    16403 %   choice PK_5bf2e5939332f46711278a87fcd 
   CONSTRAINT     e   ALTER TABLE ONLY public.choice
    ADD CONSTRAINT "PK_5bf2e5939332f46711278a87fcd" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.choice DROP CONSTRAINT "PK_5bf2e5939332f46711278a87fcd";
       public                 root    false    210            �           2606    16436 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public                 root    false    213            �           2606    16411 %   survey PK_f0da32b9181e9c02ecf0be11ed3 
   CONSTRAINT     e   ALTER TABLE ONLY public.survey
    ADD CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.survey DROP CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3";
       public                 root    false    211            �           2606    16420 .   survey_response UQ_5823832c9a98fe0e56ab1954a39 
   CONSTRAINT     y   ALTER TABLE ONLY public.survey_response
    ADD CONSTRAINT "UQ_5823832c9a98fe0e56ab1954a39" UNIQUE (survey_id, user_id);
 Z   ALTER TABLE ONLY public.survey_response DROP CONSTRAINT "UQ_5823832c9a98fe0e56ab1954a39";
       public                 root    false    212    212            �           2606    16438 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public                 root    false    213            �           2606    16440 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public                 root    false    213            �           2606    16442 #   user UQ_f4ca2c1e7c96ae6e8a7cca9df80 
   CONSTRAINT     m   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE (username, email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80";
       public                 root    false    213    213            �           2606    16453 .   survey_response FK_3282a960be3ebb4c396bc1e391a    FK CONSTRAINT     �   ALTER TABLE ONLY public.survey_response
    ADD CONSTRAINT "FK_3282a960be3ebb4c396bc1e391a" FOREIGN KEY (survey_id) REFERENCES public.survey(id);
 Z   ALTER TABLE ONLY public.survey_response DROP CONSTRAINT "FK_3282a960be3ebb4c396bc1e391a";
       public               root    false    3267    212    211            �           2606    16443 %   choice FK_bfc3e7dffb91e1779d6beb7e320    FK CONSTRAINT     �   ALTER TABLE ONLY public.choice
    ADD CONSTRAINT "FK_bfc3e7dffb91e1779d6beb7e320" FOREIGN KEY (survey_id) REFERENCES public.survey(id);
 Q   ALTER TABLE ONLY public.choice DROP CONSTRAINT "FK_bfc3e7dffb91e1779d6beb7e320";
       public               root    false    3267    210    211            �           2606    16448 .   survey_response FK_ef223bbe476347aa5e7faeeb2c2    FK CONSTRAINT     �   ALTER TABLE ONLY public.survey_response
    ADD CONSTRAINT "FK_ef223bbe476347aa5e7faeeb2c2" FOREIGN KEY (user_id) REFERENCES public."user"(id);
 Z   ALTER TABLE ONLY public.survey_response DROP CONSTRAINT "FK_ef223bbe476347aa5e7faeeb2c2";
       public               root    false    213    212    3273            ^   n  x���;n1@k�]H�$Jm�"pp���Dǁ��ا7��4�y�=���yl�eX���uP��1ٯ˃�hL��>z��L/��'��	+��)�����@�����?��+ZĀY'T���`ѠV���n�]Ҩ�+�k���f������9����G:긡�3�j�6�m�
�t����r>4Y�y�Q�PT*+�3lj�����j/OoǠ��"V�e�M�@�5Ƙ�I�t��� m8���!d�ʲ$�Yo��>������R�;b�я5',��cŮ����+�Qc��_[0��L.���ӣ���~<F$u�[�r��w�M�w.��������ij�!�Z�LU
�&W�.dF�R)}�-���1��F�r���ppHt_��������������v�k�lU����a���2�#iIϯ+�f,��mh�Y<�5�e[x"|������5�����bqWT>h!�N��K>��2�9b`�j�����8�B�c�����x��X�<�)�=bBy!�7zdN�%a�9g7�&#�)�t�5������׉]+Q��G[�
���i��y]q�h��Qe�j����p1���W�Di�|���r:���Mpb      _     x�m�;R1�k�)|1~?*
Zf(ilI;$Yv�	Í��fh)%}��Ϧ\mf!�r��#�SM�&Ԣ_�+jAܵhSr�����d(�=�1V�4��c9ʁ%�|ߖ�VN���˹����ܾ��k�.������D52gƳ��Dh�hHƐLO��w�/g�F0,ۛl�ls������c�t��hP���Td���Y3�J%�}�N}�ae��9ƒ�E� 1+p>X�I�H���������M��)i�      `   ;  x���=��1�z����O����*���?B�4+���H/����q��P	�`�e�y�=�G��ݻ��6��(Z���`�(@�����~ud�zyeЫo%�:欁��;~}�X-s�	��]}�p68�b�:i�^_O}�g�����}�h٫���<��~���~�����B*�V�`V���7���Z�6�:��2�qR1�0h�n-�YH���i?�Q�V�"��a�C6�����i������m󛘵�v��mW([֣e��}�o��|�Ō�����Ə��4�q�9A�\3��(����|�XޤV      a   �  x���Ko�@�5�Yx���{��j(����	�u3c��n�0����n�U6����t8� 0l	�RHRm����s�)::-�
�;�Z�o�I]v|���
����g��v@���^!&%K��E�>֛����H�Ǩi�jH������<}ˋ����8H��p:<}4vp�
z��i�@�Ҁ)�Q ��qȁ5��J�1�"a,����Y�9����e{�ܺc;?����^��߯���7��_rx��L�y���ehw��0.�d��rz9���4���G}��L^�񘔂rH&�<3��2�0XE,���'�#�lOZ*�����K��R�U���c�i� ��fe��d��6>��\�Z���e�]���d�7��>��������<�/v�D     