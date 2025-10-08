import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.userLanguage.createMany({
    data: [
      {
        name: 'Kunnikar Boonbunlu',
        email: 'kunnikar@gmail.com',
        languages: ['Thai', 'English'],
        age: 28,
      },
      {
        name: 'Thomas Falck',
        email: 'thomas@gmail.com',
        languages: ['Swedish', 'English'],
        age: 34,
      },
      {
        name: 'Carlos Mendez',
        email: 'carlos@gmail.com',
        languages: ['Spanish', 'English'],
        age: 22,
      },
      {
        name: 'Dina Kovács',
        email: 'dina@gmail.com',
        languages: ['Hungarian'],
        age: 41,
      },
      {
        name: 'Emilia Rossi',
        email: 'emilia@gmail.com',
        languages: ['Italian', 'English'],
        age: 19,
      },
      {
        name: 'Fouad el-Sayed',
        email: 'fouad@gmail.com',
        languages: ['Arabic', 'French'],
        age: 45,
      },
      {
        name: 'Gita Sharma',
        email: 'gita@gmail.com',
        languages: ['Hindi', 'English'],
        age: 17,
      },
      {
        name: 'Hiro Tanaka',
        email: 'hiro@example.com',
        languages: ['Japanese'],
        age: 27,
      },
      {
        name: 'Bruno Silva',
        email: 'bruno@gmail.com',
        languages: ['Portuguese', 'English'],
        age: 30,
      },
      {
        name: 'Julia Meyer',
        email: 'julia@gmail.com',
        languages: ['German', 'English'],
        age: 16,
      },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
