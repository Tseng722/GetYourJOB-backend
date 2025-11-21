import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router();


router.get('/getUserProfile', authMiddleware, userController.getUserProfile);
router.get('/getUserExperience', authMiddleware, userController.getUserExperience);

// // 更新使用者個人經驗
router.put('/updateUserProfile', authMiddleware, userController.updateUserProfile);

// // 新增教育經驗
// router.post('/createEducation', authMiddleware, userController.createEducation);

// // 取得所有使用者
// router.get('/', authMiddleware, userController.getUsers);

// // 取得單一使用者
// router.get('/:id', authMiddleware, userController.getUserById);

// // 刪除使用者
// router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;
