const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const colors = require("colors");

// Load env vars
dotenv.config();

// Load models
const User = require("./models/userModel");
const Inventory = require("./models/inventoryModel");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Sample data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Inventory.deleteMany({});
    console.log("Existing data cleared".red);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // Create Admin
    const admin = await User.create({
      role: "admin",
      name: "Admin User",
      email: "admin@bloodbank.com",
      password: hashedPassword,
      phone: "1234567890",
      address: "123 Admin Street, City",
    });
    console.log("Admin created".green);

    // Create Organisation
    const organisation = await User.create({
      role: "organisation",
      organisationName: "Red Cross Blood Bank",
      email: "org@bloodbank.com",
      password: hashedPassword,
      phone: "9876543210",
      address: "456 Organisation Ave, City",
      website: "https://redcross.org",
    });
    console.log("Organisation created".green);

    // Create Donors
    const donors = await User.insertMany([
      {
        role: "donar",
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        phone: "1111111111",
        address: "111 Donor Lane, City",
      },
      {
        role: "donar",
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        phone: "2222222222",
        address: "222 Donor Street, City",
      },
      {
        role: "donar",
        name: "Mike Johnson",
        email: "mike@example.com",
        password: hashedPassword,
        phone: "3333333333",
        address: "333 Donor Road, City",
      },
      {
        role: "donar",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        password: hashedPassword,
        phone: "4444444444",
        address: "444 Donor Blvd, City",
      },
      {
        role: "donar",
        name: "David Brown",
        email: "david@example.com",
        password: hashedPassword,
        phone: "5555555555",
        address: "555 Donor Way, City",
      },
    ]);
    console.log(`${donors.length} Donors created`.green);

    // Create Hospitals
    const hospitals = await User.insertMany([
      {
        role: "hospital",
        hospitalName: "City General Hospital",
        email: "hospital1@example.com",
        password: hashedPassword,
        phone: "6666666666",
        address: "666 Hospital Drive, City",
        website: "https://citygeneral.com",
      },
      {
        role: "hospital",
        hospitalName: "Metro Medical Center",
        email: "hospital2@example.com",
        password: hashedPassword,
        phone: "7777777777",
        address: "777 Medical Plaza, City",
        website: "https://metromedical.com",
      },
    ]);
    console.log(`${hospitals.length} Hospitals created`.green);

    // Create Inventory Records (Blood IN - donations)
    const inventoryIn = await Inventory.insertMany([
      {
        inventoryType: "in",
        bloodGroup: "A+",
        quantity: 500,
        email: "john@example.com",
        organisation: organisation._id,
        donar: donors[0]._id,
      },
      {
        inventoryType: "in",
        bloodGroup: "B+",
        quantity: 450,
        email: "jane@example.com",
        organisation: organisation._id,
        donar: donors[1]._id,
      },
      {
        inventoryType: "in",
        bloodGroup: "O+",
        quantity: 600,
        email: "mike@example.com",
        organisation: organisation._id,
        donar: donors[2]._id,
      },
      {
        inventoryType: "in",
        bloodGroup: "AB+",
        quantity: 350,
        email: "sarah@example.com",
        organisation: organisation._id,
        donar: donors[3]._id,
      },
      {
        inventoryType: "in",
        bloodGroup: "O-",
        quantity: 400,
        email: "david@example.com",
        organisation: organisation._id,
        donar: donors[4]._id,
      },
      {
        inventoryType: "in",
        bloodGroup: "A-",
        quantity: 300,
        email: "john@example.com",
        organisation: organisation._id,
        donar: donors[0]._id,
      },
      {
        inventoryType: "in",
        bloodGroup: "B-",
        quantity: 250,
        email: "jane@example.com",
        organisation: organisation._id,
        donar: donors[1]._id,
      },
      {
        inventoryType: "in",
        bloodGroup: "AB-",
        quantity: 200,
        email: "mike@example.com",
        organisation: organisation._id,
        donar: donors[2]._id,
      },
    ]);
    console.log(`${inventoryIn.length} Blood donations (IN) created`.green);

    // Create Inventory Records (Blood OUT - distributed to hospitals)
    const inventoryOut = await Inventory.insertMany([
      {
        inventoryType: "out",
        bloodGroup: "A+",
        quantity: 200,
        email: "hospital1@example.com",
        organisation: organisation._id,
        hospital: hospitals[0]._id,
      },
      {
        inventoryType: "out",
        bloodGroup: "O+",
        quantity: 150,
        email: "hospital2@example.com",
        organisation: organisation._id,
        hospital: hospitals[1]._id,
      },
      {
        inventoryType: "out",
        bloodGroup: "B+",
        quantity: 100,
        email: "hospital1@example.com",
        organisation: organisation._id,
        hospital: hospitals[0]._id,
      },
    ]);
    console.log(`${inventoryOut.length} Blood distributions (OUT) created`.green);

    console.log("\n========================================".cyan);
    console.log("DATABASE SEEDED SUCCESSFULLY!".cyan.bold);
    console.log("========================================\n".cyan);

    console.log("Login Credentials:".yellow.bold);
    console.log("------------------".yellow);
    console.log("Admin:        admin@bloodbank.com / password123".white);
    console.log("Organisation: org@bloodbank.com / password123".white);
    console.log("Donor:        john@example.com / password123".white);
    console.log("Hospital:     hospital1@example.com / password123".white);
    console.log("\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:".red, error);
    process.exit(1);
  }
};

// Run seeder
seedData();
