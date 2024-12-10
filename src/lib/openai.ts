import { OpenAIEmbeddings } from '@langchain/openai';
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { env } from './envValidation';
dotenv.config();

export const embeddingsInstance = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
});

const client = new MongoClient(env.MONGODB_URI);
const dbName = env.DB_NAME;
const collectionName = env.COLL_NAME;
const collection = client.db(dbName).collection(collectionName);

export const vectorStore = new MongoDBAtlasVectorSearch(embeddingsInstance, {
    collection: collection,
    indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
    textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
    embeddingKey: "text_embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
});


export const searchArgs =
{
    collection,
    indexName: "vector_index",
    textKey: "text",
    embeddingKey: "text_embedding",
}
