const { Schema, model } = require('mongoose')

const CovidCasesDaySchema = Schema({
  date: Date,
  dateQuery: String,
  country: String,
  data: Number
});

CovidCasesDaySchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('CovidCasesDay', CovidCasesDaySchema);