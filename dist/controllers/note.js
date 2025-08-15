"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getNotes = exports.createNote = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Note_1 = __importDefault(require("../models/Note"));
exports.createNote = (0, express_async_handler_1.default)(async (req, res) => {
    const { content } = req.body;
    const userId = req.user._id;
    if (!content || content.trim() === '') {
        res.status(400).json({ message: 'Note content is required' });
        return;
    }
    const note = await Note_1.default.create({
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
exports.getNotes = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user._id;
    const notes = await Note_1.default.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({
        message: 'Notes retrieved successfully',
        status: 200,
        count: notes.length,
        notes
    });
});
exports.getNoteById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const note = await Note_1.default.findOne({ _id: id, user: userId });
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
exports.updateNote = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user._id;
    if (!content || content.trim() === '') {
        res.status(400).json({ message: 'Note content is required' });
        return;
    }
    const note = await Note_1.default.findOne({ _id: id, user: userId });
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
exports.deleteNote = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const note = await Note_1.default.findOne({ _id: id, user: userId });
    if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
    }
    await Note_1.default.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Note deleted successfully',
        status: 200
    });
});
