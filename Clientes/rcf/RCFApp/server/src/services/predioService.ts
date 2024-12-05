import { db } from '../db';
import { predios } from '../db/schema';
import { eq } from 'drizzle-orm';
import { Predio, PredioCreationData, PredioUpdateData } from '../types/predio';

export const createPredio = async (predioData: PredioCreationData): Promise<Predio> => {
  const [predio] = await db.insert(predios)
    .values(predioData)
    .returning();

  return predio;
};

export const getPredios = async (): Promise<Predio[]> => {
  return await db.select().from(predios);
};

export const getPredioById = async (id: string): Promise<Predio | null> => {
  const [predio] = await db.select()
    .from(predios)
    .where(eq(predios.id, id));

  return predio || null;
};

export const getPrediosByUsuarioId = async (usuarioId: string): Promise<Predio[]> => {
  return await db.select()
    .from(predios)
    .where(eq(predios.usuarioId, usuarioId));
};

export const updatePredio = async (id: string, predioData: PredioUpdateData): Promise<Predio | null> => {
  const [updatedPredio] = await db.update(predios)
    .set(predioData)
    .where(eq(predios.id, id))
    .returning();

  return updatedPredio || null;
};

export const deletePredio = async (id: string): Promise<void> => {
  await db.delete(predios).where(eq(predios.id, id));
};