import { AppDataSource } from './data-source'
import './env'

AppDataSource.initialize().catch((error) => console.log(error))
