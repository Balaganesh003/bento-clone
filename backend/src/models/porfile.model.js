const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
        default: '',
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
        required: function () {
          return ['text', 'title'].includes(this.type);
        },
      },
      location: {
        type: {
          latitude: Number,
          longitude: Number,
          zoom: Number,
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
