import { Router } from 'express';
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/note';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);
router.get('/:id', authMiddleware, getNoteById);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

export default router;
