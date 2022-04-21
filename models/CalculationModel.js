const calc = require("../queries");

const Calc = {};

Calc.get = async () => {
  try{
    const result = await calc.getCalcs();
    return result
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

Calc.getID = async () => {
    try{
      const result = await calc.getCalcsByID();
      return result
      
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

Calc.postCalcID = async () => {
  try{
    const result = await calc.addCalcs();
    return result
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

Calc.deleteID = async () => {
    try{
      const result = await calc.deleteCalcsByID();
      return result
      
    } catch (err) {
      console.error(err);
      throw err;
    }
}


module.exports = Calc;