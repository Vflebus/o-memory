-- On effectue l'ensemble des étapes dans une seule transaction. Ainsi, si une erreur se déroule lors de l'exécution, l'ensemble de la ytransaction est annulée. Celà permet de garder une base de données propre en cas d'erreur.
BEGIN;

-- On efface la table si elle existe
DROP TABLE IF EXISTS "score";

-- On crée la table et on définit ses champs
CREATE TABLE "score" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "time" FLOAT NOT NULL
);

-- Seeding
INSERT INTO "score" ("name", "time")
    VALUES ('SuperPlayer', 65.254);

COMMIT;