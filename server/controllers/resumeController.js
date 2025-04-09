const axios = require('axios');

exports.getSuggestions = async (req, res) => {
  try {
    const { summery, experience, education, skills, projects } = req.body.text;

    const experienceText = (experience || []).map(exp => exp.workSummery).join(' ');
    const educationText = (education || []).map(edu => edu.description).join(' ');
    const skillsText = (skills || []).map(skill => skill.name).join(' ');
    const projectsText = (projects || []).map(proj => proj.description).join(' ');

    const contentToCheck = `${summery} ${experienceText} ${educationText} ${skillsText} ${projectsText}`;

    if (!contentToCheck) {
      return res.status(400).json({ message: "Text is required for spell checking." });
    }

    const apiUrl = "https://api.languagetool.org/v2/check";

    const response = await axios.post(
      apiUrl,
      new URLSearchParams({
        text: contentToCheck,
        language: "en-US",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const matches = response.data.matches
      .map(match => ({
        word: match.context.text.substring(
          match.context.offset,
          match.context.offset + match.context.length
        ),
        suggestions: match.replacements.map(replacement => replacement.value),
        message: match.message,
        type: match.rule.issueType,
      }))
      .filter(item => item.suggestions.length > 0);

    const actionVerbs = ['achieved', 'designed', 'managed', 'led', 'improved'];
    const actionVerbSuggestions = [];

    experience.forEach(exp => {
      actionVerbs.forEach(verb => {
        if (exp.workSummery && exp.workSummery.includes(verb)) {
          actionVerbSuggestions.push({
            word: verb,
            message: `Consider using stronger verbs like "led" or "improved" for better impact.`,
          });
        }
      });
    });

    const combinedSuggestions = [...matches, ...actionVerbSuggestions];

    res.status(200).json({
      errors: combinedSuggestions,
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res.status(500).json({ message: "Failed to fetch suggestions." });
  }
};
