const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const { get } = require("https");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "contacts.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log(`Server running successfully on http://localhost:3000`);
    });
  } catch (error) {
    console.log(`DB Error : ${error.message}`);
  }
};

initializeDBAndServer();

//GET contacts list
app.get("/contacts", async (request, response) => {
  try {
    const getContactsQuery = `
        SELECT
            *
        FROM
            contacts
        ORDER BY
            id;
    `;
    const contactsList = await db.all(getContactsQuery);
    response.send(contactsList);
  } catch (error) {
    response.status(500);
    response.send(`${error.message}`);
  }
});

//ADD contact
app.post("/contacts", async (request, response) => {
  try {
    const { name, email, phoneNumber, address } = request.body;
    const addContactQuery = `
    INSERT INTO 
        contacts(name, email, phone_number, address)
    VALUES(
        "${name}","${email}", "${phoneNumber}", "${address}"
    );`;
    await db.run(addContactQuery);
    response.send("contact added successfully");
  } catch (error) {
    response.status(500);
    response.send(`${error.message}`);
  }
});

//UPDATE contact
app.put("/contacts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, phoneNumber, address } = request.body;
    const updateContactQuery = `
    UPDATE
        contacts
    SET
        name = "${name}";
        email = "${email};
        phone_number = "${phoneNumber}";
        address = "${address}";
    WHERE id = ${id};
    `;

    await db.run(updateContactQuery);
    response.send("contact updated successfully");
  } catch (error) {
    response.status(500);
    response.send(`${error.message}`);
  }
});

//DELETE contact

app.delete("/contacts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteQuery = `
        DELETE FROM
            contacts
        WHERE
            id = ${id};
    `;
    await db.run(deleteQuery);
    response.send("contact deleted successfully");
  } catch (error) {
    response.status(500);
    response.send(`${error.message}`);
  }
});

//GET contact
app.get("/contacts/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const getContactQuery = `
          SELECT
              *
          FROM
              contacts
          WHERE
            id = ${id};
      `;
    const contact = await db.all(getContactQuery);
    response.send(contact);
  } catch (error) {
    response.status(500);
    response.send(`${error.message}`);
  }
});

app.get("/contacts", async (request, response) => {
  try {
    const { name = "", email = "" } = request.query;
    const getContactsQuery = `
          SELECT
              *
          FROM
              contacts
          WHERE
            name LIKE "%${name}%" OR email = "%${email}%";
      `;
    const contactsList = await db.all(getContactsQuery);
    response.send(contactsList);
  } catch (error) {
    response.status(500);
    response.send(`${error.message}`);
  }
});

module.exports = app;
