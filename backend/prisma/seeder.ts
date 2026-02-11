import { PrismaClient, TerritoryType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Helper para crear fechas relativas a hoy
function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

async function main() {
  console.log('🌱 Seed initialized...');

  // Limpiar datos existentes (en orden por dependencias)
  console.log('🗑️  Limpiando datos existentes...');
  await prisma.blockRecord.deleteMany();
  await prisma.territoryRecord.deleteMany();
  await prisma.block.deleteMany();
  await prisma.outingTerritory.deleteMany();
  await prisma.outingAvailability.deleteMany();
  await prisma.outingPlace.deleteMany();
  await prisma.territory.deleteMany();
  await prisma.userSystem.deleteMany();
  await prisma.publisherAvailability.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.role.deleteMany();

  /* ===========================
     ROLES
  =========================== */
  console.log('👥 Creando roles...');

  const serviceOverseer = await prisma.role.create({
    data: { roleName: 'Service_Overseer' },
  });

  const overseerAux = await prisma.role.create({
    data: { roleName: 'Overseer_Aux' },
  });

  const publicador = await prisma.role.create({
    data: { roleName: 'Publicador' },
  });

  /* ===========================
     PUBLISHERS (nombres reales del calendario - solo hombres)
  =========================== */
  console.log('📋 Creando publicadores...');

  const cristian = await prisma.publisher.create({
    data: { name: 'Cristian', lastName: 'Aros', idRole: serviceOverseer.id },
  });

  const pedro = await prisma.publisher.create({
    data: { name: 'Pedro', lastName: 'Chávez', idRole: overseerAux.id },
  });

  const elhiu = await prisma.publisher.create({
    data: { name: 'Elhiu', lastName: 'Carvajal', idRole: publicador.id },
  });

  const alfonso = await prisma.publisher.create({
    data: { name: 'Alfonso', lastName: 'Bravo', idRole: publicador.id },
  });

  const carlos = await prisma.publisher.create({
    data: { name: 'Carlos', lastName: 'Verdejo', idRole: publicador.id },
  });

  const alex = await prisma.publisher.create({
    data: { name: 'Alex', lastName: 'Castillo', idRole: publicador.id },
  });

  const abel = await prisma.publisher.create({
    data: { name: 'Abel', lastName: 'Toro', idRole: publicador.id },
  });

  const ricardo = await prisma.publisher.create({
    data: { name: 'Ricardo', lastName: 'González', idRole: publicador.id },
  });

  const francisco = await prisma.publisher.create({
    data: { name: 'Francisco', lastName: 'Pereira', idRole: publicador.id },
  });

  const manuel = await prisma.publisher.create({
    data: { name: 'Manuel', lastName: 'Henríquez', idRole: publicador.id },
  });

  const wladimir = await prisma.publisher.create({
    data: { name: 'Wladimir', lastName: 'Pino', idRole: publicador.id },
  });

  const lucas = await prisma.publisher.create({
    data: { name: 'Lucas', lastName: 'Ibarra', idRole: publicador.id },
  });

  const leonardo = await prisma.publisher.create({
    data: { name: 'Leonardo', lastName: 'Benavides', idRole: publicador.id },
  });

  const ramon = await prisma.publisher.create({
    data: { name: 'Ramón', lastName: 'Serón', idRole: publicador.id },
  });

  const erick = await prisma.publisher.create({
    data: { name: 'Erick', lastName: 'González', idRole: publicador.id },
  });

  /* ===========================
     USER SYSTEM (solo 2 usuarios)
  =========================== */
  console.log('🔐 Creando usuarios del sistema...');

  await prisma.userSystem.create({
    data: { id: 'caros', hashedPassword: 'hashed_admin123', publisherId: cristian.id },
  });

  await prisma.userSystem.create({
    data: { id: 'pchavez', hashedPassword: 'hashed_aux123', publisherId: pedro.id },
  });

  /* ===========================
     TERRITORIES NORMALES (15 territorios con manzanas)
  =========================== */
  console.log('🗺️  Creando territorios normales...');

  // Territorio 1 - manzanas A-D
  const t1 = await prisma.territory.create({
    data: { territoryNumber: 1, mapColor: '#FFD700', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D'].map(badge => ({ territoryId: t1.id, badge })),
  });

  // Territorio 2 - manzanas A-E
  const t2 = await prisma.territory.create({
    data: { territoryNumber: 2, mapColor: '#FFD700', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D', 'E'].map(badge => ({ territoryId: t2.id, badge })),
  });

  // Territorio 3 - manzanas A-G (el más grande)
  const t3 = await prisma.territory.create({
    data: { territoryNumber: 3, mapColor: '#9370DB', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(badge => ({ territoryId: t3.id, badge })),
  });

  // Territorio 4 - manzanas A-E
  const t4 = await prisma.territory.create({
    data: { territoryNumber: 4, mapColor: '#9370DB', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D', 'E'].map(badge => ({ territoryId: t4.id, badge })),
  });

  // Territorio 5 - manzanas A-D
  const t5 = await prisma.territory.create({
    data: { territoryNumber: 5, mapColor: '#9370DB', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D'].map(badge => ({ territoryId: t5.id, badge })),
  });

  // Territorio 6 - manzanas A-D
  const t6 = await prisma.territory.create({
    data: { territoryNumber: 6, mapColor: '#87CEEB', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D'].map(badge => ({ territoryId: t6.id, badge })),
  });

  // Territorio 7 - manzanas A-E
  const t7 = await prisma.territory.create({
    data: { territoryNumber: 7, mapColor: '#98FB98', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D', 'E'].map(badge => ({ territoryId: t7.id, badge })),
  });

  // Territorio 8 - manzanas A-C
  const t8 = await prisma.territory.create({
    data: { territoryNumber: 8, mapColor: '#DDA0DD', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C'].map(badge => ({ territoryId: t8.id, badge })),
  });

  // Territorio 9 - manzanas A-C
  const t9 = await prisma.territory.create({
    data: { territoryNumber: 9, mapColor: '#20B2AA', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C'].map(badge => ({ territoryId: t9.id, badge })),
  });

  // Territorio 10 - manzanas A-C
  const t10 = await prisma.territory.create({
    data: { territoryNumber: 10, mapColor: '#FF6347', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C'].map(badge => ({ territoryId: t10.id, badge })),
  });

  // Territorio 11 - manzanas A-E
  const t11 = await prisma.territory.create({
    data: { territoryNumber: 11, mapColor: '#4682B4', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D', 'E'].map(badge => ({ territoryId: t11.id, badge })),
  });

  // Territorio 20 - manzanas A-D
  const t20 = await prisma.territory.create({
    data: { territoryNumber: 20, mapColor: '#32CD32', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D'].map(badge => ({ territoryId: t20.id, badge })),
  });

  // Territorio 29 - manzanas A-D
  const t29 = await prisma.territory.create({
    data: { territoryNumber: 29, mapColor: '#FF8C00', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D'].map(badge => ({ territoryId: t29.id, badge })),
  });

  // Territorio 34 - manzanas A-C
  const t34 = await prisma.territory.create({
    data: { territoryNumber: 34, mapColor: '#1E90FF', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C'].map(badge => ({ territoryId: t34.id, badge })),
  });

  // Territorio 47 - manzanas A-D
  const t47 = await prisma.territory.create({
    data: { territoryNumber: 47, mapColor: '#FFEFD5', territoryType: TerritoryType.NORMAL },
  });
  await prisma.block.createMany({
    data: ['A', 'B', 'C', 'D'].map(badge => ({ territoryId: t47.id, badge })),
  });

  /* ===========================
     TERRITORIOS SAN JOSÉ (BLOCKS - edificios numerados)
  =========================== */
  console.log('🏢 Creando territorios Población San José...');

  // Territorio 12 - edificios 1-7
  const sj12 = await prisma.territory.create({
    data: { territoryNumber: 12, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['1', '2', '3', '4', '5', '6', '7'].map(badge => ({ territoryId: sj12.id, badge })),
  });

  // Territorio 13 - edificios 1-4
  const sj13 = await prisma.territory.create({
    data: { territoryNumber: 13, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['1', '2', '3', '4'].map(badge => ({ territoryId: sj13.id, badge })),
  });

  // Territorio 14 - edificios 1-5
  const sj14 = await prisma.territory.create({
    data: { territoryNumber: 14, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['1', '2', '3', '4', '5'].map(badge => ({ territoryId: sj14.id, badge })),
  });

  // Territorio 15 - edificios 10-15
  const sj15 = await prisma.territory.create({
    data: { territoryNumber: 15, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['10', '11', '12', '13', '14', '15'].map(badge => ({ territoryId: sj15.id, badge })),
  });

  // Territorio 16 - edificios 16-20
  const sj16 = await prisma.territory.create({
    data: { territoryNumber: 16, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['16', '17', '18', '19', '20'].map(badge => ({ territoryId: sj16.id, badge })),
  });

  // Territorio 17 - edificios 21-23
  const sj17 = await prisma.territory.create({
    data: { territoryNumber: 17, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['21', '22', '23'].map(badge => ({ territoryId: sj17.id, badge })),
  });

  // Territorio 18 - edificios 16-18
  const sj18 = await prisma.territory.create({
    data: { territoryNumber: 18, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['16', '17', '18'].map(badge => ({ territoryId: sj18.id, badge })),
  });

  // Territorio 19 - edificios 12-15
  const sj19 = await prisma.territory.create({
    data: { territoryNumber: 19, mapColor: '#90EE90', territoryType: TerritoryType.BLOCKS },
  });
  await prisma.block.createMany({
    data: ['12', '13', '14', '15'].map(badge => ({ territoryId: sj19.id, badge })),
  });

  /* ===========================
     OUTING PLACES (lugares de salida reales del calendario)
  =========================== */
  console.log('🏠 Creando lugares de salida...');

  const salonReino = await prisma.outingPlace.create({
    data: { familyName: 'Salón del Reino', address: 'Maturana 1097' },
  });

  const famMolina = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Molina', address: 'El Puente 2120' },
  });

  const famArredondo = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Arredondo', address: 'Sector Centro' },
  });

  const famGracielaDiaz = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Graciela Díaz', address: 'Sector Norte' },
  });

  const famPino = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Pino', address: 'Sector Sur' },
  });

  const famCastillo = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Castillo', address: 'Sector Este' },
  });

  const famVasquez = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Vásquez', address: 'Sector Oeste' },
  });

  const famGomez = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Gómez', address: 'Villa Nueva' },
  });

  const famGalassi = await prisma.outingPlace.create({
    data: { familyName: 'Fam. Galassi', address: 'Población Central' },
  });

  /* ===========================
     OUTING TERRITORIES
  =========================== */
  console.log('🔗 Vinculando territorios con lugares...');

  const allTerritories = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t20, t29, t34, t47, sj12, sj13, sj14, sj15, sj16, sj17, sj18, sj19];

  // Salón del Reino - todos los territorios
  for (const t of allTerritories) {
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: salonReino.id },
    });
  }

  // Territorios cercanos a cada familia
  for (const t of [t1, t2, t3, t29]) {
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: famMolina.id },
    });
  }

  for (const t of [t4, t5, t11]) {
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: famArredondo.id },
    });
  }

  for (const t of [t6, t7, t34]) {
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: famGracielaDiaz.id },
    });
  }

  for (const t of [t8, t9, t47]) {
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: famCastillo.id },
    });
  }

  // San José cercano a Fam. Gómez
  for (const t of [sj12, sj13, sj14, sj15, sj16, sj17, sj18, sj19]) {
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: famGomez.id },
    });
  }

  /* ===========================
     TERRITORY RECORDS (registros de trabajo variados)
  =========================== */
  console.log('📝 Creando registros de territorios...');

  // T1: COMPLETADO hace 5 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: t1.id,
      publisherId: cristian.id,
      outingPlaceId: salonReino.id,
      dateAssigned: daysAgo(10),
      dateWorked: daysAgo(7),
      dateCompleted: daysAgo(5),
      comment: 'Territorio completado, buen día de predicación',
    },
  });

  // T2: COMPLETADO hace 12 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: t2.id,
      publisherId: pedro.id,
      outingPlaceId: famMolina.id,
      dateAssigned: daysAgo(20),
      dateWorked: daysAgo(15),
      dateCompleted: daysAgo(12),
      comment: 'Buen territorio, muchos interesados',
    },
  });

  // T3: INCOMPLETO en progreso 🔄
  await prisma.territoryRecord.create({
    data: {
      territoryId: t3.id,
      publisherId: elhiu.id,
      outingPlaceId: famMolina.id,
      dateAssigned: daysAgo(7),
      dateWorked: daysAgo(3),
      dateCompleted: null,
      comment: 'Faltan manzanas E, F y G',
    },
  });

  // T4: VENCIDO hace 45 días ⚠️
  await prisma.territoryRecord.create({
    data: {
      territoryId: t4.id,
      publisherId: alfonso.id,
      outingPlaceId: famArredondo.id,
      dateAssigned: daysAgo(60),
      dateWorked: daysAgo(50),
      dateCompleted: daysAgo(45),
      comment: 'Territorio antiguo, revisar',
    },
  });

  // T5: VENCIDO hace 90 días ⚠️
  await prisma.territoryRecord.create({
    data: {
      territoryId: t5.id,
      publisherId: carlos.id,
      outingPlaceId: famArredondo.id,
      dateAssigned: daysAgo(100),
      dateWorked: daysAgo(95),
      dateCompleted: daysAgo(90),
    },
  });

  // T6: INCOMPLETO recién asignado 🔄
  await prisma.territoryRecord.create({
    data: {
      territoryId: t6.id,
      publisherId: alex.id,
      outingPlaceId: famGracielaDiaz.id,
      dateAssigned: daysAgo(3),
      dateWorked: daysAgo(1),
      dateCompleted: null,
      comment: 'Recién asignado',
    },
  });

  // T7: COMPLETADO hace 8 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: t7.id,
      publisherId: abel.id,
      outingPlaceId: famGracielaDiaz.id,
      dateAssigned: daysAgo(14),
      dateWorked: daysAgo(10),
      dateCompleted: daysAgo(8),
    },
  });

  // T8: VENCIDO hace 60 días ⚠️
  await prisma.territoryRecord.create({
    data: {
      territoryId: t8.id,
      publisherId: ricardo.id,
      outingPlaceId: famCastillo.id,
      dateAssigned: daysAgo(75),
      dateWorked: daysAgo(65),
      dateCompleted: daysAgo(60),
    },
  });

  // T9: Sin registros = INDOCUMENTADO 📭

  // T10: Sin registros = INDOCUMENTADO 📭

  // T11: COMPLETADO hace 3 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: t11.id,
      publisherId: francisco.id,
      outingPlaceId: famArredondo.id,
      dateAssigned: daysAgo(10),
      dateWorked: daysAgo(5),
      dateCompleted: daysAgo(3),
      comment: 'Excelente recepción',
    },
  });

  // T20: INCOMPLETO 🔄
  await prisma.territoryRecord.create({
    data: {
      territoryId: t20.id,
      publisherId: manuel.id,
      outingPlaceId: salonReino.id,
      dateAssigned: daysAgo(5),
      dateWorked: daysAgo(2),
      dateCompleted: null,
    },
  });

  // T29: COMPLETADO hace 10 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: t29.id,
      publisherId: ramon.id,
      outingPlaceId: famMolina.id,
      dateAssigned: daysAgo(20),
      dateWorked: daysAgo(12),
      dateCompleted: daysAgo(10),
    },
  });

  // T34: Sin registros = INDOCUMENTADO 📭

  // T47: VENCIDO hace 40 días ⚠️
  await prisma.territoryRecord.create({
    data: {
      territoryId: t47.id,
      publisherId: wladimir.id,
      outingPlaceId: famCastillo.id,
      dateAssigned: daysAgo(50),
      dateWorked: daysAgo(45),
      dateCompleted: daysAgo(40),
    },
  });

  // SAN JOSÉ - Territorios 12-19

  // SJ12: COMPLETADO hace 7 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: sj12.id,
      publisherId: lucas.id,
      outingPlaceId: famGomez.id,
      dateAssigned: daysAgo(14),
      dateWorked: daysAgo(10),
      dateCompleted: daysAgo(7),
      comment: 'Edificios 1-7 completados',
    },
  });

  // SJ13: Sin registros = INDOCUMENTADO 📭

  // SJ14: INCOMPLETO 🔄
  await prisma.territoryRecord.create({
    data: {
      territoryId: sj14.id,
      publisherId: leonardo.id,
      outingPlaceId: famGomez.id,
      dateAssigned: daysAgo(5),
      dateWorked: daysAgo(2),
      dateCompleted: null,
      comment: 'Faltan edificios 4 y 5',
    },
  });

  // SJ15: COMPLETADO hace 15 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: sj15.id,
      publisherId: erick.id,
      outingPlaceId: famGomez.id,
      dateAssigned: daysAgo(25),
      dateWorked: daysAgo(20),
      dateCompleted: daysAgo(15),
    },
  });

  // SJ16: Sin registros = INDOCUMENTADO 📭

  // SJ17: VENCIDO hace 50 días ⚠️
  await prisma.territoryRecord.create({
    data: {
      territoryId: sj17.id,
      publisherId: pedro.id,
      outingPlaceId: famGomez.id,
      dateAssigned: daysAgo(60),
      dateWorked: daysAgo(55),
      dateCompleted: daysAgo(50),
    },
  });

  // SJ18: Sin registros = INDOCUMENTADO 📭

  // SJ19: COMPLETADO hace 4 días ✅
  await prisma.territoryRecord.create({
    data: {
      territoryId: sj19.id,
      publisherId: cristian.id,
      outingPlaceId: salonReino.id,
      dateAssigned: daysAgo(10),
      dateWorked: daysAgo(6),
      dateCompleted: daysAgo(4),
    },
  });

  /* ===========================
     RESUMEN FINAL
  =========================== */
  console.log('\n✅ Seed completado!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Resumen de datos creados:');
  console.log('   • Roles: 3');
  console.log('   • Publicadores: 15');
  console.log('   • Usuarios del sistema: 2 (Cristian y Pedro)');
  console.log('   • Territorios normales: 15 (con manzanas A-G)');
  console.log('   • Territorios San José (BLOCKS): 8 (con edificios)');
  console.log('   • Lugares de salida: 9');
  console.log('   • Registros de territorio: 16');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📋 Estados esperados con days=14:');
  console.log('   ✅ COMPLETADO: T1, T2, T7, T11, T29, SJ12, SJ15, SJ19');
  console.log('   🔄 INCOMPLETO: T3, T6, T20, SJ14');
  console.log('   ⚠️  VENCIDO: T4, T5, T8, T47, SJ17');
  console.log('   📭 INDOCUMENTADO: T9, T10, T34, SJ13, SJ16, SJ18');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
