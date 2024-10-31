const Template=require('../models/template');

exports.createTemplate = async (req, res) => {
    try {
        const { name, description, layout, thumbnail } = req.body;

        // Validation
        if (!name || !description || !layout) {
            return res.status(400).send("All fields (name, description, layout) are required.");
        }

        const newTemplate = await Template.create({ name, description, layout, thumbnail });
        res.status(201).json(newTemplate);
    } catch (err) {
        res.status(500).send("Error creating template");
    }
};

exports.updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, layout, thumbnail } = req.body;

        const template = await Template.findById(id);
        if (!template) return res.status(404).send("Template not found");

        template.name = name || template.name;
        template.description = description || template.description;
        template.layout = layout || template.layout;
        template.thumbnail = thumbnail || template.thumbnail; // Update thumbnail

        await template.save();
        res.json(template);
    } catch (err) {
        res.status(500).send("Error updating template");
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