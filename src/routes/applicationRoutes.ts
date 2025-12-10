import express from 'express'
import { createApplication, getUserApplication, updateApplication, getApplicationById, deleteApplication, } from '../controllers/applicationController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()


router.get('/getUserApplication', authMiddleware, getUserApplication)


router.post('/createApplication', authMiddleware, createApplication)
router.put('/updateApplication', authMiddleware, updateApplication)
router.delete('/deleteApplication/:id', authMiddleware, deleteApplication)
router.get('/getApplicationById/:id', authMiddleware, getApplicationById)

export default router
