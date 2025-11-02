import express from 'express'
import { createApplication, getUserApplication } from '../controllers/applicationController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

// 取得使用者的所有申請紀錄
router.get('/getUserApplication', authMiddleware, getUserApplication)

// 建立新的申請紀錄
router.post('/createApplication', authMiddleware, createApplication)

export default router
