const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://gorkemAA:G135g531g135@cluster0.yftns90.mongodb.net/anadolu-assist?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const customerSchema = new mongoose.Schema({
  tcKimlikNo: String,
  fName: String,
  lName: String,
  city: String,
  province: String,
  address: String,
  vehicles: [
    {
      plaka: String,
      brand: String,
      model: String,
      date: String,
      purpose: String,
    },
  ],
});

const Customer = mongoose.model("Customer", customerSchema);

app.post("/api/customers", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.json(newCustomer);
  } catch (error) {
    console.error("Error creating new customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/customers/:tcKimlikNo", async (req, res) => {
  const tcKimlikNo = req.params.tcKimlikNo;

  try {
    const customer = await Customer.findOne({ tcKimlikNo });

    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.json({
      tcKimlikNo: customer.tcKimlikNo,
      fName: customer.fName,
      lName: customer.lName,
      city: customer.city,
      province: customer.province,
      address: customer.address,
    });
  } catch (error) {
    console.error("Error finding customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/customers/:tcKimlikNo/vehicles", async (req, res) => {
  try {
    const tcKimlikNo = req.params.tcKimlikNo;
    const user = await Customer.findOne({ tcKimlikNo });

    if (user) {
      // Extract vehicle details from the request body
      const { plaka, brand, model, date, purpose } = req.body;

      // Add the vehicle to the user's vehicles array
      user.vehicles.push({ plaka, brand, model, date, purpose });

      // Save the updated user document
      await user.save();

      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error adding vehicle to user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/customers/:tcKimlikNo/vehicles", async (req, res) => {
  const tcKimlikNo = req.params.tcKimlikNo;

  try {
    const customer = await Customer.findOne({ tcKimlikNo });

    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.json({ vehicles: customer.vehicles });
  } catch (error) {
    console.error("Error finding customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/customers/:tcKimlikNo/vehicles/:plaka", async (req, res) => {
  const tcKimlikNo = req.params.tcKimlikNo;
  const plaka = req.params.plaka;

  try {
    const user = await Customer.findOne({ tcKimlikNo });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Check each vehicle in the array to find the one with matching "plaka"
    const vehicle = user.vehicles.find((v) => v.plaka === String(plaka));

    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found" });
      return;
    }

    res.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const pricingDetailsSchema = new mongoose.Schema({
  fiyat: {
    type: Number,
    required: true,
  },
  komisyon: {
    type: Number,
    required: true,
  },
});

const includedItemSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  extra: {
    type: [String],
    required: true,
  },
});

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  description: String,
  yaş: {
    type: Number,
    default: 0,
  },
  pricingDetails: {
    type: [pricingDetailsSchema],
    required: true,
  },
  specs: {
    included: {
      type: [includedItemSchema],
      required: true,
    },
    excluded: {
      type: [String],
      required: true,
    },
  },
});

const Package = mongoose.model("Package", packageSchema);

app.get("/api/packages", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const contractSchema = new mongoose.Schema({
  tcKimlikNo: String,
  fName: String,
  lName: String,
  plaka: String,
  package: String,
  date: Date,
  price: String,
});

const Contract = mongoose.model("Contract", contractSchema);

app.post("/api/contract", async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await selectedPackage.save();
    res.json(contract);
  } catch (error) {
    console.error("Error saving selected package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
