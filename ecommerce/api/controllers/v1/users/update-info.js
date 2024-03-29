module.exports = {


  friendlyName: 'Update info',


  description: 'This action help user to update infomation - email, password and role is not included here',


  inputs: {
    name:{
      type: 'string',
      description: 'User name'
    },
    birthdate:{
      type: 'string',
      example: '2000-01-01', 
    },
    phone:{
      type: 'string',
    },
    gender: {
      type: 'string'
    },
    bio:{
      type: 'string'
    }
  },


  exits: {

  },


  // ... (existing code)

  fn: async function (inputs) {
    try {
    // this.req.user.id
    // const id = this.req.user.id;
      const req = this.req;
      // const res = this.res;
      const id = req.user.userId;
      const { name, birthdate, phone, gender, bio } = req.body;
      const userAvatarPath = sails.config.userAvatarDestination;

      let url='';

      if (req.file('avatar')) {
        url = await sails.helpers.uploadFile(req.file('avatar'), userAvatarPath);
      }

      const user = await Users.findOne({
        id: id
      });

      // Update user information
      await Users.update({
        id: id
      }).set({
        name: name || user.name,
        birthdate: birthdate || user.birthdate,
        phone: phone || user.phone,
        gender: gender || user.gender,
        bio: bio || user.bio,
        avatarUrl: url || user.avatarUrl
      }).intercept(() => {
        throw new CustomError(500, 'Internal Server Error');
      });

      // All done.
      return this.res.customSuccess(200, {
        status: 200,
        message: `${user.email} updated information successfully`,
        url: url
      });
    } catch (err) {
      return this.res.customError(err);
    }
  }



};
