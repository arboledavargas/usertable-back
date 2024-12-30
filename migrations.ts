import { MongoClient } from "mongodb";

const uri = Deno.env.get("DATABASE_URL") || "";

const createIndexes = async () => {
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to the database...");
    await client.connect();
    const db = client.db("user-table");
    const customers = db.collection("customers");

    console.log("Creating indexes...");
    await customers.createIndex({ serialized: "text" }); // Example for full-text search

    console.log("Indexes created successfully!");
  } catch (error) {
    console.error("Error creating indexes:", error);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
};

createIndexes();
