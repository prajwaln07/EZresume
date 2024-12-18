import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  // Function to convert work summary into proper HTML with bullet points
  const formatWorkSummary = (summary) => {
    const lines = summary.split('\n'); // Split the summary into lines
    const bulletPointPattern = /^[\*\-\+]\s/; // Regex to match bullet points (*, -, or + followed by a space)
    
    // Map through the lines and convert bullet points to <li> and regular text to <p>
    const htmlContent = lines.map(line => {
      if (bulletPointPattern.test(line)) {
        return `<li>${line.replace(bulletPointPattern, '')}</li>`; // Convert to list item
      } else {
        return `<p>${line}</p>`; // Convert to paragraph for non-bullet text
      }
    });

    // Join the content with <ul> and return it as HTML
    return `<ul>${htmlContent.join('')}</ul>`;
  };

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate} To{' '}
              {experience?.currentlyWorking ? 'Present' : experience.endDate}
            </span>
          </h2>

          {/* Render Work Summary with Bullet Points */}
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{
              __html: formatWorkSummary(experience?.workSummery),
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
