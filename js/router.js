const routes = [
  { path: '/', component: load },
  { path: '/home', component: home },
  { path: '/cari', component: cari },
  { path: '/about', component: about },
  { path: '/bookmark', component: bookmark }
]

const router = new VueRouter({
  mode: "hash",
  routes
})


const app = new Vue({
  router
}).$mount('#app');
