import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {

  /**
   * 🔐 AUTH: return current logged-in user
   * Used by useAuth.tsx
   */
  app.get("/api/me", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json(null);
    }
    res.json(req.user);
  });

  /**
   * 📝 CREATE WAITLIST ENTRY
   */
  app.post("/api/waitlist", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as any;
      const data = insertWaitlistSchema.parse({
        ...req.body,
        userId: user.id,
      });

      const entry = await storage.createWaitlistEntry(data);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  /**
   * 🧾 GET WAITLIST ENTRY FOR CURRENT USER
   */
  app.get("/api/waitlist/user", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = (req.user as any).id;
    const entry = await storage.getWaitlistEntryByUserId(userId);

    if (!entry) {
      return res.status(404).json({ message: "User not found on waitlist" });
    }

    res.json(entry);
  });

  /**
   * 📊 USER STATS (mock)
   */
  app.get("/api/user/:id/stats", async (_req, res) => {
    res.json({ followers: 0, collabs: 0 });
  });

  const httpServer = createServer(app);
  return httpServer;
}
