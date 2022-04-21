const eto = require("../queries");

const Eto = {};

Eto.get = async () => {
  try{
    const result = await eto.getEto();
    return result
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

Eto.getID = async () => {
    try{
      const result = await eto.getEtoById();
      return result
      
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


module.exports = Eto;