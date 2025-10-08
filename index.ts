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

/**
 * GET users by language
 * GET /userlanguages/:language
 */
app.get('/userlanguages/:language', async (req, res) => {
  const { language } = req.params;

  try {
    const users = await prisma.userLanguage.findMany({
      where: {
        languages: {
          array_contains: [language], 
        },
      },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: `No users found for language: ${language}` });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users by language' });
  }
});


/**
 * POST new user
 * POST /userlanguages
 */
app.post('/userlanguages', async (req, res) => {
  const { name, email, languages, age } = req.body;
  try {
    const newUser = await prisma.userLanguage.create({
      data: { name, email, languages, age },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

/**
 * UPDATE user languages by email
 * PUT /userlanguages/:email
 */
app.put('/userlanguages/:email', async (req, res) => {
  const { email } = req.params;
  const { languages } = req.body;
  try {
    const updatedUser = await prisma.userLanguage.update({
      where: { email },
      data: { languages },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: `Failed to update languages for ${email}` });
  }
});

app.listen(5500, () => {
  console.log('🚀 Server is running on port 5500');
});