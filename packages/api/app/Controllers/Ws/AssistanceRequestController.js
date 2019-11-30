class AssistanceRequestController {
  constructor({ socket, request, auth }) {
    this.socket = socket;
    this.request = request;
    this.auth = auth;
  }
}

module.exports = AssistanceRequestController;
