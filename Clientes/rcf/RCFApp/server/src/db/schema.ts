import { pgTable, text, timestamp, uuid, varchar, boolean, integer, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createId } from '../utils/ids';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().$defaultFn(createId),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  password: text('password'),
  passwordResetToken: text('password_reset_token').unique(),
  passwordResetTokenExp: timestamp('password_reset_token_exp'),
  role: text('role').default('USER').notNull(),
  predioTrabajo: uuid('predio_trabajo').references(() => predios.id),
  createdAt: timestamp('created_at').defaultNow()
});

export const predios = pgTable('predios', {
  id: uuid('id').primaryKey().$defaultFn(createId),
  usuarioId: uuid('usuario_id').references(() => users.id),
  nombre: text('nombre').notNull(),
  direccion: text('direccion').notNull(),
  ciudad: text('ciudad').notNull(),
  provincia: text('provincia').notNull(),
  codigoPostal: text('codigo_postal'),
  telefono: text('telefono'),
  email: text('email'),
  latitud: decimal('latitud'),
  longitud: decimal('longitud'),
  capacidadEstacionamiento: integer('capacidad_estacionamiento'),
  tieneVestuarios: boolean('tiene_vestuarios'),
  tieneCafeteria: boolean('tiene_cafeteria'),
  horarioApertura: text('horario_apertura'),
  horarioCierre: text('horario_cierre'),
  diasOperacion: text('dias_operacion'),
  imagenUrl: text('imagen_url'),
  fechaRegistro: timestamp('fecha_registro').defaultNow()
});

export const canchas = pgTable('canchas', {
  id: uuid('id').primaryKey().$defaultFn(createId),
  predioId: uuid('predio_id').references(() => predios.id).notNull(),
  nombre: text('nombre').notNull(),
  tipo: text('tipo'),
  capacidadJugadores: integer('capacidad_jugadores'),
  longitud: decimal('longitud'),
  ancho: decimal('ancho'),
  tipoSuperficie: text('tipo_superficie'),
  tieneIluminacion: boolean('tiene_iluminacion'),
  esTechada: boolean('es_techada'),
  precioPorHora: decimal('precio_por_hora', { precision: 10, scale: 2 }),
  estado: text('estado'),
  ultimoMantenimiento: timestamp('ultimo_mantenimiento'),
  equipamientoIncluido: text('equipamiento_incluido'),
  imagenUrl: text('imagen_url'),
  createdAt: timestamp('created_at').defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
  prediosOwned: many(predios)
}));

export const prediosRelations = relations(predios, ({ one, many }) => ({
  usuario: one(users, {
    fields: [predios.usuarioId],
    references: [users.id]
  }),
  canchas: many(canchas)
}));

export const canchasRelations = relations(canchas, ({ one }) => ({
  predio: one(predios, {
    fields: [canchas.predioId],
    references: [predios.id]
  })
}));