## 🌐 UserLanguage API with Express & Prisma

### A simple RESTful API built using Node.js, Express, and Prisma ORM connected to a PostgreSQL database.
### The project manages user data including name, email, age, and languages (stored as a JSON array).
---

### 🚀 Features
<pre>
✅ Create, Read, Update, and Delete users
✅ Query users by spoken language (from JSON array)
✅ Seed database with mock data
✅ Automatically apply Prisma migrations
</pre>

### 🔥 Tech Stack
<pre>
Node.js + Express

Prisma ORM

PostgreSQL

TypeScript

Nodemon
</pre>
---

### ⚙️ Setup Instructions

#### Clone 
- Clone the repository: https://github.com/KunnikarB/prisma-project.git
- Install dependencies: npm install

#### Setup PostgreSQL connection

- Create a .env file in your project root:
  - DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public"

#### Initialize Prisma
- npx prisma init

#### Run migration
- npx prisma migrate dev --name init

#### Seed the database (prisma/seed.ts)
- Run: npx prisma db seed

<img width="905" height="409" alt="Generated" src="https://github.com/user-attachments/assets/9b1b28f2-235b-4a9a-ada1-1adce563ca22" />

#### Start the server 
- npm run dev
- Server runs at: http://localhost:5500
---

### 📡 API Endpoints

#### ✅ Get/userlanguages (Get all users)
<img width="829" height="1004" alt="GetAllUsers" src="https://github.com/user-attachments/assets/36c5d23f-f2d4-4f2b-b69d-7a724db74f4d" />

#### ✅ Get/userlanguages/:language (Get users who speak a specific language)
<img width="1071" height="443" alt="GetByLanguage" src="https://github.com/user-attachments/assets/e38f2a9b-aac6-491f-981c-854abf9f6de2" />

#### ✅ Post//userlanguages (Add a new user)
<img width="1071" height="420" alt="PostNew" src="https://github.com/user-attachments/assets/ffaee4e4-20a1-4d00-9702-354850953d33" />

#### ✅ Put/userlanguages/:email (Update user’s languages by email)
<img width="1076" height="419" alt="UpdateByEmail" src="https://github.com/user-attachments/assets/ceb8d18e-3a30-4ec2-9807-699f4002ae4d" />

#### ✅ Delete/userlanguages/under18 (Delete all users under 18 years old and returns how many were deleted)
<img width="1074" height="326" alt="DeleteUnder18" src="https://github.com/user-attachments/assets/b895000a-12b4-4ecf-a41c-668c2541a9b1" />

### 🗄️ Database Schema (Prisma)

<pre>  
model UserLanguage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  languages Json
  age       Int
}
</pre>

<img width="849" height="623" alt="CreateTable" src="https://github.com/user-attachments/assets/a79a8f12-2892-4478-9dd4-4176faae45fd" />

