module.exports = {
  friendlyName: 'Upload file',
  description: '',
  inputs: {
    file: {
      type: 'ref',
      required: true
    },
    destination: {
      type: 'string',
      required: true,
    }
  },
  exits: {
    success: {
      description: 'File uploaded successfully',
      outputType: 'string' // Adjust the outputType as needed
    },
    error: {
      description: 'An error occurred',
      outputType: 'ref' // Adjust the outputType as needed
    },
  },
  fn: async function (inputs, exits) {
    try {
      const { file, destination } = inputs;
      file.upload(
        {
          dirname: require('path').resolve(sails.config.appPath, destination),
          maxBytes: 10000000
        },
        (err, uploadedFiles) => {
          if (err) {
            sails.log.error('Error in file upload:', err);
            return exits.error(new CustomError(500, 'Internal Server Error'));
          } else {
            if (uploadedFiles && uploadedFiles.length > 0) {
              let url = uploadedFiles[0].fd;
              return exits.success(url);
            } else {
              sails.log.error('No files were uploaded');
              return exits.error(new CustomError(500, 'Internal Server Error'));
            }
          }
        }
      );
    } catch (error) {
      sails.log.error('Unhandled error:', error);
      return exits.error(new CustomError(500, 'Internal Server Error'));
    }
  }
};
