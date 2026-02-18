const mongoose = require("mongoose");
const { User, Article, Comment } = require("./src/model"); // Adjust path to your file
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const seedDatabaseUser = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb://testuser:testpassword@localhost:27017",
      {
        dbName: "my-blog-api",
      },
    );
    // Optional: Clear existing users (be careful!)
    await User.deleteMany({});
    console.log("🗑️ Cleared existing users");

    const existingCount = await User.countDocuments();
    if (existingCount > 0) {
      console.log(
        `⚠️ Database already has ${existingCount} users. Skipping seed.`,
      );
      return;
    }

    const users = [];
    const statuses = ["pending", "approved", "blocked", "decline"];
    const plainPassword = "password123"; // Default password for all mock users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      users.push({
        name: `${firstName} ${lastName}`.slice(0, 50),
        username: faker.internet
          .username({ firstName, lastName })
          .toLowerCase()
          .slice(0, 50),
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        password: hashedPassword, // ✅ Pre-hashed
        role: i < 5 ? "admin" : "user", // 5 admins, 95 users
        status: statuses[i % statuses.length],
      });
    }

    // Insert in batches for performance
    const BATCH_SIZE = 20;
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);
      await User.insertMany(batch);
      console.log(`✅ Inserted ${Math.min(i + BATCH_SIZE, 100)}/100 users`);
    }

    console.log("🎉 100 users seeded successfully!");
    console.log(`🔑 All users have password: "${plainPassword}"`);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    if (error.code === 11000) {
      console.error(
        "💡 Duplicate key error: Ensure emails/usernames are unique",
      );
    }
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
};

// seed.js

// Path to your model file

const seedDatabaseArticle = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb://testuser:testpassword@localhost:27017",
      {
        dbName: "my-blog-api",
      },
    );
    console.log("✅ Connected to MongoDB...");

    // 2. Fetch all users (only _id needed)
    const users = await User.find().select("_id");

    if (users.length === 0) {
      console.log(
        "⚠️ No users found in the database. Please create users first.",
      );
      await mongoose.connection.close();
      return;
    }

    console.log(
      `👥 Found ${users.length} users. Starting article generation...`,
    );

    // 3. Generate & Insert Articles for each user
    for (const user of users) {
      const articles = [];

      for (let i = 0; i < 30; i++) {
        articles.push({
          title: faker.lorem.sentence(5), // e.g., "Consectetur adipiscing elit sed do eiusmod."
          body: faker.lorem.paragraphs(3), // 3 realistic paragraphs
          cover: faker.image.url(),
          status: faker.helpers.arrayElement(["draft", "published"]),
          author: user._id,
        });
      }

      // Bulk insert for performance
      await Article.insertMany(articles);
      console.log(`✅ Created 30 articles for User: ${user._id}`);
    }

    console.log("🎉 Article seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    if (error.code === 11000) {
      console.error(
        "💡 Duplicate key error: Check unique constraints on your schema",
      );
    }
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed.");
  }
};

const seedComments = async () => {
  try {
    await mongoose.connect("mongodb://testuser:testpassword@localhost:27017", {
      dbName: "my-blog-api",
    });
    console.log("Connected to MongoDB...");

    // 1. Fetch Existing Users (or create if empty)
    let users = await User.find().select("_id");
    if (users.length === 0) {
      console.log("⚠️ No users found. Creating 5 mock users...");
      // const createdUsers = await User.insertMany(
      //     Array.from({ length: 5 }, () => ({
      //         name: faker.person.fullName(),
      //         email: faker.internet.email(),
      //         password: 'password123'
      //     }))
      // );
      // users = createdUsers.map(u => ({ _id: u._id }));
    }
    console.log(`👥 Using ${users.length} users`);

    // 2. Fetch Existing Articles (or create if empty)
    let articles = await Article.find().select("_id");
    if (articles.length === 0) {
      console.log("⚠️ No articles found. Creating 10 mock articles...");
      // const createdArticles = await Article.insertMany(
      //     Array.from({ length: 10 }, () => ({
      //         title: faker.lorem.sentence(5),
      //         body: faker.lorem.paragraphs(3),
      //         cover: faker.image.url(),
      //         status: faker.helpers.arrayElement(['draft', 'published']),
      //         author: users[Math.floor(Math.random() * users.length)]._id
      //     }))
      // );
      // articles = createdArticles.map(a => ({ _id: a._id }));
    }
    console.log(`📄 Using ${articles.length} articles`);

    // 3. Clear Existing Comments
    await Comment.deleteMany({});
    console.log("🗑️ Cleared existing comments");

    // 4. Generate 20 Comments for EACH User on EACH Article
    const allComments = [];
    const COMMENTS_PER_USER_ARTICLE = 20;

    for (const user of users) {
      for (const article of articles) {
        for (let i = 0; i < COMMENTS_PER_USER_ARTICLE; i++) {
          allComments.push({
            body: faker.lorem.paragraph(Math.floor(Math.random() * 3) + 1),
            status: faker.helpers.arrayElement(["public", "private"]),
            author: user._id,
            article: article._id,
          });
        }
      }
    }

    console.log(`📝 Generating ${allComments.length} comments...`);

    // 5. Insert in Batches (Better Performance for Large Datasets)
    const BATCH_SIZE = 5000;
    for (let i = 0; i < allComments.length; i += BATCH_SIZE) {
      const batch = allComments.slice(i, i + BATCH_SIZE);
      await Comment.insertMany(batch);
      console.log(
        `✅ Inserted ${Math.min(i + BATCH_SIZE, allComments.length)}/${allComments.length} comments`,
      );
    }

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

async function main() {
  await seedDatabaseUser();
  await seedDatabaseArticle();
  await seedComments();
}

main();
