import express from 'express'
import * as analyzeController from '../controllers/analyzeController'

const router = express.Router()

router.post('/analyzeResume', analyzeController.handleAnalyzeResume);
router.post('/analyzeJD', analyzeController.handleAnalyzeJD);
router.post('/analyzeATS', analyzeController.handleAnalyzeATS);

export default router