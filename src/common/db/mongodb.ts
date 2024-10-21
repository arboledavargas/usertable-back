import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL || '';

const createMongoClient = () => {
    return new MongoClient(uri);
};

let _mongoClient: MongoClient | undefined;

const getMongoClient = () => {
    if (!_mongoClient) {
        _mongoClient = createMongoClient();
    }
    return _mongoClient;
};

export const mongoClient = getMongoClient();