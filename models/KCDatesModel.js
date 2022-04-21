const kcdates = require("../queries");

const KcDates = {};

KcDates.get = async () => {
  try{
    const result = await kcdates.getKcDates();
    return result
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

KcDates.getID = async () => {
    try{
      const result = await kcdates.getKcByDateId();
      return result
      
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


module.exports = KcDates;