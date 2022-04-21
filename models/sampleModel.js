const samp = require("../queries");

const Sample = {};

Sample.get = async () => {
  try{
    const result = await samp.getSample();
    return result
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = Sample;
