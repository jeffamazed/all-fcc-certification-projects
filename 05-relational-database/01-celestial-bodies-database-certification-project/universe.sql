--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

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

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

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
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    age_million_years integer NOT NULL,
    radius_in_ly numeric(10,2) NOT NULL,
    is_in_local_group boolean NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: mission; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.mission (
    mission_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    agency character varying(50) NOT NULL,
    launch_date date NOT NULL,
    description text NOT NULL,
    planet_id bigint NOT NULL
);


ALTER TABLE public.mission OWNER TO freecodecamp;

--
-- Name: mission_mission_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.mission_mission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mission_mission_id_seq OWNER TO freecodecamp;

--
-- Name: mission_mission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.mission_mission_id_seq OWNED BY public.mission.mission_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    age_million_years integer NOT NULL,
    temperature_kelvin integer NOT NULL,
    radius_km numeric(7,2) NOT NULL,
    has_atmosphere boolean NOT NULL,
    description text NOT NULL,
    planet_id bigint NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    age_million_years integer NOT NULL,
    temperature_kelvin integer NOT NULL,
    radius_km integer NOT NULL,
    is_habitable boolean NOT NULL,
    description text NOT NULL,
    star_id bigint NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    age_million_years integer NOT NULL,
    temperature_kelvin integer NOT NULL,
    radius_km numeric(15,2) NOT NULL,
    is_binary boolean NOT NULL,
    description text NOT NULL,
    galaxy_id bigint NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: mission mission_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission ALTER COLUMN mission_id SET DEFAULT nextval('public.mission_mission_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 13600, 52850.00, true, 'The Milky Way is the galaxy that contains our Solar System. It is a barred spiral galaxy and part of the Local Group.');
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 10000, 110000.00, true, 'Andromeda (M31) is the nearest spiral galaxy to the Milky Way and is expected to collide with it in about 4.5 billion years.');
INSERT INTO public.galaxy VALUES (3, 'Messier 87', 13000, 60000.00, false, 'Messier 87 (M87) is a supergiant elliptical galaxy in the Virgo Cluster, known for hosting a supermassive black hole imaged by the Event Horizon Telescope.');
INSERT INTO public.galaxy VALUES (4, 'Triangulum', 12000, 30000.00, true, 'Triangulum (M33) is a spiral galaxy in the Local Group, known for its active star formation and proximity to the Andromeda Galaxy.');
INSERT INTO public.galaxy VALUES (5, 'IC 1101', 13500, 200000.00, false, 'IC 1101 is a supergiant elliptical galaxy located over a billion light-years away in the Abell 2029 cluster. It is one of the largest galaxies ever observed, spanning nearly 400,000 light-years in diameter.');
INSERT INTO public.galaxy VALUES (6, 'Sombrero', 13000, 25000.00, false, 'The Sombrero Galaxy (M104) is a spiral galaxy in the Virgo constellation, famous for its bright nucleus and large central bulge, giving it the appearance of a sombrero.');


--
-- Data for Name: mission; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.mission VALUES (1, 'Voyager 1', 'NASA', '1977-09-05', 'Flyby of Jupiter and Saturn. Still transmiting from interstellar space.', 4);
INSERT INTO public.mission VALUES (2, 'Cassini-Huygens', 'NASA/ESA/ASI', '1997-10-15', 'Studied Saturn, its rings, and moons for over a decade.', 6);
INSERT INTO public.mission VALUES (3, 'Perseverance', 'NASA', '2020-07-30', 'Rover on Mars searchiing for signs of past microbial life.', 5);
INSERT INTO public.mission VALUES (4, 'Curiosity', 'NASA', '2011-11-26', 'Curiosity is a car-sized rover exploring Mars''s Gale Crater to assess whether the planet ever had conditions suitable for microbial life.', 5);
INSERT INTO public.mission VALUES (6, 'Juno', 'NASA', '2011-08-05', 'Juno is a NASA space probe studying Jupiter''s atmosphere, magnetic field and gravitational field to better understand the planet''s origin and structure.', 4);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Luna', 4500, 220, 1737.40, false, 'Earth''s only natural satellite. Stabilizes Earth''s tilt and causes tides.', 1);
INSERT INTO public.moon VALUES (2, 'Ganymede', 4500, 110, 2634.10, true, 'Largest moon in the Solar System, larger than Mercury, with a magnetic field.', 4);
INSERT INTO public.moon VALUES (3, 'Titan', 4500, 94, 2574.70, true, 'Only moon with a thick atmosphere. Methane lakes and possible subsurface ocean.', 6);
INSERT INTO public.moon VALUES (4, 'Callisto', 4500, 134, 2410.30, false, 'Heavily cratered and ancient surface. May have a subsurface ocean.', 4);
INSERT INTO public.moon VALUES (5, 'Io', 4500, 130, 1821.60, false, 'Most volcanically active body in the Solar System. No atmosphere, just chaos.', 4);
INSERT INTO public.moon VALUES (6, 'Europa', 4500, 102, 1560.80, false, 'Smooth, icy surface with a subsurface ocean. Strong candidate for life.', 4);
INSERT INTO public.moon VALUES (7, 'Triton', 4500, 38, 1353.40, true, 'Retrograde orbit. Geysers. Coldest known surface in the Solar System.', 8);
INSERT INTO public.moon VALUES (8, 'Rhea', 4500, 99, 763.80, false, 'Second-largest moon of Saturn. Might have faint rings.', 6);
INSERT INTO public.moon VALUES (9, 'Dione', 4500, 87, 561.40, false, 'Has bright ice cliffs and evidence of past geological activity.', 6);
INSERT INTO public.moon VALUES (10, 'Tethys', 4500, 86, 531.10, false, 'Dominated by a huge canyon system and large impact crater.', 6);
INSERT INTO public.moon VALUES (11, 'Enceladus', 4500, 75, 252.10, true, 'Shoots water jets from its south pole. Subsurface ocean. Major target for life.', 6);
INSERT INTO public.moon VALUES (12, 'Iapetus', 4500, 110, 734.50, false, 'Two-tone coloring: one side dark, one bright. Has an equatorial ridge like a walnut.', 6);
INSERT INTO public.moon VALUES (13, 'Miranda', 4500, 60, 235.80, false, 'Chaotic terrain with huge cliffs and canyons. Looks like it was torn apart and glued back.', 7);
INSERT INTO public.moon VALUES (14, 'Oberon', 4500, 76, 761.40, false, 'One of Uranus''s major moons. Icy and dark with impact craters.', 7);
INSERT INTO public.moon VALUES (15, 'Ariel', 4500, 60, 578.90, false, 'Possibly geologically active. Bright surface with valleys and ridges.', 7);
INSERT INTO public.moon VALUES (16, 'Umbriel', 4500, 70, 584.70, false, 'Darkest Uranian moon. Covered in old craters and mysterious bright rings.', 7);
INSERT INTO public.moon VALUES (17, 'Phobos', 4500, 233, 11.10, false, 'Doomed moon of Mars. Will crash into the planet or break apart in ~50 million years.', 5);
INSERT INTO public.moon VALUES (18, 'Deimos', 4500, 233, 6.20, false, 'Mars''s smaller moon. Irregular and heavily cratered, likely a captured asteroid.', 5);
INSERT INTO public.moon VALUES (19, 'Nereid', 4500, 50, 170.00, false, 'Moon of Neptune. Has a very eccentric orbit -- way more than any large moon. Probably a captured Kuipter Belt object.', 8);
INSERT INTO public.moon VALUES (20, 'Hyperion', 4500, 93, 135.00, false, 'Spongy appearance and chaotic rotation. Very low density, likely porous.', 6);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Earth', 4540, 288, 6371, true, 'Earth is the only known planet to support life, orbiting the Sun in the Milky Way galaxy.', 1);
INSERT INTO public.planet VALUES (2, 'Mercury', 4500, 440, 2439, false, 'Mercury is the closest planet to the Sun. It has extreme temperature swings and no atmospehre to speak of.', 1);
INSERT INTO public.planet VALUES (3, 'Venus', 4500, 737, 6051, false, 'Venus has a thick carbon dioxide atmosphere and surface temperatures hot enough to melt lead -- a runaway greenhouse example.', 1);
INSERT INTO public.planet VALUES (4, 'Jupiter', 4500, 165, 69911, false, 'Jupiter is the largest planet in the Solar System and a gas giant with massive storms and dozens of moons, including Europa and Ganymede.', 1);
INSERT INTO public.planet VALUES (5, 'Mars', 4500, 210, 3389, false, 'Mars is a cold desert planet with polar ice caps and the largest volcano in the Solar System -- Olympus Mons.', 1);
INSERT INTO public.planet VALUES (6, 'Saturn', 4500, 134, 58232, false, 'Saturn is a gas giant known for its beautiful and complex ring system.', 1);
INSERT INTO public.planet VALUES (7, 'Uranus', 4500, 76, 25362, false, 'Uranus is an ice giant with a unique tilt -- it rolls around the Sun on its side.', 1);
INSERT INTO public.planet VALUES (8, 'Neptune', 4500, 72, 24622, false, 'Neptune is the farthest known planet in the Solar System, famous for supersonic winds and deep blue color.', 1);
INSERT INTO public.planet VALUES (9, 'Proxima b', 5000, 234, 7160, true, 'Proxima b is the closest exoplanet to Earth, orbiting Proxima Centauri in the habitable zone, only 4.24 light-years away.', 3);
INSERT INTO public.planet VALUES (10, 'Kepler-22b', 6000, 295, 13000, true, 'Kepler-22b is about 600 light-years away and was the first planet found in the habitable zone of a Sun-like star.', 9);
INSERT INTO public.planet VALUES (11, 'GJ 1214b', 6000, 400, 15500, false, 'GJ 1214b is a super-Earth likely covered in water vapor or a thick atmosphere, about 48 light-years away.', 10);
INSERT INTO public.planet VALUES (12, '55 Cancri e', 8000, 2400, 10400, false, '55 Cancri e is a scorching exoplanet with a possible lava ocean, orbiting extremely close to its star, just 41 light-years from Earth.', 11);
INSERT INTO public.planet VALUES (13, 'TRAPPIST-1e', 7000, 251, 5810, true, 'TRAPPIST-1e is one of seven Earth-size planets orbiting a cool dwarf star. It is within the habitable zone and just 40 light-years away.', 12);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 4600, 5778, 696340.00, false, 'The Sun is a G-type main-sequence star and the central star of the Solar System, located in the Milky Way.', 1);
INSERT INTO public.star VALUES (2, 'Alpha Centauri A', 5000, 5790, 834840.00, true, 'Alpha Centauri A is part of the closest star system to the Sun and resides in the Milky Way. It is in a binary pair with Alpha Centauri B.', 1);
INSERT INTO public.star VALUES (3, 'Proxima Centauri', 4500, 3042, 100000.00, false, 'Proxima Centauri is the closest known star to the Sun, located in the Alpha Centauri system in the Milky Way.', 1);
INSERT INTO public.star VALUES (4, 'Betelgeuse', 10000, 3500, 617100000.00, false, 'Betelgeuse is a red supergiant star nearing the end of its life, located in the Orion constellation within the Milky Way.', 1);
INSERT INTO public.star VALUES (5, 'Rigel', 800, 12100, 78100000.00, true, 'Rigel is a blue supergiant star and one of the brightest in the Milky Way, located in the Orion constellation.', 1);
INSERT INTO public.star VALUES (6, 'Polaris', 70000, 6015, 44600000.00, true, 'Polaris is the current North Star and part of a multiple star system in the Milky Way.', 1);
INSERT INTO public.star VALUES (8, 'M31-V1', 100, 6000, 40000000.00, false, 'M31-V1 is a Cepheid variable star in the Andromeda Galaxy, crucial in proving that galaxies exist outside the Milky Way.', 2);
INSERT INTO public.star VALUES (9, 'Kepler-22', 4000, 5518, 620000.00, false, 'Kepler-22 is a G-type main-sequence star about 600 light-years from Earth, in the constellation Cygnus, it hosts the exoplanet Kepler-22b.', 1);
INSERT INTO public.star VALUES (10, 'GJ 1214', 6000, 3026, 140000.00, false, 'GJ 1214 is a red dwarf star located 48 light-years away in the Milky Way, host to the exoplanet GJ 1214b.', 1);
INSERT INTO public.star VALUES (11, '55 Cancri A', 8000, 5196, 902000.00, true, '55 Cancri A is a Sun-like star in a binary system, known for hosting several exoplanets including 55 Cancri e.', 1);
INSERT INTO public.star VALUES (12, 'TRAPPIST-1', 7000, 2511, 84100.00, false, 'TRAPPIST-1 is an ultracool red dwarf star with a planetary system of seven Earth-sized planets.', 1);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: mission_mission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.mission_mission_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 13, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 12, true);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: mission mission_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission
    ADD CONSTRAINT mission_name_key UNIQUE (name);


--
-- Name: mission mission_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission
    ADD CONSTRAINT mission_pkey PRIMARY KEY (mission_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon fk_moon_planet; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT fk_moon_planet FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet fk_planet_star; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT fk_planet_star FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star fk_star_galaxy; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT fk_star_galaxy FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: mission mission_planet_fk; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.mission
    ADD CONSTRAINT mission_planet_fk FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- PostgreSQL database dump complete
--

