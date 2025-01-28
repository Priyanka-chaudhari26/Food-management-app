const Menumodel = require("../Models/MenuModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Menu = async (req, res, next) => {
    try {
        if (req.method === "GET") {
            
            const menu = await Menumodel.find();
            return res.json(menu);
        }
        
        if (req.method === "POST") {
            
            const { name, category, price, stock } = req.body;  
            const newMenuItem = new Menumodel({ name, category, price, stock  });
            await newMenuItem.save();
            return res.status(201).json({ message: "Menu item added successfully", menuItem: newMenuItem });
        }

        if (req.method === "PUT") {
            
            const { id } = req.params;
            const { name, category, price, stock  } = req.body;  

            const menuItem = await Menumodel.findByIdAndUpdate(
                id,
                { name, category, price, stock  },
                { new: true }  
            );

            if (!menuItem) {
                return res.status(404).json({ message: "Menu item not found" });
            }

            return res.json({ message: "Menu item updated successfully", menuItem });
        }

        if (req.method === "DELETE") {
            
            const { id } = req.params;
            const menuItem = await Menumodel.findByIdAndDelete(id);

            if (!menuItem) {
                return res.status(404).json({ message: "Menu item not found" });
            }

            return res.json({ message: "Menu item deleted successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.Category = async (req,res) => {
    try {
        const categories = await Menumodel.distinct("category"); 
        console.log(categories);
        return res.status(200).json(categories);
      } catch (err) {
        return res.status(500).json({ error: "Failed to fetch categories" });
      }
    };