const Template=require('../models/template');
const mongoose =require('mongoose');
const {uploadThumbnail} =require('../config/cloudinary')

// .
exports.createTemplate = async (req, res) => {
    try {
        const { name, description, layout, isCustomizable, categories } = req.body; 
        const thumbnail = req.file; // Get the uploaded file from req.file

        if (!name || !description || !layout || !thumbnail || !categories) {
            return res.status(400).send("All fields (name, description, layout, thumbnail, categories) are required.");
        }

        // Upload thumbnail to cloud
        const cloudResponse = await uploadThumbnail(thumbnail.buffer);
        const thumbnail_cloud = cloudResponse.secure_url;

        // Create a new template
        const newTemplate = await Template.create({ 
            name, 
            description, 
            isCustomizable,
            layout, 
            image: thumbnail_cloud,
            categories  // Save categories to the new template
        });

        // Respond with the newly created template
        res.status(201).json({
            success: true,
            newTemplate
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating template: " + err.message);
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
        const { name, description, layout, isCustomizable, categories } = req.body;
        const thumbnail = req.file;

        const template = await Template.findById(newObjectId);
        if (!template) return res.status(404).send("Template not found");

        template.name = name || template.name;
        template.description = description || template.description;
        template.layout = layout || template.layout;
        template.isCustomizable = isCustomizable !== undefined ? isCustomizable : template.isCustomizable;
        template.categories = categories || template.categories; // Update categories

        if (thumbnail) {
            const cloudResponse = await uploadThumbnail(thumbnail.buffer);
            template.image = cloudResponse.secure_url;
        }
        
        template.updatedAt = Date.now();
        await template.save();
        
        res.json(template);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Error updating template: " + err,
            success: false
        });
    }
};




exports.getAllTemplates = async (req, res) => {
    try {
        const { category, customizable, downloadsRange } = req.query;
        let filter = {};

        // Define the boundaries for downloads
        const downloadBoundaries = [0, 50, 100, 500, 1000, 5000]; // Your defined ranges

        // Filter by category
        if (category) {
            filter.categories = category;
        }

        // Filter by customizable
        if (customizable !== undefined) {
            filter.isCustomizable = customizable === 'true'; // Convert to boolean
        }

        // Filter by downloads range
        if (downloadsRange) {
            const downloadsRangeIndex = downloadBoundaries.indexOf(Number(downloadsRange));
            if (downloadsRangeIndex !== -1) {
                const lowerBound = downloadBoundaries[downloadsRangeIndex];
                const upperBound = downloadBoundaries[downloadsRangeIndex + 1] || Infinity; // next threshold or Infinity for last bucket

                filter.downloads = { $gte: lowerBound, $lte: upperBound }; // Downloads between the selected range
            }
        }

        // Fetch templates and facet counts
        const [templates, facets] = await Promise.all([
            Template.find(filter),
            Template.aggregate([
                {
                    $facet: {
                        categories: [
                            { $unwind: "$categories" },
                            { $group: { _id: "$categories", count: { $sum: 1 } } },
                        ],
                        customizable: [
                            { $group: { _id: "$isCustomizable", count: { $sum: 1 } } },
                        ],
                        downloadsRanges: [
                            {
                                $bucket: {
                                    groupBy: "$downloads",
                                    boundaries: [0, 50, 100, 500, 1000, 5000],
                                    default: "5000+",
                                    output: { count: { $sum: 1 } },
                                },
                            },
                        ],
                    },
                },
            ]),
        ]);

        // Add the label for ranges
        const formattedRanges = facets[0].downloadsRanges.map((range, index) => {
            const lower = downloadBoundaries[index];
            const upper = downloadBoundaries[index + 1] || '5000+'; // last bucket is unlimited
            return {
                ...range,
                label: `${lower}-${upper === '5000+' ? upper : upper - 1}` // Format the label as "0-50", "51-100", etc.
            };
        });

        res.json({
            templates,
            facets: {
                ...facets[0],
                downloadsRanges: formattedRanges,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching templates");
    }
};



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

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid template ID" });
        }

        // Attempt to mark the template as deleted
        const template = await Template.findByIdAndUpdate(
            id,
            { deletedAt: new Date() }, // Set the deletedAt timestamp
            { new: true } // Return the updated document
        );

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        // Success response
        res.status(200).json({ message: "Template marked for deletion" });
    } catch (err) {
        console.error("Error deleting template:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Restore template (undo deletion)
exports.restoreTemplate = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid template ID" });
        }

        // Fetch the template and check the deletion timestamp
        const template = await Template.findById(id);

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        // Check if the template was marked for deletion
        if (!template.deletedAt) {
            return res.status(400).json({ message: "Template is not marked for deletion" });
        }

        // Check if the deletion timestamp is within the 7-day restore window
        const currentTime = new Date();
        const deletionTime = new Date(template.deletedAt);
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

        if (currentTime - deletionTime > sevenDaysInMs) {
            return res.status(400).json({ message: "Restore window has expired" });
        }

        // Clear the deletedAt field to restore the template
        template.deletedAt = null;
        await template.save();

        // Success response
        res.status(200).json({ message: "Template restored successfully" });
    } catch (err) {
        console.error("Error restoring template:", err);
        res.status(500).json({ message: "Server error" });
    }
};

