import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

mongoose.set('strictQuery', false);

const laborsTypeSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'can\'t be blank'],unique:true,index:true}
});

laborsTypeSchema.plugin(uniqueValidator);

mongoose.model('LaborsType', laborsTypeSchema);
