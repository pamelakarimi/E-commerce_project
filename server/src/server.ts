import { PrismaClient } from "@prisma/client"
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes"

//load all your env. variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

export const prisma = new PrismaClient();

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("Hello from E-Commerce backend");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
  });
  
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit();
  });