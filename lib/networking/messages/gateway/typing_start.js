"use strict";

const Constants = require("../../../Constants");
const Events = Constants.Events;

module.exports = function handler(data, gw) {
  return true;
  if (!gw.isPrimary) return true;

  const channel = this.Channels.get(data.channel_id) ||
                  this.DirectMessageChannels.get(data.channel_id);
  if (!channel) return true;

  const user = this.Users.get(data.user_id);
  if (!user) return true;

  this.Dispatcher.emit(Events.TYPING_START, {
    socket: gw,
    user: user,
    timestamp: data.timestamp,
    channel: channel
  });
  return true;
};
