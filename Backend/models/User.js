
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,   
		trim: true
	},
	phone: {
		type: String,
		required: true,  
		unique: true,   
		match: [/^\d{10,15}$/, 'رقم الهاتف غير صالح']    
	},
	password: {
		type: String,
		required: true  
	},
	
	createdAt: {
		type: Date,
		default: Date.now 
	}
});

     
const User = mongoose.model('User', userSchema);

export default User;
