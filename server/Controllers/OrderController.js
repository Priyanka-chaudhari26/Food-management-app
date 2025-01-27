const Menu = require("../Models/MenuModel");
const Order = require('../Models/OrderModel');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {userverification}= require("../Middlewares/AuthMiddleware");
module.exports.Order = async (req, res, next) => {
     
            
                try {
                    
                    let user = req.user;
                    console.log("From order controller",req.user);
                    console.log("From order controller",req.user._id);
                    let userId = req.user._id;
                    console.log(userId);
                
                    const { orderItems } = req.body; 

                    if (!orderItems || orderItems.length === 0) {
                        return res.status(400).json({ error: "Order items are required." });
                    }

                  const itemIds = orderItems.map(item => item.menuItem);
                  const menuItems = await Menu.find({ _id: { $in: itemIds } });
              
                  const insufficientItems = [];
                  for (const orderItem of orderItems) {
                    const menuItem = menuItems.find(item => item._id.equals(orderItem.menuItem));
              
                    if (!menuItem) {
                      insufficientItems.push({ menuItem: orderItem.menuItem, message: "Item not found." });
                      continue;
                    }
              
                    if (!menuItem.availability) {
                      insufficientItems.push({ menuItem: menuItem.name, message: "Item is unavailable." });
                      continue;
                    }
              
                    if (menuItem.stock < orderItem.quantity) {
                      insufficientItems.push({
                        menuItem: menuItem.name,
                        message: `Only ${menuItem.stock} unit(s) available.`,
                      });
                    }
                  }
              
                  if (insufficientItems.length > 0) {
                    return res.status(400).json({ success: false, insufficientItems });

                  }
              
                  for (const orderItem of orderItems) {
                    const menuItem = menuItems.find(item => item._id.equals(orderItem.menuItem));
                    menuItem.stock -= orderItem.quantity;
                    await menuItem.save(); 
                  }
        
                  const totalAmount = orderItems.reduce((total, orderItem) => {
                    const menuItem = menuItems.find(item => item._id.equals(orderItem.menuItem));
                    return total + menuItem.price * orderItem.quantity;
                  }, 0);
              
                 
                  const order = new Order({
                    userId,
                    items: orderItems,
                    totalAmount,
                    status: "Pending",
                  });
                  await order.save();
              
                  return res.status(200).json({ success: true, order });
                } catch (error) {
                  console.error("Error placing order:", error);
                  return res.status(500).json({ success: false, error: "Failed to place order. Please try again." });
                }
                 
}

module.exports.Orders = async (req, res) => {
    try {
      const userId = req.user._id; 
      console.log("From orders controller",req.user._id);
      const orders = await Order.find({ userId }).populate('items.menuItem'); 
      if (orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found for this user." });
      }
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return res.status(500).json({ success: false, error: "Failed to fetch orders." });
    }
  };