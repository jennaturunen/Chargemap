const router = require('express').Router();
const station = require('./models/stationModel');
const connection = require('./models/connectionModel');
const rectangleHelper = require('./rectangleHelper');
require('./models/currentTypeModel');
require('./models/connectionTypeModel');
require('./models/levelModel');

// Get all stations, default limit 10 or based on query
router.route('/').get(async (req, res) => {
  try {
    const { limit, topRight, bottomLeft } = req.query;

    // Limit the area if query params include both values
    if (topRight && bottomLeft) {
      const limitedArea = rectangleHelper.rectangleBounds(
        JSON.parse(topRight),
        JSON.parse(bottomLeft)
      );

      res.send(
        await station
          .find()
          .where('Location')
          .within(limitedArea)
          .limit(limit ? parseInt(limit) : 10)
          .populate({
            path: 'Connections',
            populate: [
              {
                path: 'ConnectionTypeID',
              },
              {
                path: 'CurrentTypeID',
              },
              {
                path: 'LevelID',
              },
            ],
          })
      );
    } else {
      res.send(
        await station
          .find()
          .limit(limit ? parseInt(limit) : 10)
          .populate({
            path: 'Connections',
            populate: [
              {
                path: 'ConnectionTypeID',
              },
              {
                path: 'CurrentTypeID',
              },
              {
                path: 'LevelID',
              },
            ],
          })
      );
    }
  } catch (e) {
    res.send(`Failed to fetch the stations ${e.message}`);
  }
});

// Get one by ID
router.route('/:id').get(async (req, res) => {
  try {
    res.send(
      await station.findById(req.params.id).populate({
        path: 'Connections',
        populate: [
          {
            path: 'ConnectionTypeID',
          },
          {
            path: 'CurrentTypeID',
          },
          {
            path: 'LevelID',
          },
        ],
      })
    );
  } catch (e) {
    res.send(`Failed to fetch the station ${e.message}`);
  }
});

// Create new station
router.post('/', async (req, res) => {
  const connections = await req.body.Connections;

  try {
    const connectionIds = await Promise.all(
      connections.map(async (con) => {
        const newConnection = new connection(con);
        const createdConnection = await connection.create(newConnection);
        await createdConnection.save();
        return createdConnection._id;
      })
    );

    const newStation = await new station({
      ...req.body.Station,
      Connections: connectionIds,
    });

    await station.create(newStation);
    await newStation.save();

    res.send(
      `Created new station ${newStation} with the id: ${newStation._id}`
    );
  } catch (e) {
    res.send(`Failed to create the station ${e.message}`);
  }
});

// Modify station
router.put('/', async (req, res) => {
  try {
    const { Station, Connections } = await req.body;

    const updatedStation = await station.findByIdAndUpdate(
      Station._id,
      Station,
      {
        new: true,
        upsert: true,
      }
    );

    const updatedConnections = await Promise.all(
      Connections.map(async (con) => {
        try {
          const updCon = await connection.findByIdAndUpdate(con._id, con, {
            new: true,
            upsert: true,
          });
          return updCon._id;
        } catch (e) {
          res.send(`Failed to update the connections ${e.message}`);
        }
      })
    );

    updatedStation.Connections = updatedConnections;

    await updatedStation.save();

    res.send(`Updated successfully ${updatedStation} station`);
  } catch (e) {
    res.send(`Failed to update the station ${e.message}`);
  }
});

// Delete station
router.delete('/:id', async (req, res) => {
  try {
    const del = await station.deleteOne({ _id: req.params.id });
    res.send(`deleted ${del.deletedCount} station`);
  } catch (e) {
    res.send(`Failed to delete the station ${e.message}`);
  }
});

module.exports = router;
