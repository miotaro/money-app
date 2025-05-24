<script setup>
// import poohImage from '@/asset/POOH.PNG'
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router' 

const router = useRouter()

const logout = async () => {
  const auth = getAuth()
  try {
    await signOut(auth)
    router.push('/login')
  } catch {
    alert('ログアウト失敗:' + error)
  }
}
</script>

<template>
  <header>
    <div class="header-left">
      <!-- <img :src="poohImage" alt="Pooh"> -->
      <h2>ぴこまね<span class="header-title">picomoney</span></h2>
    </div>
    <nav>
      <a class="logout" href="#" @click.prevent="logout">ログアウト</a>
      <router-link to="/"><font-awesome-icon :icon="['fas', 'house']" class="header-icon" /></router-link>
      <router-link to="/record"><font-awesome-icon :icon="['fas', 'piggy-bank']" class="header-icon" /></router-link>
      <router-link to="/summary"><font-awesome-icon :icon="['fas', 'chart-pie']" class="header-icon" /></router-link>
    </nav>
  </header>
</template>

<style>
header {
  box-shadow: 0 10px 15px -10px #FF82B2;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1000;
  background-color: #FFD5EC;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-title {
  font-size: 15px;
  margin-left: 10px;
}
nav {
  margin-right: 20px;
}
.logout {
  margin-right: 20px;
}
.header-icon {
  text-decoration: none;
  margin: 0 10px;
  font-size: 20px;
  color: #FF367F;
  opacity: 0.6;
}
.header-icon:hover {
  opacity: 1;
}
</style>