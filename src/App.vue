<template>
  <router-view />
</template>
<script>
  if(!localStorage.identifications){
    localStorage.identifications=JSON.stringify( [{
      name: 'admin',
      password: '123456',
      imageURL: ''
    },
    {
      name: 'gLeader',
      password: '123456',
      imageURL: ''
    }])
  }
  if(!localStorage.loginState){
    localStorage.loginState=0
  }
 
</script>