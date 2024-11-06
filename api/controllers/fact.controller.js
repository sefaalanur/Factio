import Fact from "../models/fact.model.js";
import {errorHandler}  from '../utils/error.js';

export const create = async (req, res, next) => {
    if(!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a fact!'));
    };
    if(!req.body.title || !req.body.content) {
        next(errorHandler(400, 'Please provide all required fields!'));
    };
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    const newFact = new Fact({
        ...req.body,
        slug,
        userId: req.user.id
    });
    try{
        const savedFact = await newFact.save();
        res.status(201).json(savedFact);
    } catch(error){
        next(error);
    }  
}

export const getfacts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const facts = await Fact.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.factId && { _id: req.query.factId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalFacts = await Fact.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthFacts = await Fact.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({
        facts,
        totalFacts,
        lastMonthFacts,
      });
    } catch (error) {
      next(error);
    }
  };

  export const deletefact = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this fact'));
    }
    try {
      await Fact.findByIdAndDelete(req.params.factId);
      res.status(200).json('The fact has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const updatefact = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this fact'));
    }
    try {
      const updatedFact = await Fact.findByIdAndUpdate(
        req.params.factId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedFact);
    } catch (error) {
      next(error);
    }
  };

  export const likeFact = async (req, res, next) => {
    try {
      const fact = await Fact.findById(req.params.factId);
      if (!fact) {
        return next(errorHandler(404, 'Fact not found'));
      }
      const userIndex = fact.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        fact.numberOfLikes += 1;
        fact.likes.push(req.user.id);
      } else {
        fact.numberOfLikes -= 1;
        fact.likes.splice(userIndex, 1);
      }
      await fact.save();
      res.status(200).json(fact);
    } catch (error) {
      next(error);
    }
  };