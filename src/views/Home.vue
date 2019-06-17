<template>
  <div class="home">
    <Navbar></Navbar>
    <Hero/>
    <products-list></products-list>

    <div >
      
        <div class="shopping">
          <div class="shopping-content col-md-5">
            <h3 class="shopping-header">Learn More About us</h3>
          <div>
            
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!</p>
            <button class="btn custom-btn btn-info mr-4">Browse Products</button>
          </div>
          </div>
        </div>
      
    </div>
    <login></login>
    <mini-cart></mini-cart>
 
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Products from "@/sections/Products.vue";
import Login from "@/components/Login.vue";


export default {
  name: "home",
  components: {
    Hero,
    Products,
    Login
 
  }
};
</script>

<style>
.shopping {
  width: 100%;
  height: 700px;
  background-size: 1850px 900px;
  background-image: url("/img/svg/shopper1.jpg");
  background-position: center;
  background-repeat: no-repeat, repeat;
  border-left: 50px solid  rgb(55, 107, 167);
  border-right: 50px solid rgb(55, 107, 167);
  border-bottom: 50px solid rgb(55, 107, 167);
  border-top: 50px solid rgb(55, 107, 167);
  
}
.shopping-content {
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  text-align: left;
  top: 30px;
  overflow-wrap: break-word;
  left: 1000px;
  font-size: 15px;
  font-weight:bold;
}
.shopping-header {
  color:  #fff;
  font-size: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  font-weight:bold;
}
</style>
