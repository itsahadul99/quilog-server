import express, { Router, Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
const router: Router = express.Router();

// Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select({ __v: 0 });
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});
// Add a new user
router.post('/user', async (req: Request<{}, {}, IUser>, res: Response) => {
    try {
      const user: IUser = new User(req.body);
      const result = await user.save();
      res.status(201).json({ message: 'Successfully added user.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(400).json({ message: 'Failed to add user', error });
    }
  });

export default router;
