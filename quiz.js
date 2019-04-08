<script src="https://github.com/browserify/browserify/blob/master/index.js"></script>
<script type="text/javascript" async="" src="https://ssl.google-analytics.com/ga.js"></script>
<script type="text/javascript" src="https://static.runkitcdn.com/assets/main-sha512-HLNUd__G_oQxtqlAlxxFeRIMp8Rtr5V0u846PBptJWGQa1jNgXsQpCMt6F6Uclz3NFpLXtJvIlFEdMn9ahvn2w==.bundle.js" integrity="sha512-HLNUd//G/oQxtqlAlxxFeRIMp8Rtr5V0u846PBptJWGQa1jNgXsQpCMt6F6Uclz3NFpLXtJvIlFEdMn9ahvn2w==" crossorigin="anonymous"></script>
<script src="fernetBrowser.js"></script>
let fernet = require('./fernet');
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
var token = new fernet.Token({
  secret: secret,
  token: 'gAAAAABcqVVf_7pKfMfb0vgBQx3L8wxNNh2Zv1rQ652aJ7cQzeooD7H4r5DmVBmQ4Vp_0OyUYiRBVjrnPg7jc9ktWNf33DjWz4agQjEV_djlQ0heoeiKcM7HgDmvwIDSpMxfL9fVh-PsJdf7DH_ITDr0h3rTemQncg4DGrmaWeWEiRaii8RNYwv0IzHuyTVC6fKNOhBDpw8n==',
  ttl: 0
})
token.decode();
