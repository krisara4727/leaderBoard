import mongoose from 'mongoose';

const teamSchemas = mongoose.Schema({
    name:String,
    wins:Number,
    lose:Number,
    tie:Number,
    score:Number
});

export default mongoose.model('teamsdbs',teamSchemas);