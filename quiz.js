let fernet = require("fernet")
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
var token = new fernet.Token({
  secret: secret,
  token: 'gAAAAABcqVVf_7pKfMfb0vgBQx3L8wxNNh2Zv1rQ652aJ7cQzeooD7H4r5DmVBmQ4Vp_0OyUYiRBVjrnPg7jc9ktWNf33DjWz4agQjEV_djlQ0heoeiKcM7HgDmvwIDSpMxfL9fVh-PsJdf7DH_ITDr0h3rTemQncg4DGrmaWeWEiRaii8RNYwv0IzHuyTVC6fKNOhBDpw8n==',
  ttl: 0
})
token.decode();
