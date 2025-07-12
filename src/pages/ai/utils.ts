const getRequestInstructions = () => {
  const instructions = ` 
      -@here Please analyze conversation with the user and generate a document using the provided template.
      Include the following:
      1. A comprehensive summary of discussion
      2. The document formatted according to the template
      3. Clear instructions for:
         - Downloading the document
         - Saving it as study_name.html
         - Opening it in a browser
      
      Note: If conversation lacks substantial content, please:
      - Provide a brief overview of the template's purpose

      Ensure to respond through the appropriate schemas!

      Please add author from context.
      `;

  return instructions;
};

export default getRequestInstructions;
