# vue-shop
### original design by Hujjat Nazari
 ![ScreenShot](https://repository-images.githubusercontent.com/179789464/d6ff4000-7e70-11e9-9468-fa5f5dd8587c)
## Some things to look for!

I hope you have an opportunity to look into this source file for Vue-shop.

Within Matt_Master/src/views/Product.vue you will notice this bit of code.  Also in this .vue I have added capability to delete tags

addTag(){
       
       this.product.tags.push(this.tag.substring(0,this.tag.length-1));
       this.tag = "";
    },
    
This kind of cleans of some of the issues I was facing while adding tags to each product.  I hope you like this!
