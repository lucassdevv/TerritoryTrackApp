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
    data: { name: 'Daniel', lastName: 'Richards', idRole: serviceOverseer.id },
  });

  const pedro = await prisma.publisher.create({
    data: { name: 'Marcus', lastName: 'Thompson', idRole: overseerAux.id },
  });

  const elhiu = await prisma.publisher.create({
    data: { name: 'Ethan', lastName: 'Walker', idRole: publicador.id },
  });

  const alfonso = await prisma.publisher.create({
    data: { name: 'Alex', lastName: 'Bennett', idRole: publicador.id },
  });

  const carlos = await prisma.publisher.create({
    data: { name: 'David', lastName: 'Foster', idRole: publicador.id },
  });

  const alex = await prisma.publisher.create({
    data: { name: 'Chris', lastName: 'Martin', idRole: publicador.id },
  });

  const abel = await prisma.publisher.create({
    data: { name: 'Benjamin', lastName: 'Reed', idRole: publicador.id },
  });

  const ricardo = await prisma.publisher.create({
    data: { name: 'Robert', lastName: 'Baker', idRole: publicador.id },
  });

  const francisco = await prisma.publisher.create({
    data: { name: 'Franklin', lastName: 'Pierce', idRole: publicador.id },
  });

  const manuel = await prisma.publisher.create({
    data: { name: 'Michael', lastName: 'Henderson', idRole: publicador.id },
  });

  const wladimir = await prisma.publisher.create({
    data: { name: 'William', lastName: 'Pine', idRole: publicador.id },
  });

  const lucas = await prisma.publisher.create({
    data: { name: 'Lucas', lastName: 'Ibarra', idRole: publicador.id },
  });

  const leonardo = await prisma.publisher.create({
    data: { name: 'Leo', lastName: 'Harrison', idRole: publicador.id },
  });

  const ramon = await prisma.publisher.create({
    data: { name: 'Raymond', lastName: 'Stone', idRole: publicador.id },
  });

  const erick = await prisma.publisher.create({
    data: { name: 'Eric', lastName: 'Graham', idRole: publicador.id },
  });

  // Nuevos Capitanes (Publicadores) agregados
  await prisma.publisher.createMany({
    data: [
      { name: 'Samuel', lastName: 'Lee', idRole: publicador.id },
      { name: 'Charles', lastName: 'Day', idRole: publicador.id },
      { name: 'Edward', lastName: 'Wolf', idRole: publicador.id },
      { name: 'Henry', lastName: 'Green', idRole: publicador.id },
      { name: 'Isaac', lastName: 'Pine', idRole: publicador.id },
      { name: 'James', lastName: 'Vance', idRole: publicador.id },
      { name: 'Justin', lastName: 'Parker', idRole: publicador.id },
      { name: 'Robert', lastName: 'Vance', idRole: publicador.id },
      { name: 'Caleb', lastName: 'Grant', idRole: publicador.id },
      { name: 'Matthew', lastName: 'Scott', idRole: publicador.id },
      { name: 'Patrick', lastName: 'Dune', idRole: publicador.id },
    ]
  });

  /* ===========================
     USER SYSTEM
  =========================== */
  console.log('🔐 Creando usuarios del sistema...');
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  const adminPassword = await bcrypt.hash('admin123', saltRounds);
  const auxPassword = await bcrypt.hash('aux123', saltRounds);

  await prisma.userSystem.create({
    data: { id: 'admin', hashedPassword: adminPassword, publisherId: cristian.id },
  });

  await prisma.userSystem.create({
    data: { id: 'moderator', hashedPassword: auxPassword, publisherId: pedro.id },
  });

  /* ===========================
     TERRITORIOS (Real Data)
  =========================== */
  console.log('🗺️  Creando territorios...');

  const realTerritories = [
    { n: 1, type: TerritoryType.NORMAL, c: '#a2b851', b: ['A', 'B', 'C', 'D'] },
    { n: 2, type: TerritoryType.NORMAL, c: '#feca6d', b: ['A', 'B', 'C', 'D'] },
    { n: 3, type: TerritoryType.NORMAL, c: '#36b13e', b: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
    { n: 4, type: TerritoryType.NORMAL, c: '#bbc5e3', b: ['A', 'B', 'C', 'D', 'E'] },
    { n: 5, type: TerritoryType.NORMAL, c: '#c38bba', b: ['A', 'B', 'C', 'D', 'E'] },
    { n: 6, type: TerritoryType.NORMAL, c: '#6fabd9', b: ['A', 'B', 'C', 'D'] },
    { n: 7, type: TerritoryType.NORMAL, c: '#bfce3b', b: ['A', 'B', 'C', 'D'] },
    { n: 8, type: TerritoryType.NORMAL, c: '#e89c25', b: ['A', 'B', 'C', 'D'] },
    { n: 9, type: TerritoryType.NORMAL, c: '#08ded6', b: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { n: 10, type: TerritoryType.NORMAL, c: '#f41525', b: ['A', 'B', 'C', 'D', 'F', 'G'] },
    { n: 11, type: TerritoryType.NORMAL, c: '#36b13e', b: ['A', 'B', 'C', 'D', 'E'] },
    
    // Poblacion San Jose (BLOCKS)
    { n: 12, type: TerritoryType.BLOCKS, c: '#def79a', b: ['1', '2', '3'] },
    { n: 13, type: TerritoryType.BLOCKS, c: '#def79a', b: ['4', '5', '6'] },
    { n: 14, type: TerritoryType.BLOCKS, c: '#def79a', b: ['7', '8', '9'] },
    { n: 15, type: TerritoryType.BLOCKS, c: '#def79a', b: ['10', '11', '12'] },
    { n: 16, type: TerritoryType.BLOCKS, c: '#def79a', b: ['18', '19', '20'] },
    { n: 17, type: TerritoryType.BLOCKS, c: '#def79a', b: ['21', '22', '23'] },
    { n: 18, type: TerritoryType.BLOCKS, c: '#def79a', b: ['16', '17'] },
    { n: 19, type: TerritoryType.BLOCKS, c: '#def79a', b: ['13', '14', '15'] },

    { n: 20, type: TerritoryType.NORMAL, c: '#6987c1', b: ['A', 'B', 'C', 'D'] },
    { n: 21, type: TerritoryType.NORMAL, c: '#525fb4', b: ['A', 'B'] },
    { n: 22, type: TerritoryType.NORMAL, c: '#08fc34', b: ['A', 'B', 'C'] },
    { n: 23, type: TerritoryType.NORMAL, c: '#fafc7b', b: ['A', 'B', 'C', 'D'] },
    { n: 24, type: TerritoryType.NORMAL, c: '#ed6c1d', b: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { n: 25, type: TerritoryType.NORMAL, c: '#eb5e6e', b: ['A', 'B', 'C'] },
    { n: 26, type: TerritoryType.NORMAL, c: '#69abd9', b: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { n: 27, type: TerritoryType.NORMAL, c: '#08fc34', b: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { n: 28, type: TerritoryType.NORMAL, c: '#fa9015', b: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { n: 29, type: TerritoryType.NORMAL, c: '#677232', b: ['A', 'B', 'C', 'D'] },
    { n: 30, type: TerritoryType.NORMAL, c: '#f46c6e', b: ['A', 'B', 'C', 'D'] },
    { n: 31, type: TerritoryType.NORMAL, c: '#fbc96c', b: ['A', 'B', 'C'] },
    { n: 32, type: TerritoryType.NORMAL, c: '#ed5b10', b: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { n: 33, type: TerritoryType.NORMAL, c: '#79cfd4', b: ['A', 'B', 'C', 'D'] },
    { n: 34, type: TerritoryType.NORMAL, c: '#040dff', b: ['A', 'B', 'C'] },
    { n: 35, type: TerritoryType.NORMAL, c: '#fef106', b: ['A', 'B', 'C', 'D'] },
    { n: 36, type: TerritoryType.NORMAL, c: '#f1d7ad', b: ['A', 'B', 'C'] },
    { n: 37, type: TerritoryType.NORMAL, c: '#fbb341', b: ['A', 'B', 'C', 'D'] },
    { n: 38, type: TerritoryType.NORMAL, c: '#3bb93e', b: ['A', 'B', 'C', 'D'] },
    { n: 39, type: TerritoryType.NORMAL, c: '#4e55a0', b: ['A', 'B', 'C'] },
    { n: 40, type: TerritoryType.NORMAL, c: '#7bcfcf', b: ['A', 'B', 'C', 'D'] },
    { n: 41, type: TerritoryType.NORMAL, c: '#fcd36c', b: ['A', 'B', 'C'] },
    { n: 42, type: TerritoryType.NORMAL, c: '#f26e6d', b: ['A', 'B', 'C'] },
    { n: 43, type: TerritoryType.NORMAL, c: '#445199', b: ['A', 'B'] },
    { n: 44, type: TerritoryType.NORMAL, c: '#6eaae1', b: ['A', 'B', 'C', 'D'] },
    { n: 45, type: TerritoryType.NORMAL, c: '#d29bc6', b: ['A', 'B', 'C'] },
    { n: 46, type: TerritoryType.NORMAL, c: '#e5ed99', b: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { n: 47, type: TerritoryType.NORMAL, c: '#04f3f1', b: ['A', 'B', 'C', 'D'] },
    { n: 48, type: TerritoryType.NORMAL, c: '#8fa227', b: ['A', 'B', 'C', 'D'] },
    { n: 49, type: TerritoryType.NORMAL, c: '#e51e18', b: ['A', 'B', 'C', 'D', 'E'] },
    { n: 50, type: TerritoryType.NORMAL, c: '#e5ed7a', b: ['A', 'B', 'C'] },
    { n: 51, type: TerritoryType.NORMAL, c: '#5aaf42', b: ['A', 'B', 'C'] },
    { n: 52, type: TerritoryType.NORMAL, c: '#6eaae1', b: ['A', 'B'] },
  ];

  for (const item of realTerritories) {
    const t = await prisma.territory.create({
      data: { territoryNumber: item.n, mapColor: item.c, territoryType: item.type },
    });
    const blockData = item.b.map(badge => ({ territoryId: t.id, badge }));
    if(blockData.length > 0) {
      await prisma.block.createMany({ data: blockData });
    }
  }

  /* ===========================
     OUTING PLACES (Configuración Real)
  =========================== */
  console.log('🏠 Creando lugares de salida...');

  const salonReino = await prisma.outingPlace.create({
    data: { familyName: 'Kingdom Hall', address: '123 Main Street' },
  });

  const outingPlacesData = [
    { familyName: 'Richards Family', address: '456 Oak Avenue' },
    { familyName: 'Thompson Family', address: '789 Pine Lane' },
    { familyName: 'Walker Family', address: '321 Lake Drive' },
    { familyName: 'Bennett Family', address: '555 Park Road' },
    { familyName: 'Foster Family', address: '111 Sunset Blvd' },
    { familyName: 'Martin Family', address: '222 River Path' },
    { familyName: 'Reed Family', address: '333 Mountain View' },
    { familyName: 'Baker Family', address: '444 Palm Street' },
    { familyName: 'Pierce Family', address: '555 Saint Peter Rd' },
    { familyName: 'Henderson Family', address: '777 Sky Tower, Suite 303' },
    { familyName: 'Pine Family', address: '888 Valley Road' },
    { familyName: 'Rivers Family', address: '999 Faith Street' },
    { familyName: 'Harrison Family', address: '1010 Flight Way' },
    { familyName: 'Stone Family', address: '2121 Bridge Street' },
    { familyName: 'Graham Family', address: '151 Garden Lane' },
  ];

  const otherPlaces: any[] = [];
  for (const place of outingPlacesData) {
    const p = await prisma.outingPlace.create({ data: place });
    otherPlaces.push(p);
  }

  const allPlaces = [salonReino, ...otherPlaces];

  /* ===========================
     OUTING TERRITORIES
  =========================== */
  console.log('🔗 Vinculando territorios con lugares...');

  const dbTerritories = await prisma.territory.findMany();

  for (let i = 0; i < dbTerritories.length; i++) {
    const t = dbTerritories[i];
    // Todos vinculados al Salón del Reino
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: salonReino.id },
    });
    // Y vinculados a otro lugar al azar para que el form tenga opciones filtradas
    const randomPlace = allPlaces[(i % (allPlaces.length - 1)) + 1];
    await prisma.outingTerritory.create({
      data: { territoryId: t.id, outingPlaceId: randomPlace.id },
    });
  }

  /* ===========================
     TERRITORY RECORDS (Registros Demo para Dashboard)
  =========================== */
  console.log('📝 Creando registros de territorios mockizados para demostración...');

  const publishers = await prisma.publisher.findMany();

  // Función para agarrar publicador aleatorio
  const randomPub = () => publishers[Math.floor(Math.random() * publishers.length)].id;
  const tc = (num: number) => dbTerritories.find(t => t.territoryNumber === num);

  // Escenarios diseñados para probar los filtros de 14, 30 y 60 días
  const mockScenarios = [
    // 1. COMPLETADO siempre (hecho hace 5 días) -> Completado en filtro 14, 30 y 60
    { tNum: 1, days: { a: 10, w: 7, c: 5 }, state: 'COMPLETADO', cmt: 'Territorio 1: Reciente.' },
    
    // 2. VENCIDO a los 14 días, pero COMPLETADO a los 30 y 60 (hecho hace 20 días)
    { tNum: 2, days: { a: 25, w: 22, c: 20 }, state: 'COMPLETADO', cmt: 'Territorio 2: Medio tiempo.' },
    
    // 3. VENCIDO a los 14 y 30 días, pero COMPLETADO a los 60 (hecho hace 45 días)
    { tNum: 3, days: { a: 50, w: 48, c: 45 }, state: 'COMPLETADO', cmt: 'Territorio 3: Bastante antiguo.' },
    
    // 4. VENCIDO siempre (hecho hace 70 días) -> Vencido en filtro 14, 30 y 60
    { tNum: 4, days: { a: 75, w: 72, c: 70 }, state: 'VENCIDO_COMPLETO', cmt: 'Territorio 4: Muy antiguo, toca reasignar.' },
    
    // 5. INCOMPLETO siempre (no tiene fecha de completado)
    { tNum: 5, days: { a: 7, w: 3, c: null }, state: 'INCOMPLETO', cmt: 'Territorio 5: Quedaron manzanas B y C pendientes.' },
    
    // 6. INDOCUMENTADO siempre (sin records)
    { tNum: 6, days: { a: null, w: null, c: null }, state: 'INDOCUMENTADO' },

    // Extras para mostrar variedad en tabla
    { tNum: 10, days: { a: 4, w: 2, c: 1 }, state: 'COMPLETADO', cmt: 'Territorio 10: Bloques completados velozmente.' },
    { tNum: 12, days: { a: 15, w: 10, c: null }, state: 'INCOMPLETO', cmt: 'Territorio 12: Bloque 3 pendiente.' },
    { tNum: 20, days: { a: 100, w: 90, c: null }, state: 'INCOMPLETO', cmt: 'Territorio 20: Olvidado hace meses.' },
    { tNum: 31, days: { a: 35, w: 32, c: 31 }, state: 'COMPLETADO', cmt: '' },
    { tNum: 52, days: { a: 12, w: 8, c: 0 }, state: 'INCOMPLETO', cmt: 'Falta A.' },
  ];

  for (const scenario of mockScenarios) {
    const t = tc(scenario.tNum);
    if(!t) continue;
    
    if (scenario.state === 'INDOCUMENTADO') continue;

    const record = await prisma.territoryRecord.create({
      data: {
        territoryId: t.id,
        publisherId: randomPub(),
        outingPlaceId: salonReino.id,
        dateAssigned: daysAgo(scenario.days.a!),
        dateWorked: daysAgo(scenario.days.w!),
        dateCompleted: scenario.days.c !== null ? daysAgo(scenario.days.c) : null,
        comment: scenario.cmt,
      },
    });

    // Añadir manzanas trabajadas
    if (scenario.state !== 'INDOCUMENTADO') {
        const blocks = await prisma.block.findMany({ where: { territoryId: t.id }});
        // Si es incompleto o vencido incompleto, simulamos que hicieron una parte
        const isIncomplete = scenario.state.includes('INCOMPLETO');
        const count = isIncomplete ? Math.max(1, Math.floor(blocks.length / 2)) : blocks.length;
        
        for(let j=0; j<count; j++) {
          await prisma.blockRecord.create({
             data: { blockId: blocks[j].id, territoryRecordId: record.id }
          });
        }
    }
  }

  /* ===========================
     RESUMEN FINAL
  =========================== */
  console.log('\n✅ Seed con DATA DE DEMOSTRACIÓN completado!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 Territorios insertados: ${dbTerritories.length}`);
  console.log(`👥 Publicadores insertados: ${(await prisma.publisher.count())}`);
  console.log('🚀 Base de datos lista para pruebas del dashboard.');
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
