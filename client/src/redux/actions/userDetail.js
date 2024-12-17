export const updateBasicDetails = (details) => {
    return {
      type: 'UPDATE_BASIC_DETAILS',
      payload: details,
    };
  };
  
  export const updateResumeSection = (sectionKey, sectionData) => ({
    type: 'UPDATE_SECTION',
    payload: { sectionKey, sectionData },
  });

  