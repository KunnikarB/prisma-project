import express from "express";
import { PrismaClient } from '@prisma/client';
import { userLanguageSchema, updateLanguagesSchema } 
from "./valiation.ts";
import { z } from 'zod';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
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
 * ✅ POST new user with validation
 */
app.post('/userlanguages', async (req, res) => {
  try {
    const validatedData = userLanguageSchema.parse(req.body);
    const newUser = await prisma.userLanguage.create({
      data: validatedData,
    });
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({
          error: 'Validation failed',
          details: error.flatten().fieldErrors,
        });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * UPDATE user languages by email
 * PUT /userlanguages/:email
 * ✅ UPDATE user languages by email (with validation)
 */
app.put('/userlanguages/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const validatedData = updateLanguagesSchema.parse(req.body);
    const updatedUser = await prisma.userLanguage.update({
      where: { email },
      data: { languages: validatedData.languages },
    });
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: error.flatten().fieldErrors });
    }
    
    res.status(500).json({ error: 'Error updating user' });
  }
});

/**
 * DELETE users under 18
 * DELETE /userlanguages/under18
 */
app.delete('/userlanguages/under18', async (req, res) => {
  try {
    const result = await prisma.userLanguage.deleteMany({
      where: {
        age: { lt: 18 }, // lt = less than
      },
    });

    res.json({
      message: `🧹 Deleted ${result.count} user(s) under 18 years old.`,
      deletedCount: result.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting users.' });
  }
});

// DELETE user by email
app.delete('/userlanguages/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const deleted = await prisma.userLanguage.delete({ where: { email } });
    res.json({ message: `Deleted user: ${deleted.name}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(5500, () => {
  console.log('🚀 Server is running on port 5500');
});