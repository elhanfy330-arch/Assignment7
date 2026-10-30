import { config } from "dotenv";
import { resolve } from "path";

config({
    path : resolve(`.env.${process.env.NODE_ENV}`)
})

export const DB_config ={
    PORT : process.env.PORT,
    URI : process.env.URI
}