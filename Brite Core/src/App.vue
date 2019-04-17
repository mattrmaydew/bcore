<template>
  <div class="main-class" id="app">
    <div>
      <div class="logo-class"><img alt="Vue logo" src="./assets/logo.png"></div>
      <div class="form-class">
        <form id="search">
          Search <input class="search-class" name="query" v-model="search" placeholder="search filter">
        </form>
      </div>
      <table class="MyTable" align="center">
        <thead>
          <tr>
            <th class="hover" @click="sort('ID')">ID</th>
            <th align="left" class="hover" @click="sort('Name')">Name</th>
            <th align="left" class="hover" @click="sort('Description')">Description</th>
            <th align="left" class="hover" @click="sort('Date')">Date</th>
            <th align="left" class="hover" @click="sort('Amount')">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr class="MyRows" v-for="users in sortusers" :key="users.key">
            <td>{{users.ID}}</td>
            <td>{{users.Name}}</td>
            <td>
              <input class="change-item-edit" type="text" style="width: 470px" v-model="users.Description">
              <button @click="editDescription(users)" type="button">Change</button>
            </td>
            <td>{{users.Date}}</td>
            <td>{{users.Amount}}</td>
          </tr>
        </tbody>
      </table>  
    </div>




  </div>
</template>

<script>

import {usersRef} from './firebase'
import {db} from './firebase'
export default {
  name: 'app',

  data () {
    return {
      users: [],
      currentSort:'name',
      currentSortDir:'asc',
      search:'', 
      ID:null,
      Name:null,
      Description:null,
      date:null,
      Amount:null,
    }
  },
  firebase: {
    users: usersRef
  },
  methods:{
    editDescription(users){
 //     $('#edit').modal('show')
      var query = db.ref("users").orderByChild("ID").equalTo(users.ID)
      query.once("child_added", function(snapshot) {
      snapshot.ref.update({ Description: users.Description })
      });
      alert('Description Saved')
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    addUser(){
      usersRef.push(
        {
          ID:this.ID,
          Name:this.Name,
          Description:this.Description,
          date:this.date,
          Amount:this.Amount,
        },
      )
    }
  },
  computed:{
    sortusers() {
      var search = this.search && this.search.toLowerCase()
      var users = this.users  
      if(search){
        users = users.filter(function (row) {
          return Object.keys(row).some(function (users) {
            return String(row[users]).toLowerCase().indexOf(search) > -1
          })
        })
        return users
      }
      else{
      return this.users.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      })
      }
    },
    
}
}
</script>


<style lang="scss">
  table {
    border: 2px solid black;
    border-collapse: collapse;
   
  }

  th {
    font-size: 20px;
  }

  td {
    border: 1px solid black;
    text-align: left;
  }

  .hover {
    cursor: pointer; 
  }

  .MyRows:nth-child(odd) {
    background-color: #dbe0e6;
  } 

  .MyRows:nth-child(even) {
    background-color: #fff;
  }

  .change-item-edit {
    font-size: 16px;
  }

  .logo-class{
    text-align: center
  }

  .form-class{
    text-align: center;
    margin-bottom: 25px;
    font-size: 30px;
  }
  .search-class{
    font-size: 25px;
  }

  

  
</style>
