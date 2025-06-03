<template>
  <div id="app">
    <div class="container">
      <aside class="sidebar">
        <nav class="side-nav">
          <div class="nav-logo">Menu</div>
          <div class="nav-links">
            <router-link to="/parentA">Order Ticket</router-link>
            <router-link to="/fa/bookOfBusiness">Book of Business</router-link>
          </div>
        </nav>
      </aside>
      <main class="content">
      <router-view />
    </main>
  </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.side-nav {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.nav-logo {
  font-size: 18px;
  font-weight: bold;
  padding: 0 20px 20px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.nav-links {
  display: flex;
  flex-direction: column;
}

.side-nav a {
  display: block;
  padding: 10px 20px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 5px 0;
}

.side-nav a:hover {
  background-color: #eaeaea;
}

.side-nav a.router-link-exact-active {
  color: #42b983;
  background-color: #e8f5e9;
  border-left: 3px solid #42b983;
}
</style>
