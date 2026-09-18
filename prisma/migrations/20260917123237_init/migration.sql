-- DropForeignKey
ALTER TABLE "TreinoExercicio" DROP CONSTRAINT "TreinoExercicio_exercicioId_fkey";

-- DropForeignKey
ALTER TABLE "TreinoExercicio" DROP CONSTRAINT "TreinoExercicio_treinoId_fkey";

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "Exercicio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
