import { db } from '../db';
import { canchas } from '../db/schema';
import { eq } from 'drizzle-orm';
import { Cancha, CanchaCreationData, CanchaUpdateData } from '../types/cancha';

export const createCancha = async (canchaData: CanchaCreationData): Promise<Cancha> => {
  const [cancha] = await db.insert(canchas)
    .values(canchaData)
    .returning();

  return cancha;
};

export const getCanchas = async (): Promise<Cancha[]> => {
  return await db.select().from(canchas);
};

export const getCanchaById = async (id: string): Promise<Cancha | null> => {
  const [cancha] = await db.select()
    .from(canchas)
    .where(eq(canchas.id, id));

  return cancha || null;
};

export const getCanchasByPredioId = async (predioId: string): Promise<Cancha[]> => {
  return await db.select()
    .from(canchas)
    .where(eq(canchas.predioId, predioId));
};

export const updateCancha = async (id: string, canchaData: CanchaUpdateData): Promise<Cancha | null> => {
  const [updatedCancha] = await db.update(canchas)
    .set(canchaData)
    .where(eq(canchas.id, id))
    .returning();

  return updatedCancha || null;
};

export const deleteCancha = async (id: string): Promise<void> => {
  await db.delete(canchas).where(eq(canchas.id, id));
};