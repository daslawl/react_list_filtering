const fs = require("fs").promises;

export default async (req, res) => {
  const json = await fs.readFile(process.cwd() + "/data/data.json");
  res.statusCode = 200;
  res.json(json);
};
