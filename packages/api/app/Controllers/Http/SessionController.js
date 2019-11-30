const User = use('App/Models/User');

class SessionController {
  async store({ request, auth, response }) {
    try {
      const { email, password } = request.all();

      const { token } = await auth.attempt(email, password);

      const { name, id } = await User.findBy('email', email);

      return { token, name, id };
    } catch (error) {
      return response.status(401).send({
        error: {
          message: 'Invalid e-mail/password.',
        },
      });
    }
  }
}

module.exports = SessionController;
