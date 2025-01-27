// userId: Reference to the User who placed the order.
// ■ items:Array of menu items (menu item ID and quantity).
// ■ totalAmount: Calculated total price.
// ■ status: String (e.g., "Pending", "Completed").
// ■ createdAt: Timestamp (auto-generated)

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  items: [
    {
      menuItem: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu', required: true },
        quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true 
    },
  status: { 
    type: String, 
    default: 'Pending' 
    },
  createdAt: { 
    type: Date, 
    default: Date.now 
    }
});

module.exports = mongoose.model('Order', OrderSchema);
