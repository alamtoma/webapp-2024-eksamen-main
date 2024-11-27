let arrangements = [
  { id: 1, title: 'Seminar', date: '2024-12-01', maxParticipants: 100, price: '500 NOK' },
  { id: 2, title: 'Workshop', date: '2024-12-15', maxParticipants: 50, price: '300 NOK' },
];

// GET all arrangements
const getArrangements = (req, res) => {
  res.json(arrangements);
};

// POST a new arrangement
const createArrangement = (req, res) => {
  const newArrangement = { id: arrangements.length + 1, ...req.body };
  arrangements.push(newArrangement);
  res.status(201).json(newArrangement);
};

module.exports = { getArrangements, createArrangement };
