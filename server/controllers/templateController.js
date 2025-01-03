const Template=require('../models/template');
const mongoose =require('mongoose');
const {uploadThumbnail} =require('../config/cloudinary')


exports.createTemplate = async (req, res) => {
    try {

        const { name, description, layout, structure,premiumTemplate } = req.body; // Added structure field
        const thumbnail = req.file; // Get the uploaded file from req.file

        if (!name || !description || !layout || !structure || !thumbnail) {
            return res.status(400).send("All fields (name, description, layout, structure,thumbnail) are required.");
        }

        const cloudResponse = await uploadThumbnail(thumbnail.buffer); // Use thumbnail.buffer for uploading
        const thumbnail_cloud = cloudResponse.secure_url; // Get the URL from the cloud response

        // Create a new template in the database
        const newTemplate = await Template.create({ 
            name, 
            description, 
            premiumTemplate,
            layout, 
            structure, // Save the structure of the template as well
            image: thumbnail_cloud // Ensure you set the field as expected by the model
        });

        // Respond with the newly created template
        res.status(201).json({
            success: true,
            newTemplate
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating template",err.message);
    }
};

exports.updateTemplate = async (req, res) => {
    try {
        let { id } = req.params;
        
        

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format. Must be a 24 character hex string."
            });
        }
        
       
        const newObjectId = new mongoose.Types.ObjectId(id);
        const { name, description, layout } = req.body;
 
        const thumbnail = req.file;
        const template = await Template.findById(newObjectId);
        if (!template) return res.status(404).send("Template not found");


        template.name = name || template.name;
        template.description = description || template.description;
        template.layout = layout || template.layout;
        if(thumbnail){
            const cloudResponse = await uploadThumbnail(thumbnail.buffer);
            template.image=cloudResponse.secure_url;
        }
        template.updatedAt=Date.now();
        await template.save();
        res.json(template);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message:"Error updating template ." +err,
            success:false
        });
    }
};


exports.getAllTemplates = async (req, res) => {

    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error fetching templates");
    }
}

exports.getTemplateById = async (req, res) => {
    try {



        const { id } = req.params;

        const template = await Template.findById(id);

        if (!template) return res.status(404).send("Template not found");

        res.json(template);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error fetching template");
    }
};


exports.deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await Template.findByIdAndDelete(id);

        if (!template) return res.status(404).send("Template not found");

        res.status(200).send("Template deleted successfully");
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error deleting template");
    }
};