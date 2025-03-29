const jwt = require('jsonwebtoken'); // npm install jsonwebtoken --save

module.exports = class JwtToken{
  constructor(){
    this._jsonwebtoken = jwt;
    this._key = "f3519f3ced6db6e9d569ee0eda7e2059" // select md5(98)
    this._duracao = 60 * 60 * 24 * 250;
  }

  gerar(payload) {
    const novoToken = this._jsonwebtoken.sign(
      { payload: payload },
      this._key,
      { expiresIn: this._duracao }
    );
    return novoToken;
  }

  validar(token) {
    token = this.limpar_entrada(token);

    try {
      const payload = this._jsonwebtoken.verify(token, this._key);
      return {
        status: true,
        payload: payload
      };
    } catch (error) {
      return {
        status: false,
        payload: {}
      };
    }
  }

  limpar_entrada(token) {
    if (typeof token === 'string') {
      token = token.replace("<", "");
      token = token.replace(">", "");
      token = token.replace("Bearer ", "");
      return token;
    } else {
      return token;
    }
  }
}
