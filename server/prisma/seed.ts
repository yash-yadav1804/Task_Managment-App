import { PrismaClient } from '../generated/prisma/index.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/task_management?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      username: 'alicej',
      title: 'Frontend Engineer',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      username: 'bobsmith',
      title: 'Backend Engineer',
    },
  });

  // Create Project
  const project = await prisma.project.create({
    data: {
      name: 'Task Management System Rebuild',
      description: 'Rebuilding our core task management application with Next.js and NestJS.',
      priority: 'HIGH',
      leadId: user1.id,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  });

  // Create Labels
  const labelFrontend = await prisma.label.upsert({
    where: { name: 'Frontend' },
    update: {},
    create: { name: 'Frontend', color: 'blue' },
  });

  const labelBackend = await prisma.label.upsert({
    where: { name: 'Backend' },
    update: {},
    create: { name: 'Backend', color: 'green' },
  });

  // Create Tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Setup Next.js Project',
      description: 'Initialize the frontend workspace using create-next-app.',
      status: 'COMPLETED',
      priority: 'HIGH',
      projectId: project.id,
      reporterId: user1.id,
      TaskMember: {
        create: [{ userId: user1.id }],
      },
      TaskLabel: {
        create: [{ labelId: labelFrontend.id }],
      },
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Setup NestJS Backend',
      description: 'Initialize the server workspace and configure Prisma.',
      status: 'DOING',
      priority: 'HIGH',
      projectId: project.id,
      reporterId: user2.id,
      TaskMember: {
        create: [{ userId: user2.id }],
      },
      TaskLabel: {
        create: [{ labelId: labelBackend.id }],
      },
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
