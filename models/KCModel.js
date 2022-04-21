const kc = require("../queries");

const Kc = {};

Kc.get = async () => {
  try{
    const result = await kc.getKc();
    return result
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

Kc.getID = async () => {
    try{
      const result = await kc.getKcById();
      return result
      
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


module.exports = Kc;