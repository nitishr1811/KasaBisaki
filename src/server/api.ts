import express, { Request, Response } from 'express';
import { classifyWasteImage, chatAboutWasteItem } from './geminiService';
import { RegionalGuideline } from '../types/waste';

export function createApiRouter(): express.Express {
  const app = express();

  // Parse JSON payloads up to 15MB for base64 images
  app.use(express.json({ limit: '15mb' }));

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'EcoLens AI Service',
      version: '1.0.0',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: Date.now(),
    });
  });

  // Photo classification endpoint
  app.post('/api/classify', async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageBase64, mimeType, region } = req.body;

      if (!imageBase64 || typeof imageBase64 !== 'string') {
        res.status(400).json({
          error: 'Missing or invalid imageBase64 payload.',
        });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please verify configuration.',
        });
        return;
      }

      const result = await classifyWasteImage(
        imageBase64,
        mimeType || 'image/jpeg',
        (region as RegionalGuideline) || 'swachh_bharat'
      );

      res.json(result);
    } catch (err: any) {
      console.error('[API /api/classify error]:', err);
      res.status(500).json({
        error: err.message || 'An error occurred while analyzing the waste item image.',
      });
    }
  });

  // Context-aware follow-up chat endpoint
  app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
    try {
      const { itemContext, history, question, region } = req.body;

      if (!question || typeof question !== 'string') {
        res.status(400).json({
          error: 'Question is required.',
        });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
        });
        return;
      }

      const answer = await chatAboutWasteItem(
        itemContext || {},
        Array.isArray(history) ? history : [],
        question,
        (region as RegionalGuideline) || 'swachh_bharat'
      );

      res.json({ reply: answer });
    } catch (err: any) {
      console.error('[API /api/chat error]:', err);
      res.status(500).json({
        error: err.message || 'An error occurred while generating the assistant response.',
      });
    }
  });

  return app;
}
