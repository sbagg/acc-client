const grid = require("../queries");

const Grid = {};

Grid.get = async () => {
  try{
    const result = await grid.getGrid();
    return result
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

Grid.getID = async () => {
    try{
      const result = await grid.getGridById();
      return result
      
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


module.exports = Grid;