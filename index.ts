import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

/**
 * GET all users
 * GET /userlanguages
 */
app.get('/userlanguages', async (req, res) => {
  try {
    const users = await prisma.userLanguage.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5500, () => {
  console.log("🚀 Server is running on port 5500");
});


