import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Note from '../models/Note';

export const createNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body;
  const userId = req.user._id;

  if (!content || content.trim() === '') {
    res.status(400).json({ message: 'Note content is required' });
    return;
  }

  const note = await Note.create({
    content: content.trim(),
    user: userId
  });

  res.status(201).json({
    message: 'Note created successfully',
    status: 201,
    note: {
      _id: note._id,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    }
  });
});

export const getNotes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user._id;

  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

  res.status(200).json({
    message: 'Notes retrieved successfully',
    status: 200,
    count: notes.length,
    notes
  });
});

export const getNoteById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user._id;

  const note = await Note.findOne({ _id: id, user: userId });

  if (!note) {
    res.status(404).json({ message: 'Note not found' });
    return;
  }

  res.status(200).json({
    message: 'Note retrieved successfully',
    status: 200,
    note
  });
});

export const updateNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content || content.trim() === '') {
    res.status(400).json({ message: 'Note content is required' });
    return;
  }

  const note = await Note.findOne({ _id: id, user: userId });

  if (!note) {
    res.status(404).json({ message: 'Note not found' });
    return;
  }

  note.content = content.trim();
  await note.save();

  res.status(200).json({
    message: 'Note updated successfully',
    status: 200,
    note: {
      _id: note._id,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    }
  });
});

export const deleteNote = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user._id;

  const note = await Note.findOne({ _id: id, user: userId });

  if (!note) {
    res.status(404).json({ message: 'Note not found' });
    return;
  }

  await Note.findByIdAndDelete(id);

  res.status(200).json({
    message: 'Note deleted successfully',
    status: 200
  });
});
