
import { connect } from "mongoose";
import * as dotenv from "dotenv";

export class DBConfig {

    async init() {
        dotenv.config()
        return await this.connect();
    }
     
    async connect(): Promise<boolean> {       
        try {
            await connect(process.env.DB_URL);
            return true
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}