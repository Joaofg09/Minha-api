-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "feita" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);
