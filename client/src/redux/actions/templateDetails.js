export const changeTemplate = (template) => ({
  type: 'CHANGE_TEMPLATE',
  payload: template
});

// Action to fetch templates successfully
export const fetchTemplatesSuccess = (templates) => ({
  type: 'FETCH_TEMPLATES_SUCCESS',
  payload: templates
});

// Action to handle errors during fetching templates
export const fetchTemplatesFailure = (error) => ({
  type: 'FETCH_TEMPLATES_FAILURE',
  payload: error
});

export const setTemplateID = (id) => ({
  type: 'SET_TEMPLATEID',
  payload: id
});

