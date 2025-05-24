<script setup>
// import poohImage from '@/asset/POOH.PNG'
import { ref } from 'vue'
import { useRouter } from 'vue-router' 
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const { logout } = authStore
const router = useRouter()

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <div class="header-left">
      <!-- <img :src="poohImage" alt="Pooh"> -->
      <h2>ぴこまね<span class="header-title">picomoney</span></h2>
    </div>
    <nav v-if="isLoggedIn" class="header-right">
      <div class="header-menus">
        <a class="logout" href="#" @click.prevent="logout">ログアウト</a>
        <router-link to="/"><font-awesome-icon :icon="['fas', 'house']" class="header-icon" /></router-link>
        <router-link to="/record"><font-awesome-icon :icon="['fas', 'piggy-bank']" class="header-icon" /></router-link>
        <router-link to="/summary"><font-awesome-icon :icon="['fas', 'chart-pie']" class="header-icon" /></router-link>
      </div>
      <div class="header-bar-menus">
        <div v-if="isMenuOpen" class="header-menu">
          <a class="logout" href="#" @click.prevent="logout">ログアウト</a>
          <router-link to="/">ホーム</router-link>
          <router-link to="/record">収支一覧</router-link>
          <router-link to="/summary">月別収支</router-link>
        </div>
        <font-awesome-icon :icon="['fas', 'bars']" class="bar-icon header-icon" @click="toggleMenu"/>
      </div>
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
.header-bar-menus {
  display: none;
}

@media (max-width: 425px) {
  .header-menus {
    display: none;
  }
  .header-bar-menus {
    display: flex;
    position: relative;
    width: 120px;
    line-height: 20px;
  }
  .header-menu {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    position: absolute;
    top: -10px;
  }
  .bar-icon {
    position: absolute;
    top: -10px;
    left: 75px;
  }
}
</style>