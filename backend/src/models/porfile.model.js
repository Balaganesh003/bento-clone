const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  displayName: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },

  profiles: [
    {
      type: {
        type: String,
        required: true,
        enum: ['socialLink', 'text', 'map', 'image', 'title'],
      },
      id: {
        type: String,
        required: true,
      },
      baseUrl: {
        type: String,
        required: function () {
          return this.type === 'socialLink';
        },
      },
      userName: {
        type: String,
        required: function () {
          return this.type === 'socialLink';
        },
      },
      logo: {
        type: String,
        required: function () {
          return this.type === 'socialLink';
        },
      },
      bgColor: {
        type: String,
        required: function () {
          return this.type === 'socialLink';
        },
      },

      content: {
        type: String,
        default: '',
        validate: {
          validator: function (v) {
            return this.type === 'text' || this.type === 'title'
              ? v.length >= 0
              : true;
          },
          message: 'Content is required for text and title types',
        },
      },
      location: {
        type: {
          latitude: {
            type: Number,
            required: function () {
              return this.type === 'map';
            },
          },
          longitude: {
            type: Number,
            required: function () {
              return this.type === 'map';
            },
          },
          zoom: {
            type: Number,
            required: function () {
              return this.type === 'map';
            },
          },
        },
        required: function () {
          return this.type === 'map';
        },
      },
      imgUrl: {
        type: String,
        required: function () {
          return this.type === 'image';
        },
      },
    },
  ],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
